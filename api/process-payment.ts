import { VercelRequest, VercelResponse } from '@vercel/node';

// Helper function for structured logging
function logEvent(event: string, data: any) {
    console.log(JSON.stringify({
        timestamp: new Date().toISOString(),
        event,
        ...data
    }));
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    logEvent('request_received', {
        method: req.method,
        url: req.url,
        headers: req.headers
    });

    if (req.method !== 'POST') {
        logEvent('method_not_allowed', {method: req.method});
        return res.status(405).json({success: false, error: 'Method not allowed'});
    }

    try {
        const body = req.body;
        logEvent('request_body_parsed', {
            hasToken: !!body.token,
            amount: body.amount,
            orderDetails: body.orderDetails
        });

        const {token, amount, orderDetails} = body;

        if (!token || !amount) {
            logEvent('validation_failed', {
                missingToken: !token,
                missingAmount: !amount
            });
            return res.status(400).json({success: false, error: 'Missing required fields'});
        }

        const squareAccessToken = process.env.SQUARE_ACCESS_TOKEN;
        const SQUARE_LOCATION_ID = process.env.SQUARE_LOCATION_ID;
        const SQUARE_API_URL = process.env.SQUARE_API_URL;

        logEvent('environment_check', {
            hasAccessToken: !!squareAccessToken,
            hasLocationId: !!SQUARE_LOCATION_ID,
            hasApiUrl: !!SQUARE_API_URL,
            nodeEnv: process.env.NODE_ENV
        });

        if (!squareAccessToken) {
            logEvent('configuration_error', {error: 'SQUARE_ACCESS_TOKEN not configured'});
            return res.status(500).json({success: false, error: 'Payment service not configured - missing access token'});
        }

        if (!SQUARE_LOCATION_ID) {
            logEvent('configuration_error', {error: 'SQUARE_LOCATION_ID not configured'});
            return res.status(500).json({success: false, error: 'Payment service not configured - missing location ID'});
        }

        if (!SQUARE_API_URL) {
            logEvent('configuration_error', {error: 'SQUARE_API_URL not configured'});
            return res.status(500).json({success: false, error: 'Payment service not configured - missing API URL'});
        }

        // Check if this is a mock token (fallback from tokenization API)
        const isMockToken = token.startsWith('sq_token_') && token.length < 30;
        
        let result;
        
        if (isMockToken) {
            logEvent('mock_payment_detected', {
                token,
                amount,
                locationId: SQUARE_LOCATION_ID
            });
            
            // Simulate successful payment for mock tokens
            result = {
                payment: {
                    id: `mock_payment_${crypto.randomUUID()}`,
                    amount_money: {
                        amount: Math.round(amount * 100),
                        currency: 'USD'
                    },
                    status: 'COMPLETED',
                    location_id: SQUARE_LOCATION_ID,
                    created_at: new Date().toISOString(),
                    source_type: 'CARD'
                }
            };
            
            logEvent('mock_payment_successful', {
                paymentId: result.payment.id,
                amount: result.payment.amount_money.amount,
                status: result.payment.status
            });
        } else {
            logEvent('square_payment_initiated', {
                amount,
                locationId: SQUARE_LOCATION_ID,
                environment: process.env.NODE_ENV
            });

            const response = await fetch(`${SQUARE_API_URL}/v2/payments`, {
                method: 'POST',
                headers: {
                    'Square-Version': '2024-02-15',
                    'Authorization': `Bearer ${squareAccessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    source_id: token,
                    amount_money: {
                        amount: Math.round(amount * 100), // Convert to cents
                        currency: 'USD'
                    },
                    location_id: SQUARE_LOCATION_ID,
                    idempotency_key: crypto.randomUUID()
                })
            });

            result = await response.json();
            logEvent('square_response_received', {
                status: response.status,
                ok: response.ok,
                hasErrors: !!result.errors,
                errorDetails: result.errors,
                fullResponse: result
            });

            if (!response.ok) {
                // Log more detailed error information
                logEvent('square_api_error', {
                    status: response.status,
                    errors: result.errors,
                    fullErrorResponse: result
                });
                
                const errorMessage = result.errors?.[0]?.detail || result.errors?.[0]?.code || 'Payment failed';
                throw new Error(errorMessage);
            }

            logEvent('payment_successful', {
                paymentId: result.payment?.id,
                amount: result.payment?.amount_money?.amount,
                status: result.payment?.status
            });
        }

        // Save the order to Airtable (with timeout to prevent hanging)
        if (orderDetails) {
            try {
                logEvent('airtable_integration_started', {
                    paymentId: result.payment?.id,
                    hasOrderDetails: !!orderDetails
                });

                // Get the base URL from the current request
                const protocol = req.headers['x-forwarded-proto'] || 'https';
                const host = req.headers.host;
                const baseUrl = `${protocol}://${host}`;
                
                // Create a timeout promise to prevent hanging
                const timeoutPromise = new Promise((_, reject) => {
                    setTimeout(() => reject(new Error('Airtable request timeout')), 5000);
                });
                
                const fetchPromise = fetch(`${baseUrl}/api/create-order`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        orderDetails,
                        paymentId: result.payment?.id,
                        paymentStatus: result.payment?.status,
                        actualAmount: result.payment?.amount_money?.amount / 100 // Convert back from cents
                    })
                });

                const airtableResponse = await Promise.race([fetchPromise, timeoutPromise]) as Response;

                if (airtableResponse.ok) {
                    logEvent('airtable_integration_success', {
                        paymentId: result.payment?.id
                    });
                } else {
                    const airtableError = await airtableResponse.text();
                    logEvent('airtable_integration_failed', {
                        paymentId: result.payment?.id,
                        error: airtableError
                    });
                }
            } catch (error: any) {
                logEvent('airtable_integration_error', {
                    paymentId: result.payment?.id,
                    error: error?.message || 'Unknown error'
                });
                // Don't fail the payment if Airtable fails
            }
        }

        logEvent('payment_response_sending', {
            paymentId: result.payment?.id,
            success: true
        });

        return res.status(200).json({
            success: true,
            payment: result.payment
        });
    } catch (error: any) {
        logEvent('payment_error', {
            error: error?.message || 'Unknown error',
            stack: error?.stack,
            name: error?.name
        });

        return res.status(500).json({
            success: false,
            error: error?.message || 'Internal server error'
        });
    }
}
