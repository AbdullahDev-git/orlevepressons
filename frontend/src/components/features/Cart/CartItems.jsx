import { useCart } from '../../../hooks/useCart';

export default function CartItems() {
  const { items, removeItem, updateQuantity } = useCart();

  return (
    <div className="space-y-4 animate-fade-in">
      {items.map((item) => (
        <div
          key={`${item.id}-${item.size}-${item.color}`}
          className="flex gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md dark:hover:shadow-gray-800/50 transition"
        >
          {/* Product Image */}
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-900 rounded overflow-hidden flex-shrink-0">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">
              {item.name}
            </h3>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              <p>Size: <span className="font-medium">{item.size}</span></p>
              <p>Color: <span className="font-medium">{item.color}</span></p>
            </div>
            <p className="text-lg font-bold text-accent-500 mt-2">
              Rs. {item.price.toFixed(2)}
            </p>
          </div>

          {/* Quantity & Actions */}
          <div className="flex flex-col items-end justify-between">
            <button
              onClick={() => removeItem(item.id, item.size, item.color)}
              className="text-red-500 hover:text-red-600 text-sm font-medium transition"
            >
              Remove
            </button>

            <div className="flex items-center gap-2 border border-gray-200 dark:border-gray-700 rounded">
              <button
                onClick={() =>
                  updateQuantity(item.id, item.size, item.color, item.quantity - 1)
                }
                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                disabled={item.quantity <= 1}
              >
                −
              </button>
              <span className="w-8 text-center font-semibold text-gray-900 dark:text-white">
                {item.quantity}
              </span>
              <button
                onClick={() =>
                  updateQuantity(item.id, item.size, item.color, item.quantity + 1)
                }
                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                +
              </button>
            </div>

            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              Rs. {(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
