import { useCart } from '../../../hooks/useCart';
import Button from '../../common/Button';

export default function CheckoutSummary() {
  const { items, getTotal } = useCart();
  if (items.length === 0) return null;

  const subtotal = getTotal();
  const shipping = 250;
  const total = subtotal + shipping;

  return (
    <div className="bg-beige-200 dark:bg-[#1E293B]/50 p-6 rounded-lg border border-beige-400 dark:border-gray-700 sticky top-20 animate-fade-in">
      <h3 className="text-lg font-serif font-bold text-gray-900 dark:text-white mb-6">Order Summary</h3>
      <div className="space-y-3 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700 max-h-64 overflow-y-auto">
        {items.map((item) => (
          <div key={`${item.id}-${item.size}-${item.color}`} className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400 flex-1 truncate">{item.name} (x{item.quantity})</span>
            <span className="font-semibold text-gray-900 dark:text-white text-right ml-2">Rs. {(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div className="space-y-3 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400"><span>Subtotal</span><span>Rs. {subtotal.toFixed(2)}</span></div>
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>Shipping</span>
          <span>Rs. {shipping.toFixed(2)}</span>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-bold text-gray-900 dark:text-white">Total Amount</span>
        <span className="text-2xl font-bold text-accent-500">Rs. {total.toFixed(2)}</span>
      </div>
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <p className="text-xs text-blue-800 dark:text-blue-200">Transfer this exact amount to complete your order.</p>
      </div>
    </div>
  );
}
