import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ImageGallery from "./ImageGallery";
import ProductInfo from "./ProductInfo";
import ProductTabs from "./ProductTabs";


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
    id: p.id,
    name: p.name,
    collection: p.category || "Collection",
    price: p.salePrice || p.price,
    image,
    images,
    description: p.description || "",
    rating: p.rating || 0,
    reviewCount: 0,
    sizes,
    colors: [],
    category: p.category || "",
    inStock: p.stock > 0,
    stock: p.stock,
    slug: p.slug,
  };
}

export default function ProductDetailSection() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    setLoading(true);
    const numericId = parseInt(id);
    try {
      const res = await fetch(`${API}/products/${numericId}`);
      const data = await res.json();
      if (data.success) {
        setProduct(mapProduct(data.data));
      } else {
        const fallback = mockProducts.find((p) => p.id === numericId || p.id === id);
        setProduct(fallback || null);
      }
    } catch {
      const fallback = mockProducts.find((p) => p.id === numericId || p.id === id);
      setProduct(fallback || null);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-beige-300 dark:bg-[#080E1A]">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-accent-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-beige-300 dark:bg-[#080E1A]">
        <div className="text-center">
          <h1 className="text-3xl font-serif text-[#1A1A1A] dark:text-white mb-4">Product not found</h1>
          <a href="/shop" className="text-accent-500 hover:text-accent-600 transition">Back to Shop →</a>
        </div>
      </div>
    );
  }

  const images = [product.image, ...(product.images || [])].filter(Boolean);

  return (
    <div className="min-h-screen bg-beige-300 dark:bg-[#080E1A]">
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
          <a href="/" className="hover:text-gray-900 dark:hover:text-white transition">Home</a>
          {" / "}
          <a href="/shop" className="hover:text-gray-900 dark:hover:text-white transition">Shop</a>
          {" / "}
          <span className="text-gray-900 dark:text-white">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          <ImageGallery images={images} productName={product.name} />
          <ProductInfo product={product} />
        </div>
        <ProductTabs product={product} />
      </div>
    </div>
  );
}
