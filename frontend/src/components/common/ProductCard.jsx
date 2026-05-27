import { Link } from "react-router-dom";
import Button from "./Button";
import Card from "./Card";

export default function ProductCard({ product, onAddToCart }) {
  return (
    <Card
      hover
      className="overflow-hidden group animate-fade-in"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden bg-neutral-200 dark:bg-neutral-600 aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <p className="text-xs text-accent-500 font-medium uppercase tracking-wider mb-1">
            {product.collection}
          </p>
          <h3 className="font-serif text-lg font-bold text-neutral-800 dark:text-neutral-100 mb-2 line-clamp-2">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex text-accent-500">
              {"⭐".repeat(Math.floor(product.rating))}
            </div>
            <span className="text-xs text-neutral-600 dark:text-neutral-400">
              ({product.reviewCount})
            </span>
          </div>
          <p className="text-lg font-bold text-accent-500 mb-3">
            Rs. {product.price.toFixed(2)}
          </p>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <Button
          variant="primary"
          size="md"
          className="w-full"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
        >
          Add to Cart
        </Button>
      </div>
    </Card>
  );
}
