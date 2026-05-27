import ProductCard from "../../common/ProductCard";
import { useCart } from "../../../hooks/useCart";

export default function RelatedProducts({ currentProductId, currentCollection, allProducts = [] }) {
  const { addItem } = useCart();
  const related = allProducts
    .filter((p) => p.collection === currentCollection && p.id !== currentProductId)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <div className="py-16 border-t border-gray-200 dark:border-gray-700 animate-fade-in">
      <h2 className="text-3xl font-serif text-gray-900 dark:text-white mb-8">
        More from {currentCollection}
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {related.map((product, index) => (
          <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
            <ProductCard
              product={product}
              onAddToCart={(p) => { addItem(p, "M", 1); }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
