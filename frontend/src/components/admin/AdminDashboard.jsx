import { useEffect, useState } from "react";
import { useAdmin } from "../../context/AdminContext";
import Button from "../common/Button";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export default function AdminDashboard() {
  const { token } = useAdmin();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/admin/dashboard/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch dashboard stats:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchStats();
  }, [token]);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold text-white mb-2">
          Dashboard
        </h1>
        <p className="text-gray-400">
          Welcome to ORLEV Admin Control Panel
        </p>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block w-10 h-10 border-4 border-accent-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500">Loading dashboard data...</p>
        </div>
      ) : stats ? (
        <>
          {/* Stats Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Revenue */}
            <div className="p-6 rounded-lg border border-emerald-500/30 bg-emerald-500/5 backdrop-blur-sm animate-fade-in">
              <div className="text-3xl mb-3">💰</div>
              <p className="text-sm text-gray-400 mb-2">Total Revenue</p>
              <p className="text-2xl font-bold text-emerald-400">
                Rs. {stats.totalRevenue.toFixed(2)}
              </p>
            </div>

            {/* Total Orders */}
            <div className="p-6 rounded-lg border border-blue-500/30 bg-blue-500/5 backdrop-blur-sm animate-fade-in">
              <div className="text-3xl mb-3">📦</div>
              <p className="text-sm text-gray-400 mb-2">Total Orders</p>
              <p className="text-2xl font-bold text-blue-400">
                {stats.totalOrders}
              </p>
            </div>

            {/* Total Customers */}
            <div className="p-6 rounded-lg border border-purple-500/30 bg-purple-500/5 backdrop-blur-sm animate-fade-in">
              <div className="text-3xl mb-3">👥</div>
              <p className="text-sm text-gray-400 mb-2">Total Customers</p>
              <p className="text-2xl font-bold text-purple-400">
                {stats.totalCustomers}
              </p>
            </div>

            {/* Low Stock Items */}
            <div className="p-6 rounded-lg border border-red-500/30 bg-red-500/5 backdrop-blur-sm animate-fade-in">
              <div className="text-3xl mb-3">⚠️</div>
              <p className="text-sm text-gray-400 mb-2">Low Stock Items</p>
              <p className="text-2xl font-bold text-red-400">
                {stats.lowStockItems.length}
              </p>
            </div>
          </div>

          {/* Low Stock Details */}
          {stats.lowStockItems.length > 0 && (
            <div className="bg-white/5 border border-gray-700 rounded-lg p-6 mb-8">
              <h2 className="text-lg font-semibold text-white mb-4">
                ⚠️ Products Low in Stock
              </h2>
              <div className="space-y-2">
                {stats.lowStockItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center py-2 px-3 bg-red-500/10 rounded"
                  >
                    <span className="text-sm text-gray-200">{item.name}</span>
                    <span className="text-sm font-bold text-red-400">
                      {item.stock} left
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <a
              href="/admin/orders"
              className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/50 rounded-lg hover:shadow-lg transition cursor-pointer"
            >
              <div className="text-3xl mb-3">📦</div>
              <h3 className="font-semibold text-white">
                Manage Orders
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                View and process orders
              </p>
            </a>

            <a
              href="/admin/products"
              className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/50 rounded-lg hover:shadow-lg transition cursor-pointer"
            >
              <div className="text-3xl mb-3">💅</div>
              <h3 className="font-semibold text-white">
                Manage Products
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                Add and edit products
              </p>
            </a>

            <a
              href="/admin/messages"
              className="p-6 bg-gradient-to-br from-accent-500/10 to-accent-600/10 border border-accent-500/50 rounded-lg hover:shadow-lg transition cursor-pointer"
            >
              <div className="text-3xl mb-3">✉️</div>
              <h3 className="font-semibold text-white">
                Messages
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                View contact messages
              </p>
            </a>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">Unable to load dashboard data.</p>
          <Button variant="primary" onClick={fetchStats} className="mt-4">
            Retry
          </Button>
        </div>
      )}
    </div>
  );
}
