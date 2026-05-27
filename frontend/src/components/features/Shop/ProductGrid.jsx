import { useState, useEffect } from "react";
import ProductCard from "../../common/ProductCard";
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

export default function ProductGrid() {
  const { addItem } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest");

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
      finally { setLoading(false); }
    })();
  }, []);

  const sorted = [...products];
  if (sortBy === "price-low") sorted.sort((a, b) => a.price - b.price);
  else if (sortBy === "price-high") sorted.sort((a, b) => b.price - a.price);
  else if (sortBy === "rating") sorted.sort((a, b) => b.rating - a.rating);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5EDE0' }}>
      <div className="py-16 bg-gradient-to-b from-[#F5EDE0] to-[#F5EDE0] border-b border-[#B8A693]">
        <div className="max-w-6xl mx-auto px-4 text-center animate-slide-in">
          <p className="text-[#C6A43F] font-semibold mb-2 text-sm tracking-wider">COLLECTIONS</p>
          <h1 className="text-5xl md:text-6xl font-serif text-[#1A1A1A] mb-4">Discover Our Collection</h1>
          <p className="text-lg text-[#666666] max-w-2xl mx-auto">Hand-crafted press-on nails designed for every occasion and aesthetic.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <p className="text-[#666666]">
            Showing <span className="font-semibold text-[#1A1A1A]">{loading ? "..." : sorted.length}</span> products
          </p>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-[#B8A693] rounded bg-white text-[#1A1A1A] text-sm focus:outline-none focus:ring-2 focus:ring-[#C6A43F]"
          >
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rating</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-[#C6A43F] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-[#666666]">Loading products...</p>
          </div>
        ) : sorted.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {sorted.map((product, index) => (
              <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                  <ProductCard
                    product={product}
                    onAddToCart={(p) => { addItem(p, "M", 1); }}
                  />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-[#666666] text-lg">No products found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
