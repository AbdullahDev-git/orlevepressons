import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../common/ProductCard";
import Button from "../../common/Button";
import { useCart } from "../../../hooks/useCart";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

function mapProduct(p) {
  const images = (() => {
    try { const imgs = JSON.parse(p.images); return Array.isArray(imgs) && imgs.length > 0 ? imgs : []; } catch { return []; }
  })();
  const sizes = (() => {
    try { const s = JSON.parse(p.sizes); return Array.isArray(s) && s.length > 0 ? s : ["XS", "S", "M", "L", "XL"]; } catch { return ["XS", "S", "M", "L", "XL"]; }
  })();
  const image = images[0] || "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400";
  return {
    id: p.id, name: p.name, collection: p.category || "Collection",
    price: p.salePrice || p.price, image, images,
    description: p.description || "", rating: p.rating || 0, reviewCount: 0,
    sizes, colors: [], category: p.category || "", inStock: p.stock > 0, stock: p.stock, slug: p.slug,
  };
}

export default function CuratedDropSection() {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API}/products`, { cache: "no-cache" });
        const data = await res.json();
        if (data.success) {
          setProducts(data.data.map(mapProduct));
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    })();
  }, []);

  const featuredProducts = products.slice(0, 3);

  const handleAddToCart = (product) => {
    addItem(product, "M", 1);
  };

  return (
    <section className="py-16 md:py-24 bg-beige-200 dark:bg-[#080E1A]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 animate-slide-in">
          <p className="text-accent-500 text-sm font-serif tracking-widest uppercase mb-3">
            Shop the Collection
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
            Featured Products
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            Our latest press-on nail designs, crafted for every mood and moment.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate("/shop")}
            className="animate-fade-in"
          >
            DISCOVER MORE SETS
          </Button>
        </div>
      </div>
    </section>
  );
}
