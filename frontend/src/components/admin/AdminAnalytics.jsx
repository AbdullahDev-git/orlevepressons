import { useState, useEffect, useRef } from "react";
import { useAdmin } from "../../context/AdminContext";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const COLORS = ["#f59e0b", "#3b82f6", "#22c55e", "#10b981", "#ef4444"];

export default function AdminAnalytics() {
  const { token } = useAdmin();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const reportRef = useRef(null);
  const [downloading, setDownloading] = useState(false);

  const downloadPDF = async () => {
    if (!reportRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(reportRef.current, { backgroundColor: "#ffffff" });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      let heightLeft = pdfHeight;
      let position = 0;
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();
      while (heightLeft > 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
        heightLeft -= pdf.internal.pageSize.getHeight();
      }
      pdf.save("analytics-report.pdf");
    } catch (err) {
      console.error("PDF download failed:", err);
    }
    setDownloading(false);
  };

  useEffect(() => {
    if (token) fetchAnalytics();
  }, [token]);

  const fetchAnalytics = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API}/admin/analytics`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setAnalytics(data.data);
      } else {
        setError(data.message || "Failed to load analytics");
      }
    } catch {
      setError("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="animate-fade-in">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-2">Analytics & Reports</h1>
          <p className="text-gray-600 dark:text-gray-400">Loading analytics data...</p>
        </div>
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-accent-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="animate-fade-in">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-2">Analytics & Reports</h1>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <button onClick={fetchAnalytics} className="px-4 py-2 bg-accent-500 text-white rounded hover:bg-accent-600 transition">Retry</button>
        </div>
      </div>
    );
  }

  if (!analytics) return null;

  const { totalRevenue, totalOrders, totalCustomers, averageOrderValue, ordersByStatus, revenueByLast6Months, topProducts } = analytics;

  const pieData = Object.entries(ordersByStatus)
    .filter(([, v]) => v > 0)
    .map(([name, value]) => ({ name: name.charAt(0).toUpperCase() + name.slice(1), value }));

  return (
    <div className="animate-fade-in">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-serif font-bold text-white mb-2">Analytics & Reports</h1>
          <p className="text-gray-400">Detailed insights into your business performance</p>
        </div>
        <button onClick={downloadPDF} disabled={downloading} className="px-4 py-2 bg-[#C6A43F] text-white rounded-lg hover:bg-[#D4AF37] transition disabled:opacity-50 flex items-center gap-2">
          {downloading ? "Downloading..." : "📄 Download Report"}
        </button>
      </div>
      <div ref={reportRef}>

      {/* Key Metrics */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#1E293B] border border-gray-700 rounded-lg p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Total Orders</p>
            <span className="text-2xl">📦</span>
          </div>
          <p className="text-3xl font-bold text-white">{totalOrders}</p>
        </div>
        <div className="bg-[#1E293B] border border-gray-700 rounded-lg p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Total Revenue</p>
            <span className="text-2xl">💰</span>
          </div>
          <p className="text-3xl font-bold text-white">Rs. {totalRevenue.toFixed(0)}</p>
        </div>
        <div className="bg-[#1E293B] border border-gray-700 rounded-lg p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Total Customers</p>
            <span className="text-2xl">👥</span>
          </div>
          <p className="text-3xl font-bold text-white">{totalCustomers}</p>
        </div>
        <div className="bg-[#1E293B] border border-gray-700 rounded-lg p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Avg Order Value</p>
            <span className="text-2xl">💳</span>
          </div>
          <p className="text-3xl font-bold text-white">Rs. {averageOrderValue.toFixed(2)}</p>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-[#1E293B] border border-gray-700 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-white mb-4">📊 Revenue (Last 6 Months)</h2>
          {revenueByLast6Months.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueByLast6Months}>
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: "8px", color: "#fff" }} />
                <Bar dataKey="revenue" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center py-12">No revenue data yet</p>
          )}
        </div>

        {/* Order Status Distribution */}
        <div className="bg-[#1E293B] border border-gray-700 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-white mb-4">📋 Order Status Distribution</h2>
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                  {pieData.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center py-12">No orders yet</p>
          )}
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-[#1E293B] border border-gray-700 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-white mb-4">⭐ Top Selling Products</h2>
        {topProducts.length > 0 ? (
          <div className="space-y-3">
            {topProducts.map((product, index) => (
              <div key={product.id} className="flex items-center justify-between p-3 bg-[#1E293B] rounded-lg border border-gray-700">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-[#C6A43F] text-white rounded-full flex items-center justify-center font-bold text-sm">{index + 1}</span>
                  <div>
                    <p className="font-medium text-white">{product.name}</p>
                    <p className="text-xs text-gray-400">{product.quantity} sold</p>
                  </div>
                </div>
                <p className="font-bold text-[#C6A43F]">Rs. {product.revenue}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No products sold yet</p>
        )}
      </div>
      </div>
    </div>
  );
}