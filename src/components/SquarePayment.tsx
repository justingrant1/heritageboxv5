import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, CreditCard as CardIcon, ShieldCheck } from 'lucide-react';
import styles from './SquarePayment.module.css';

// Define types for the Square SDK
interface Square {
  payments: (applicationId: string, locationId: string, options?: any) => SquarePayments;
}

interface SquarePayments {
  card: (options?: CardOptions) => Promise<SquareCard>;
}

interface CardOptions {
  style?: {
    '.input-container'?: {
      borderRadius?: string;
      borderColor?: string;
      borderWidth?: string;
      backgroundColor?: string;
      boxShadow?: string;
    };
    '.input-container.is-focus'?: {
      borderColor?: string;
      boxShadow?: string;
    };
    '.input-container.is-error'?: {
      borderColor?: string;
    };
    'input'?: {
      fontSize?: string;
      fontFamily?: string;
      color?: string;
      backgroundColor?: string;
    };
    'input::placeholder'?: {
      color?: string;
    };
  };
}

interface SquareCard {
  attach: (selector: string, options?: any) => Promise<void>;
  tokenize: () => Promise<{
    status: string;
    token?: string;
    details?: {
      card?: {
        brand: string;
        last4: string;
        expMonth: number;
        expYear: number;
      };
    };
  }>;
  destroy?: () => void;
}

interface SquarePaymentProps {
  onSuccess: (token: string, details: any) => void;
  buttonColorClass: string;
  isProcessing: boolean;
  amount: string;
}

declare global {
  interface Window { Square: Square; }
}

// Environment-aware configuration
const getSquareConfig = () => {
  const isProduction = import.meta.env.MODE === 'production';

  let appId;
  let locationId;

  if (isProduction) {
    appId = import.meta.env.VITE_SQUARE_APP_ID;
    locationId = import.meta.env.VITE_SQUARE_LOCATION_ID;
  } else {
    appId = import.meta.env.VITE_SQUARE_APP_ID || 'sq0idp-1Zchx5RshtaZ74spcf2w0A';
    locationId = import.meta.env.VITE_SQUARE_LOCATION_ID || 'LPFZYDYB5G5GM';
  }

  if (!appId || !locationId) {
    console.error("Square configuration is missing. Ensure VITE_SQUARE_APP_ID and VITE_SQUARE_LOCATION_ID are set in your .env file for the current environment.");
    return { appId: '', locationId: '', jsUrl: 'https://web.squarecdn.com/v1/square.js' };
  }
  
  return {
    appId,
    locationId,
    jsUrl: 'https://web.squarecdn.com/v1/square.js'
  };
};

const SquarePayment = ({ onSuccess, buttonColorClass, isProcessing, amount }: SquarePaymentProps) => {
  const [loaded, setLoaded] = useState(false);
  const [card, setCard] = useState<SquareCard | null>(null);
  const [cardLoading, setCardLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [config] = useState(getSquareConfig());

  // Cleanup function to destroy card instance
  const cleanupCard = () => {
    if (card && typeof card.destroy === 'function') {
      try {
        card.destroy();
      } catch (e) {
        console.warn("Error destroying card instance:", e);
      }
    }
  };

  useEffect(() => {
    const existingScript = document.getElementById('square-script');
    if (existingScript) {
      document.body.removeChild(existingScript);
    }

    const script = document.createElement('script');
    script.id = 'square-script';
    script.src = config.jsUrl;
    script.async = true;
    script.onload = () => {
      console.log("Square SDK loaded successfully");
      setLoaded(true);
    };
    script.onerror = (e) => {
      console.error("Failed to load Square SDK:", e);
      setError("Failed to load payment processor");
      toast.error("Failed to load payment processor", {
        description: "Please refresh the page and try again",
      });
    };
    document.body.appendChild(script);

    return () => {
      cleanupCard();
      const scriptToRemove = document.getElementById('square-script');
      if (scriptToRemove) {
        try {
          document.body.removeChild(scriptToRemove);
        } catch (e) {
          console.warn("Script already removed:", e);
        }
      }
    };
  }, [config.jsUrl]);

  useEffect(() => {
    if (!loaded || card) return;

    async function initializeCard() {
      if (!config.appId || !config.locationId) {
        const errorMessage = "Payment provider is not configured. Please contact support.";
        console.error(errorMessage);
        setError(errorMessage);
        return;
      }
      
      if (!window.Square) {
        console.error("Square SDK not available");
        setError("Payment processor not available");
        return;
      }

      try {
        setCardLoading(true);
        console.log("Initializing Square Payments:", config);

        const waitForContainer = () => {
          return new Promise((resolve, reject) => {
            const checkContainer = () => {
              const container = document.getElementById('card-container');
              if (container) {
                resolve(container);
              } else {
                setTimeout(checkContainer, 100);
              }
            };
            checkContainer();
            
            setTimeout(() => reject(new Error('Container timeout')), 5000);
          });
        };

        await waitForContainer();

        const payments = window.Square.payments(config.appId, config.locationId);

        console.log("Creating card instance");
        
        // Style to match the screenshot exactly - using only valid Square SDK properties
        const cardOptions: CardOptions = {
          style: {
            '.input-container': {
              borderRadius: '12px',
              borderColor: '#d1d5db',
              borderWidth: '2px'
            },
            '.input-container.is-focus': {
              borderColor: '#3b82f6'
            },
            '.input-container.is-error': {
              borderColor: '#ef4444'
            },
            'input': {
              fontSize: '16px',
              fontFamily: 'Arial, sans-serif',
              color: '#374151'
            },
            'input::placeholder': {
              color: '#9ca3af'
            }
          }
        };

        const cardInstance = await payments.card(cardOptions);

        const container = document.getElementById('card-container');
        if (!container) {
          throw new Error('Card container not found in DOM');
        }

        console.log("Attaching card to container");
        await cardInstance.attach('#card-container');
        console.log("Card attached successfully");

        setCard(cardInstance);
        setError(null);
      } catch (e) {
        console.error("Square initialization error:", e);
        setError("Failed to initialize payment form");
        toast.error("Failed to initialize payment form", {
          description: "Please try again or use a different payment method",
        });
      } finally {
        setCardLoading(false);
      }
    }

    setTimeout(initializeCard, 100);
  }, [loaded, card, config]);

  const handlePaymentSubmit = async () => {
    if (!card) {
      toast.error("Payment form not ready", {
        description: "Please wait for the payment form to load and try again",
      });
      return;
    }

    try {
      const result = await card.tokenize();
      if (result.status === 'OK' && result.token) {
        onSuccess(result.token, result.details);
      } else {
        toast.error("Payment processing failed", {
          description: "Please check your card details and try again",
        });
      }
    } catch (e) {
      console.error("Square payment error:", e);
      toast.error("Payment processing error", {
        description: "Please try again or use a different card",
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white">
      {/* Secure Payment Processing Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-green-500 text-white flex items-center justify-center rounded-full">
          <ShieldCheck size={20} />
        </div>
        <span className="text-lg font-medium text-gray-700">Secure payment processing</span>
      </div>
      
      {/* Card Information Section */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gray-700 text-white flex items-center justify-center rounded-xl">
            <CardIcon size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Card Information</h2>
            <p className="text-gray-600">Enter your card details below</p>
          </div>
        </div>
        
        {/* Credit Card Logos */}
        <div className="flex items-center gap-4 mb-6 justify-center">
          <img src="/mastercard.svg" alt="MasterCard" className="h-8" />
          <img src="/visa.svg" alt="Visa" className="h-8" />
          <img src="/amex.svg" alt="American Express" className="h-8" />
        </div>
        
        {/* Card Input Container - Always render the container for Square to attach */}
        <div className="space-y-4">
          <div 
            id="card-container" 
            className={styles.cardContainer}
            style={{ 
              display: ((cardLoading && !card) || !loaded || error) ? 'none' : 'block' 
            }}
          />
          
          {/* Loading overlay */}
          {((cardLoading && !card) || !loaded) && (
            <div className={`${styles.cardContainer} ${styles.loadingContainer} flex items-center justify-center`}>
              <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
              <span className="ml-2 text-gray-500">Loading secure payment...</span>
            </div>
          )}
          
          {/* Error overlay */}
          {error && (
            <div className={`${styles.cardContainer} ${styles.errorContainer} flex flex-col items-center justify-center`}>
              <p className="font-medium">{error}</p>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="mt-4"
              >
                Refresh Page
              </Button>
            </div>
          )}
        </div>
        
        {/* All Major Credit Cards Accepted */}
        <div className="flex items-center justify-center gap-2 text-gray-600 mt-4">
          <CardIcon size={16} />
          <span className="text-sm">All major credit cards accepted</span>
        </div>
      </div>
      
      {/* Pay Button */}
      <Button
        onClick={handlePaymentSubmit}
        className="w-full h-14 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 mb-6"
        disabled={isProcessing || !card || !!error}
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Processing Payment...
          </>
        ) : (
          <>
            Pay {amount}
            <ShieldCheck className="w-5 h-5" />
          </>
        )}
      </Button>
      
      {/* Security Badges */}
      <div className="flex items-center justify-around mb-6 py-4">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 bg-green-500 text-white flex items-center justify-center rounded-full mb-2">
            <ShieldCheck size={16} />
          </div>
          <span className="text-sm text-gray-600 text-center">SSL Secured</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 bg-green-500 text-white flex items-center justify-center rounded-full mb-2">
            <ShieldCheck size={16} />
          </div>
          <span className="text-sm text-gray-600 text-center">Powered by<br/>Square</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 bg-green-500 text-white flex items-center justify-center rounded-full mb-2">
            <ShieldCheck size={16} />
          </div>
          <span className="text-sm text-gray-600 text-center">PCI Compliant</span>
        </div>
      </div>
      
      {/* Bottom Security Message */}
      <div className="flex items-center justify-center gap-2 text-sm text-gray-600 text-center">
        <ShieldCheck size={16} className="text-green-600" />
        <span>Your payment information is secure and encrypted with 256-bit SSL</span>
      </div>
    </div>
  );
};

export default SquarePayment;
