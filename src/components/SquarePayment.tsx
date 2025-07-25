import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, CreditCard as CardIcon, ShieldCheck } from "lucide-react";
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";
import { TokenResult } from "@square/web-sdk";

// Define types for the Square SDK
interface Square {
  payments: (
    applicationId: string,
    locationId: string,
    options?: any
  ) => SquarePayments;
}

interface SquarePayments {
  card: (options?: CardOptions) => Promise<SquareCard>;
}

interface CardOptions {
  style?: {
    ".input-container"?: {
      borderRadius?: string;
      borderColor?: string;
      borderWidth?: string;
      backgroundColor?: string;
      boxShadow?: string;
    };
    ".input-container.is-focus"?: {
      borderColor?: string;
      boxShadow?: string;
    };
    ".input-container.is-error"?: {
      borderColor?: string;
    };
    input?: {
      fontSize?: string;
      fontFamily?: string;
      color?: string;
      backgroundColor?: string;
    };
    "input::placeholder"?: {
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
  buttonColorClass?: string;
  isProcessing: boolean;
  amount: string;
}

const SquarePayment = ({
  onSuccess,
  isProcessing,
  amount,
}: SquarePaymentProps) => {
  return (
    <div className="max-w-lg mx-auto bg-white">
      {/* Secure Payment Processing Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-green-500 text-white flex items-center justify-center rounded-full">
          <ShieldCheck size={20} />
        </div>
        <span className="text-lg font-medium text-gray-700">
          Secure payment processing
        </span>
      </div>

      {/* Card Information Section */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gray-700 text-white flex items-center justify-center rounded-xl">
            <CardIcon size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Card Information
            </h2>
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
          <PaymentForm
            applicationId={import.meta.env.VITE_SQUARE_APP_ID}
            locationId={import.meta.env.VITE_SQUARE_LOCATION_ID}
            cardTokenizeResponseReceived={(props: TokenResult) => {
              if (props.status === "OK" && props.token) {
                onSuccess(props.token, props.details);
              } else {
                toast.error("Payment processing failed", {
                  description: "Please check your card details and try again",
                });
              }
            }}
          >
            <CreditCard
              buttonProps={{
                css: {
                  padding: "0px",
                  borderRadius: "0.8em",
                },
              }}
            >
              <Button className="w-full h-14 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3">
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
            </CreditCard>
          </PaymentForm>
        </div>

        {/* All Major Credit Cards Accepted */}
        <div className="flex items-center justify-center gap-2 text-gray-600 mt-4">
          <CardIcon size={16} />
          <span className="text-sm">All major credit cards accepted</span>
        </div>
      </div>

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
          <span className="text-sm text-gray-600 text-center">
            Powered by
            <br />
            Square
          </span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 bg-green-500 text-white flex items-center justify-center rounded-full mb-2">
            <ShieldCheck size={16} />
          </div>
          <span className="text-sm text-gray-600 text-center">
            PCI Compliant
          </span>
        </div>
      </div>

      {/* Bottom Security Message */}
      <div className="flex items-center justify-center gap-2 text-sm text-gray-600 text-center">
        <ShieldCheck size={16} className="text-green-600" />
        <span>
          Your payment information is secure and encrypted with 256-bit SSL
        </span>
      </div>
    </div>
  );
};

export default SquarePayment;
