import { useState } from 'react';
import CheckoutForm from "./CheckoutForm";
import BankDetailsCard from "./BankDetailsCard";
import PaymentScreenshot from "./PaymentScreenshot";
import CheckoutSummary from "./CheckoutSummary";

export default function CheckoutSection() {
  const [customerData, setCustomerData] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const handleFormSubmit = (data) => {
    setCustomerData(data);
  };

  const handleOrderPlaced = (id) => {
    setOrderId(id);
    setOrderPlaced(true);
  };

  return (
    <div className="min-h-screen bg-beige-300 dark:bg-[#080E1A]">
      {/* Hero */}
      <div className="py-16 bg-beige-300 dark:bg-[#080E1A] border-b border-beige-400 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 text-center animate-slide-in">
          <h1 className="text-5xl md:text-6xl font-serif text-[#1A1A1A] dark:text-white mb-4">
            {orderPlaced ? '✓ Order Placed Successfully' : 'Checkout'}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {orderPlaced ? `Your order ID: ${orderId}` : 'Complete your order with online transfer'}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {orderPlaced ? (
          <div className="text-center py-12">
            <div className="mb-6 text-6xl">✅</div>
            <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-4">
              Thank you for your order!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              We have received your payment screenshot and order details. Our team will verify your payment and process your order shortly. You will receive an email confirmation with tracking information.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8 max-w-lg mx-auto">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Order ID:</strong> {orderId} <br/>
                <strong>Status:</strong> Pending Verification <br/>
                Check your email for updates
              </p>
            </div>
            <a href="/shop" className="inline-block px-8 py-3 bg-accent-500 hover:bg-accent-600 text-white font-semibold rounded transition">
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left Column - Forms */}
            <div className="md:col-span-2 space-y-8">
              {/* Shipping Form */}
              <CheckoutForm onSubmit={handleFormSubmit} />

              {/* Bank Details */}
              {customerData && <BankDetailsCard />}

              {/* Payment Screenshot */}
              {customerData && <PaymentScreenshot customerData={customerData} onOrderPlaced={handleOrderPlaced} />}
            </div>

            {/* Right Column - Summary */}
            <div className="md:col-span-1">
              <CheckoutSummary />
            </div>
          </div>
        )}
        </div>

      {/* Footer Info */}
      <div className="bg-beige-200 dark:bg-[#1E293B]/50 border-t border-beige-400 dark:border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl mb-2">🔒</div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                Secure
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your data is encrypted and secure
              </p>
            </div>
            <div>
              <div className="text-3xl mb-2">🚚</div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                Fast Delivery
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Shipped within 2-3 business days
              </p>
            </div>
            <div>
              <div className="text-3xl mb-2">💬</div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                Support
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Chat with our team anytime
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
