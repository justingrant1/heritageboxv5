export const config = {
  runtime: 'nodejs',
};

import { SquareClient } from "square";

// Helper function for structured logging
function logEvent(event: string, data: any) {
  console.log(
    JSON.stringify({
      timestamp: new Date().toISOString(),
      event,
      ...data,
    })
  );
}

export default async function handler(request: Request) {
  logEvent("request_received", {
    method: request.method,
    url: request.url,
    headers: Object.fromEntries(request.headers.entries()),
  });

  if (request.method !== "POST") {
    logEvent("method_not_allowed", { method: request.method });
    return new Response(
      JSON.stringify({ success: false, error: "Method not allowed" }),
      {
        status: 405,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const body = await request.json();
    logEvent("request_body_parsed", {
      hasToken: !!body.token,
      amount: body.amount,
      orderDetails: body.orderDetails,
    });

    const { token, amount, orderDetails } = body;

    if (!token || !amount) {
      logEvent("validation_failed", {
        missingToken: !token,
        missingAmount: !amount,
      });
      return new Response(
        JSON.stringify({ success: false, error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const squareAccessToken = process.env.SQUARE_ACCESS_TOKEN;
    const SQUARE_LOCATION_ID = process.env.SQUARE_LOCATION_ID;
    const SQUARE_API_URL = process.env.SQUARE_API_URL;

    logEvent("environment_check", {
      hasAccessToken: !!squareAccessToken,
      hasLocationId: !!SQUARE_LOCATION_ID,
      hasApiUrl: !!SQUARE_API_URL,
      nodeEnv: process.env.NODE_ENV,
    });

    if (!squareAccessToken) {
      logEvent("configuration_error", {
        error: "SQUARE_ACCESS_TOKEN not configured",
      });
      return new Response(
        JSON.stringify({
          success: false,
          error: "Payment service not configured - missing access token",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (!SQUARE_LOCATION_ID) {
      logEvent("configuration_error", {
        error: "SQUARE_LOCATION_ID not configured",
      });
      return new Response(
        JSON.stringify({
          success: false,
          error: "Payment service not configured - missing location ID",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (!SQUARE_API_URL) {
      logEvent("configuration_error", {
        error: "SQUARE_API_URL not configured",
      });
      return new Response(
        JSON.stringify({
          success: false,
          error: "Payment service not configured - missing API URL",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    logEvent("square_payment_initiated", {
      amount,
      locationId: SQUARE_LOCATION_ID,
      environment: process.env.NODE_ENV,
    });

    const client = new SquareClient({
      token: squareAccessToken,
    });

    const result = await client.payments.create({
      idempotencyKey: crypto.randomUUID(),
      amountMoney: {
        amount: Math.round(amount * 100) as unknown as bigint,
        currency: "USD",
      },
      sourceId: token,
      autocomplete: true,
      locationId: SQUARE_LOCATION_ID,
    });

    logEvent("square_response_received", {
      hasErrors: !!result.errors,
      errorDetails: result.errors,
      fullResponse: result,
    });

    if (result.errors) {
      // Log more detailed error information
      logEvent("square_api_error", {
        errors: result.errors,
        fullErrorResponse: result,
      });

      const errorMessage =
        result.errors?.[0]?.detail ||
        result.errors?.[0]?.code ||
        "Payment failed";
      throw new Error(errorMessage);
    }

    logEvent("payment_successful", {
      paymentId: result.payment?.id,
      amount: result.payment?.amountMoney?.amount,
      status: result.payment?.status,
    });

    // Save the order to Airtable
    if (orderDetails) {
      try {
        logEvent("airtable_integration_started", {
          paymentId: result.payment?.id,
          hasOrderDetails: !!orderDetails,
        });

        // Get the base URL from the current request
        const url = new URL(request.url);
        const baseUrl = `${url.protocol}//${url.host}`;

        const airtableResponse = await fetch(`${baseUrl}/api/create-order`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderDetails,
            paymentId: result.payment?.id,
            paymentStatus: result.payment?.status,
            actualAmount:
              Number(result.payment?.amountMoney?.amount ?? 0) / 100, // Convert back from cents
          }),
        });

        if (airtableResponse.ok) {
          logEvent("airtable_integration_success", {
            paymentId: result.payment?.id,
          });
        } else {
          const airtableError = await airtableResponse.text();
          logEvent("airtable_integration_failed", {
            paymentId: result.payment?.id,
            error: airtableError,
          });
        }
      } catch (error) {
        logEvent("airtable_integration_error", {
          paymentId: result.payment?.id,
          error: error.message,
        });
        // Don't fail the payment if Airtable fails
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        payment: result.payment,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    logEvent("payment_error", {
      error: error.message,
      stack: error.stack,
      name: error.name,
    });

    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Internal server error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
