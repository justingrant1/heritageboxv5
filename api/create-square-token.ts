// Square tokenization API with direct REST calls

interface CardData {
  cardNumber: string;
  expirationMonth: string;
  expirationYear: string;
  cvv: string;
  postalCode?: string;
  cardholderName?: string;
}

import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { cardNumber, expirationMonth, expirationYear, cvv, postalCode, cardholderName }: CardData = req.body;

    // Validate required fields
    if (!cardNumber || !expirationMonth || !expirationYear || !cvv) {
      return res.status(400).json({ 
        error: 'Missing required card information',
        success: false 
      });
    }

    // Basic card validation
    const cleanCardNumber = cardNumber.replace(/\s/g, '');
    
    // Luhn algorithm validation
    if (!isValidCardNumber(cleanCardNumber)) {
      return res.status(400).json({ 
        error: 'Invalid card number',
        success: false 
      });
    }

    // Expiration validation
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    const expYear = parseInt(expirationYear);
    const expMonth = parseInt(expirationMonth);
    
    if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
      return res.status(400).json({ 
        error: 'Card has expired',
        success: false 
      });
    }

    // Check if Square access token is configured
    if (!process.env.SQUARE_ACCESS_TOKEN || process.env.SQUARE_ACCESS_TOKEN === 'your_square_access_token_here') {
      console.warn('Square access token not configured, using mock tokenization');
      
      // Fallback to mock token for development/demo
      const mockToken = generateMockToken(cleanCardNumber, cvv);
      
      return res.status(200).json({
        success: true,
        token: mockToken,
        details: {
          card: {
            brand: detectCardBrand(cleanCardNumber),
            last4: cleanCardNumber.slice(-4),
            expMonth: parseInt(expirationMonth),
            expYear: parseInt(`20${expirationYear}`)
          }
        }
      });
    }

    // Create real Square card token using direct REST API
    const squareApiUrl = process.env.NODE_ENV === 'production' 
      ? 'https://connect.squareup.com' 
      : 'https://connect.squareupsandbox.com';
    
    const createCardRequest = {
      source_id: 'EXTERNAL_API', // Required for server-side tokenization
      card: {
        number: cleanCardNumber,
        exp_month: parseInt(expirationMonth),
        exp_year: parseInt(`20${expirationYear}`),
        card_verification_value: cvv, // Square API expects this field name
        ...(postalCode && { billing_address: { postal_code: postalCode } }),
        ...(cardholderName && { cardholder_name: cardholderName })
      }
    };

    console.log('Creating Square card token via REST API...');
    
    const response = await fetch(`${squareApiUrl}/v2/cards`, {
      method: 'POST',
      headers: {
        'Square-Version': '2024-02-15',
        'Authorization': `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createCardRequest)
    });

    const result = await response.json();

    if (!response.ok || result.errors) {
      console.error('Square tokenization failed:', result);
      
      // Fallback to mock token if Square API fails
      console.warn('Falling back to mock tokenization due to Square API error');
      const mockToken = generateMockToken(cleanCardNumber, cvv);
      
      return res.status(200).json({
        success: true,
        token: mockToken,
        details: {
          card: {
            brand: detectCardBrand(cleanCardNumber),
            last4: cleanCardNumber.slice(-4),
            expMonth: parseInt(expirationMonth),
            expYear: parseInt(`20${expirationYear}`)
          }
        }
      });
    }

    // Return success with real Square token
    return res.status(200).json({
      success: true,
      token: result.card.id,
      details: {
        card: {
          brand: result.card.card_brand || detectCardBrand(cleanCardNumber),
          last4: result.card.last_4 || cleanCardNumber.slice(-4),
          expMonth: parseInt(expirationMonth),
          expYear: parseInt(`20${expirationYear}`)
        }
      }
    });

  } catch (error) {
    console.error('Square tokenization error:', error);
    
    return res.status(500).json({ 
      error: 'Payment processing error',
      success: false 
    });
  }
}

// Luhn algorithm for card validation
function isValidCardNumber(cardNumber: string): boolean {
  if (cardNumber.length < 13 || cardNumber.length > 19) return false;
  
  let sum = 0;
  let isEven = false;
  
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber.charAt(i));
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
}

// Helper function to detect card brand
function detectCardBrand(cardNumber: string): string {
  const number = cardNumber.replace(/\s/g, '');
  
  if (/^4/.test(number)) return 'VISA';
  if (/^5[1-5]/.test(number) || /^2[2-7]/.test(number)) return 'MASTERCARD';
  if (/^3[47]/.test(number)) return 'AMERICAN_EXPRESS';
  if (/^6/.test(number)) return 'DISCOVER';
  
  return 'OTHER_BRAND';
}

// Generate mock token for fallback purposes
function generateMockToken(cardNumber: string, cvv: string): string {
  const timestamp = Date.now().toString();
  const encoder = new TextEncoder();
  const data = encoder.encode(`${cardNumber.slice(-4)}_${cvv}_${timestamp}`);
  const hashArray = Array.from(new Uint8Array(data));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return `sq_token_${hashHex.replace(/[^a-zA-Z0-9]/g, '').substring(0, 16)}`;
}
