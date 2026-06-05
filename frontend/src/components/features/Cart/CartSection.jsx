import { useCart } from '../../../hooks/useCart';
import CartItems from "./CartItems";
import CartSummary from "./CartSummary";

export default function CartSection() {
  const { items } = useCart();
  const isEmpty = items.length === 0;

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
        {isEmpty ? (
          <div className="flex justify-center">
            <div className="text-center py-12">
              <div className="text-5xl mb-4">🛒</div>
              <h3 className="text-2xl font-serif text-gray-900 dark:text-white mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Discover our collection of luxury press-on nails
              </p>
              <a
                href="/shop"
                className="inline-block px-8 py-3 bg-accent-500 !text-white rounded hover:bg-accent-600 transition"
              >
                Continue Shopping
              </a>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <CartItems />
            </div>
            <div className="md:col-span-1">
              <CartSummary />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
