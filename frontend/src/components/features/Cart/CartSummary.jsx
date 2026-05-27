import { useNavigate } from "react-router-dom";
import { useCart } from "../../../hooks/useCart";
import Button from "../../common/Button";

export default function CartSummary() {
  const navigate = useNavigate();
  const { items, getTotal } = useCart();

  const subtotal = getTotal();
  const shipping = 250;
  const total = subtotal + shipping;

  if (items.length === 0) return null;

  return (
    <div className="bg-beige-200 dark:bg-[#1E293B]/50 p-6 rounded-lg border border-beige-400 dark:border-gray-700 sticky top-20 animate-fade-in">
      <h3 className="text-lg font-serif font-bold text-gray-900 dark:text-white mb-6">Order Summary</h3>

      {/* Price Breakdown */}
      <div className="space-y-3 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>Subtotal</span><span>Rs. {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>Shipping</span>
          <span>Rs. {shipping.toFixed(2)}</span>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
        <span className="text-2xl font-bold text-accent-500">Rs. {total.toFixed(2)}</span>
      </div>

      <Button variant="primary" size="lg" className="w-full mb-3" onClick={() => navigate("/checkout")}>Proceed to Checkout</Button>
      <a href="/shop" className="block text-center text-sm text-accent-500 hover:text-accent-600 transition">Continue Shopping</a>
    </div>
  );
}
