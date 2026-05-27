import { createContext, useState, useContext, useCallback } from "react";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const saved = localStorage.getItem("adminUser");
      return saved ? JSON.parse(saved) : null;
    } catch {
      localStorage.removeItem("adminUser");
      localStorage.removeItem("adminToken");
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem("adminToken") || null);
  const [adminOrders, setAdminOrders] = useState([]);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiFetch = useCallback(
    async (path, options = {}) => {
      const headers = { "Content-Type": "application/json", ...options.headers };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch(`${API}${path}`, { ...options, headers });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Request failed");
      return data;
    },
    [token],
  );

  const fetchDashboardStats = useCallback(async () => {
    try {
      const data = await apiFetch("/admin/dashboard");
      setDashboardStats(data.data);
      return data.data;
    } catch (err) {
      console.error("Failed to fetch dashboard stats:", err);
      return null;
    }
  }, [apiFetch]);

  const fetchAdminOrders = useCallback(async () => {
    try {
      const data = await apiFetch("/orders");
      const mapped = data.data.map((o) => ({
        id: o.orderNumber,
        orderId: o.id,
        customerName: o.customerName || o.customer?.name || "Guest",
        email: o.customerEmail || o.customer?.email || "",
        customerPhone: o.customerPhone || "",

        shippingAddress: o.shippingAddress || "",
        totalAmount: o.total,
        status: o.status,
        items: o.items.length,
        itemsData: o.items,
        date: o.createdAt ? new Date(o.createdAt).toISOString().split("T")[0] : "",
        paymentStatus: o.paymentStatus || "awaiting-screenshot",
        paymentScreenshot: o.paymentScreenshot || "",
      }));
      setAdminOrders(mapped);
      return mapped;
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      return [];
    }
  }, [apiFetch]);

  const loginAdmin = async (username, password) => {
    try {
      setLoading(true);
      // Map "admin" username to the default admin email
      const email = username.includes("@") ? username : "admin@orleve.com";
      const data = await apiFetch("/admin/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      const user = { name: data.data.name, email: data.data.email };
      setAdminUser(user);
      setToken(data.data.token);
      localStorage.setItem("adminUser", JSON.stringify(user));
      localStorage.setItem("adminToken", data.data.token);
      return true;
    } catch (err) {
      // Fallback to hardcoded admin
      if (username === "admin" && password === "orlevesoleha2726") {
        const user = { username: "Admin", email: "admin@orleve.com" };
        setAdminUser(user);
        setToken("mock-token");
        localStorage.setItem("adminUser", JSON.stringify(user));
        localStorage.setItem("adminToken", "mock-token");
        return true;
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logoutAdmin = () => {
    setAdminUser(null);
    setToken(null);
    setAdminOrders([]);
    setDashboardStats(null);
    localStorage.removeItem("adminUser");
    localStorage.removeItem("adminToken");
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await apiFetch(`/orders/${orderId}/status`, {
        method: "PUT",
        body: JSON.stringify({ status: newStatus }),
      });
      setAdminOrders((prev) =>
        prev.map((order) =>
          order.orderId === orderId || order.id === orderId
            ? { ...order, status: newStatus }
            : order,
        ),
      );
    } catch (err) {
      console.error("Failed to update order status:", err);
    }
  };

  const updatePaymentStatus = (orderId, newPaymentStatus) => {
    setAdminOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, paymentStatus: newPaymentStatus } : order,
      ),
    );
  };

  const deleteOrder = async (orderId) => {
    try {
      await apiFetch(`/orders/${orderId}`, { method: "DELETE" });
      setAdminOrders((prev) => prev.filter((order) => order.orderId !== orderId && order.id !== orderId));
    } catch (err) {
      console.error("Failed to delete order:", err);
    }
  };

  const createOrder = (orderData) => {
    const orderId = `ORD${Date.now()}`;
    const newOrder = {
      id: orderId,
      customerName: orderData.customerName,
      email: orderData.email,
      shippingAddress: orderData.shippingAddress,
      totalAmount: orderData.totalAmount,
      status: "pending",
      items: orderData.items,
      date: new Date().toISOString().split("T")[0],
      paymentStatus: "awaiting-screenshot",
      paymentScreenshot: orderData.paymentScreenshot,
      cartItems: orderData.cartItems,
    };
    setAdminOrders((prev) => [newOrder, ...prev]);
    return orderId;
  };

  const getOrderStats = () => {
    if (dashboardStats) {
      const s = dashboardStats.stats;
      return {
        total: s.totalOrders,
        pending: s.pendingOrders,
        processing: s.processingOrders,
        shipped: s.shippedOrders,
        totalRevenue: s.totalRevenue,
      };
    }
    const total = adminOrders.length;
    const pending = adminOrders.filter((o) => o.status === "pending").length;
    const processing = adminOrders.filter((o) => o.status === "processing").length;
    const shipped = adminOrders.filter((o) => o.status === "shipped").length;
    const totalRevenue = adminOrders.reduce((sum, o) => sum + o.totalAmount, 0);
    return { total, pending, processing, shipped, totalRevenue };
  };

  return (
      <AdminContext.Provider
      value={{
        adminUser,
        token,
        adminOrders,
        dashboardStats,
        loading,
        loginAdmin,
        logoutAdmin,
        updateOrderStatus,
        updatePaymentStatus,
        deleteOrder,
        createOrder,
        getOrderStats,
        fetchDashboardStats,
        fetchAdminOrders,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return context;
}
