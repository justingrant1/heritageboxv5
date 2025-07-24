export const config = {
    runtime: 'edge',
};

interface CardData {
  cardNumber: string;
  expirationMonth: string;
  expirationYear: string;
  cvv: string;
  postalCode?: string;
  cardholderName?: string;
}

export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { cardNumber, expirationMonth, expirationYear, cvv, postalCode, cardholderName }: CardData = await request.json();

    // Validate required fields
    if (!cardNumber || !expirationMonth || !expirationYear || !cvv) {
      return new Response(JSON.stringify({ 
        error: 'Missing required card information',
        success: false 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Basic card validation
    const cleanCardNumber = cardNumber.replace(/\s/g, '');
    
    // Luhn algorithm validation
    if (!isValidCardNumber(cleanCardNumber)) {
      return new Response(JSON.stringify({ 
        error: 'Invalid card number',
        success: false 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Expiration validation
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    const expYear = parseInt(expirationYear);
    const expMonth = parseInt(expirationMonth);
    
    if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
      return new Response(JSON.stringify({ 
        error: 'Card has expired',
        success: false 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // For demo purposes, create a mock token
    // In production, this would integrate with Square's actual tokenization API
    const mockToken = generateMockToken(cleanCardNumber, cvv);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Return success with mock token
    return new Response(JSON.stringify({
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
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Square tokenization error:', error);
    return new Response(JSON.stringify({ 
      error: 'Payment processing error',
      success: false 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
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

// Generate mock token for demo purposes
function generateMockToken(cardNumber: string, cvv: string): string {
  const timestamp = Date.now().toString();
  // Use crypto.subtle for edge runtime compatibility instead of Buffer
  const encoder = new TextEncoder();
  const data = encoder.encode(`${cardNumber.slice(-4)}_${cvv}_${timestamp}`);
  const hashArray = Array.from(new Uint8Array(data));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return `sq_token_${hashHex.replace(/[^a-zA-Z0-9]/g, '').substring(0, 16)}`;
}
