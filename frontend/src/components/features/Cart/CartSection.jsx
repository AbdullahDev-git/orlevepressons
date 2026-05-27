import CartItems from "./CartItems";
import CartSummary from "./CartSummary";

export default function CartSection() {
  return (
    <div className="min-h-screen bg-beige-300 dark:bg-[#080E1A]">
      {/* Hero */}
      <div className="py-16 bg-beige-300 dark:bg-[#080E1A] border-b border-beige-400 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 text-center animate-slide-in">
          <h1 className="text-5xl md:text-6xl font-serif text-[#1A1A1A] dark:text-white mb-4">
            Your Cart
          </h1>
          <p className="text-lg text-[#666666] dark:text-gray-400">
            Review your items and proceed to checkout
          </p>
        </div>
      </div>

      {/* Cart Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2">
            <CartItems />
          </div>

          {/* Cart Summary */}
          <div className="md:col-span-1">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
