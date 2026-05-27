import { useState } from "react";
import { useCart } from "../../../hooks/useCart";
import Button from "../../common/Button";

export default function ProductInfo({ product }) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: "Classic",
      quantity: quantity,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, quantity + value);
    setQuantity(newQuantity);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        {product.inStock === false && (
          <span className="text-sm font-semibold text-red-500 uppercase mb-2">
            Out of Stock
          </span>
        )}
        <h1 className="text-4xl font-serif text-gray-900 dark:text-white mb-2">
          {product.name}
        </h1>
      </div>

      {/* Price */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
        <p className="text-4xl font-bold text-gray-900 dark:text-white">
          Rs. {product.price.toFixed(2)}
        </p>
      </div>

      {/* Size Selection */}
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex justify-between items-center">
          Choose Size
          <a
            href="/size-guide"
            className="text-sm text-accent-500 hover:text-accent-600"
          >
            Size Guide →
          </a>
        </h3>
        <div className="grid grid-cols-5 gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`py-3 px-2 rounded border-2 font-semibold text-sm transition ${
                selectedSize === size
                  ? "border-accent-500 bg-accent-50 dark:bg-accent-500/10 text-accent-600 dark:text-accent-400"
                  : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-400"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity Selector */}
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
          Quantity
        </h3>
        <div className="flex items-center gap-4 w-fit">
          <button
            onClick={() => handleQuantityChange(-1)}
            className="w-10 h-10 border border-gray-200 dark:border-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-900 transition"
          >
            −
          </button>
          <span className="text-lg font-semibold text-gray-900 dark:text-white w-8 text-center">
            {quantity}
          </span>
          <button
            onClick={() => handleQuantityChange(1)}
            className="w-10 h-10 border border-gray-200 dark:border-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-900 transition"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to Cart */}
      <div className="space-y-3 border-t border-b border-gray-200 dark:border-gray-700 py-6">
        <Button
          onClick={handleAddToCart}
          variant="primary"
          size="lg"
          disabled={!product.inStock}
          className="w-full"
        >
          {isAdded ? "✓ Added to Cart" : "Add to Cart"}
        </Button>
      </div>

      {/* Description */}
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
          About This Collection
        </h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* How To Wear */}
      {product.howToWear && product.howToWear.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
            How to Wear
          </h3>
          <ol className="space-y-2 text-gray-600 dark:text-gray-400">
            {product.howToWear.map((step, index) => (
              <li key={index} className="flex gap-3">
                <span className="font-semibold text-accent-500 min-w-6">
                  {index + 1}.
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

    </div>
  );
}
