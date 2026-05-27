import { useState, useEffect, useRef } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import { useAdmin } from "../../context/AdminContext";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export default function AdminProducts() {
  const { token } = useAdmin();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    price: "",
    category: "",
    description: "",
    stock: "10",
    images: [],
    sizes: [],
  });
  const fileInputRef = useRef(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/products`, { cache: "no-cache" });
      const data = await res.json();
      if (data.success) {
        const mapped = data.data.map((p) => {
          const images = (() => {
            try { const imgs = JSON.parse(p.images); return Array.isArray(imgs) && imgs.length > 0 ? imgs : []; } catch { return []; }
          })();
          const sizes = (() => {
            try { const s = JSON.parse(p.sizes); return Array.isArray(s) && s.length > 0 ? s : ["XS", "S", "M", "L", "XL"]; } catch { return ["XS", "S", "M", "L", "XL"]; }
          })();
          return {
            id: p.id,
            name: p.name,
            slug: p.slug,
            price: p.salePrice || p.price,
            category: p.category || "Collection",
            description: p.description || "",
            stock: p.stock,
            image: images[0] || "https://via.placeholder.com/300",
            images,
            sizes,
            inStock: p.stock > 0,
          };
        });
        setProducts(mapped);
      }
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const uploadImages = async (files) => {
    if (!token || token === "mock-token") {
      alert("Please login with valid admin credentials to upload images.");
      return;
    }
    setUploading(true);
    const uploaded = [];
    for (const file of files) {
      const form = new FormData();
      form.append("file", file);
      try {
        const res = await fetch(`${API}/upload`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: form,
        });
        const data = await res.json();
        if (data.success) uploaded.push(data.data.url);
      } catch (err) {
        console.error("Upload failed:", err);
      }
    }
    setFormData((prev) => ({ ...prev, images: [...prev.images, ...uploaded] }));
    setUploading(false);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) uploadImages(files);
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleAddProduct = async () => {
    if (!formData.name || !formData.price || !formData.category) {
      alert("Please fill in all required fields");
      return;
    }

    const slug = formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

    try {
      const res = await fetch(`${API}/products`, {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          slug,
          description: formData.description,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock) || 10,
          sizes: formData.sizes.length > 0 ? formData.sizes : ["XS", "S", "M", "L", "XL"],
          images: formData.images,
          category: formData.category,
          featured: false,
        }),
      });
      const data = await res.json();
      if (data.success) {
        await fetchProducts();
        resetForm();
      } else {
        alert(data.message || "Failed to save product");
      }
    } catch (err) {
      alert("Failed to save product");
    }
  };

  const resetForm = () => {
    setFormData({ name: "", slug: "", price: "", category: "", description: "", stock: "10", images: [], sizes: [] });
    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      slug: product.slug || "",
      price: product.price.toString(),
      category: product.category,
      description: product.description,
      stock: product.stock?.toString() || "10",
      images: product.images || (product.image ? [product.image] : []),
      sizes: product.sizes || [],
    });
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`${API}/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        await fetchProducts();
      }
    } catch (err) {
      console.error("Failed to delete product:", err);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-serif font-bold text-white mb-2">Products Management</h1>
          <p className="text-gray-400">Manage your product inventory</p>
        </div>
        <Button variant="primary" onClick={() => { if (!showForm) resetForm(); setShowForm(!showForm); }}>
          {showForm ? "Cancel" : "+ Add Product"}
        </Button>
      </div>

      {showForm && (
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 mb-8 animate-fade-in">
          <h2 className="text-lg font-semibold text-white mb-4">
            {editingId ? "Edit Product" : "Add New Product"}
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Product Name" type="text" name="name" placeholder="Product name" value={formData.name} onChange={handleChange} required />
            <Input label="Slug" type="text" name="slug" placeholder="auto-generated if empty" value={formData.slug} onChange={handleChange} />
            <Input label="Price (Rs.)" type="number" name="price" placeholder="2990" value={formData.price} onChange={handleChange} required />
            <Input label="Category" type="text" name="category" placeholder="Collection name" value={formData.category} onChange={handleChange} required />
            <Input label="Stock" type="number" name="stock" placeholder="10" value={formData.stock} onChange={handleChange} />
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Available Sizes</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {["XS", "S", "M", "L", "XL"].map((size) => (
                  <label key={size} className={`px-3 py-1.5 rounded border-2 text-sm font-medium cursor-pointer transition ${formData.sizes.includes(size) ? "border-accent-500 bg-accent-500/10 text-accent-400" : "border-gray-600 text-gray-400 hover:border-gray-400"}`}>
                    <input type="checkbox" value={size} checked={formData.sizes.includes(size)} onChange={(e) => { const checked = e.target.checked; setFormData(prev => ({ ...prev, sizes: checked ? [...prev.sizes, size] : prev.sizes.filter(s => s !== size) })); }} className="hidden" />
                    {size}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">Product Images</label>
            <input type="file" ref={fileInputRef} multiple accept="image/*" onChange={handleFileSelect} className="hidden" />
            <div className="flex flex-wrap gap-3 mb-3">
              {formData.images.map((url, i) => (
                <div key={i} className="relative w-20 h-20 rounded overflow-hidden border border-gray-700 group">
                  <img src={url} alt={`Product ${i + 1}`} className="w-full h-full object-cover" />
                  <button onClick={() => removeImage(i)} className="absolute top-0 right-0 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-bl opacity-0 group-hover:opacity-100 transition">×</button>
                </div>
              ))}
              <button onClick={() => fileInputRef.current?.click()} disabled={uploading} className="w-20 h-20 border-2 border-dashed border-gray-600 rounded flex items-center justify-center text-2xl text-gray-400 hover:text-accent-500 hover:border-accent-500 transition disabled:opacity-50">
                {uploading ? <span className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></span> : "+"}
              </button>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea name="description" placeholder="Product description" value={formData.description} onChange={handleChange} rows="3" className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-700 text-white" />
          </div>

          <Button variant="primary" className="mt-4 w-full" onClick={handleAddProduct}>
            {editingId ? "Update Product" : "Add Product"}
          </Button>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-4 border-accent-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500">Loading products...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400">No products yet. Click "+ Add Product" to create one.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition">
              <div className="w-full h-40 bg-gray-800">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-white line-clamp-1">{product.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded font-medium ${product.inStock ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"}`}>
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mb-2">{product.category}</p>
                <p className="text-lg font-bold text-accent-500 mb-4">Rs. {product.price.toFixed(2)}</p>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(product)} className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition duration-200">Edit</button>
                  <button onClick={() => handleDelete(product.id)} className="flex-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition duration-200">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/50 rounded-lg">
        <h3 className="font-semibold text-white mb-3">📊 Inventory Summary</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <div><p className="text-sm text-gray-400">Total Products</p><p className="text-2xl font-bold text-white">{products.length}</p></div>
          <div><p className="text-sm text-gray-400">In Stock</p><p className="text-2xl font-bold text-green-400">{products.filter((p) => p.inStock).length}</p></div>
          <div><p className="text-sm text-gray-400">Out of Stock</p><p className="text-2xl font-bold text-red-400">{products.filter((p) => !p.inStock).length}</p></div>
        </div>
      </div>
    </div>
  );
}
