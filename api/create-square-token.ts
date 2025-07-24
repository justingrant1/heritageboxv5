import type { VercelRequest, VercelResponse } from '@vercel/node';

interface CardData {
  cardNumber: string;
  expirationMonth: string;
  expirationYear: string;
  cvv: string;
  postalCode?: string;
  cardholderName?: string;
}

const handler = async (req: VercelRequest, res: VercelResponse) => {
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

    // For demo purposes, create a mock token
    // In production, this would integrate with Square's actual tokenization API
    const mockToken = generateMockToken(cleanCardNumber, cvv);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Return success with mock token
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

// Generate mock token for demo purposes
function generateMockToken(cardNumber: string, cvv: string): string {
  const timestamp = Date.now().toString();
  const hash = Buffer.from(`${cardNumber.slice(-4)}_${cvv}_${timestamp}`).toString('base64');
  return `sq_token_${hash.replace(/[^a-zA-Z0-9]/g, '').substring(0, 16)}`;
}

export default handler;
