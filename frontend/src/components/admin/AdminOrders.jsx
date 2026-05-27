import { useState, useEffect } from "react";
import { useAdmin } from "../../context/AdminContext";
import Button from "../common/Button";

export default function AdminOrders() {
  const { adminOrders, updateOrderStatus, updatePaymentStatus, deleteOrder, fetchAdminOrders, token } =
    useAdmin();
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (!token) return;
    fetchAdminOrders();
    const interval = setInterval(fetchAdminOrders, 10000);
    return () => clearInterval(interval);
  }, [token]);

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  const handlePaymentStatusChange = (orderId, newPaymentStatus) => {
    updatePaymentStatus(orderId, newPaymentStatus);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "shipped":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  const getPaymentColor = (status) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "awaiting-screenshot":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">
          Orders Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage and track customer orders
        </p>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Order ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Phone
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Items
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Order Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Payment
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {adminOrders.filter(o => o.status !== "delivered").map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <td className="px-6 py-4 text-sm font-mono text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="text-gray-900 font-medium">
                      {order.customerName}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {order.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                    {order.customerPhone || "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                    {order.items} items
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">
                    Rs. {order.totalAmount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.orderId, e.target.value)
                      }
                      className={`px-3 py-1 rounded text-xs font-medium cursor-pointer border-0 ${getStatusColor(
                        order.status,
                      )}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <select
                      value={order.paymentStatus}
                      onChange={(e) =>
                        handlePaymentStatusChange(order.orderId, e.target.value)
                      }
                      className={`px-3 py-1 rounded text-xs font-medium cursor-pointer border-0 ${getPaymentColor(
                        order.paymentStatus,
                      )}`}
                    >
                      <option value="awaiting-screenshot">
                        Awaiting Screenshot
                      </option>
                      <option value="verified">Verified</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 text-sm space-x-2">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-xs font-medium transition"
                    >
                      View
                    </button>
                    <button
                      onClick={() => deleteOrder(order.orderId)}
                      className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-xs font-medium transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedOrder(null)}>
          <div className="bg-white dark:bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-serif font-bold text-gray-900">
                Order Details
              </h2>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl">&times;</button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Order Number</p>
                  <p className="font-medium text-gray-900">{selectedOrder.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
                  <p className="font-medium text-gray-900">{selectedOrder.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Customer Name</p>
                  <p className="font-medium text-gray-900">{selectedOrder.customerName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                  <p className="font-medium text-gray-900">{selectedOrder.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                  <p className="font-medium text-gray-900">{selectedOrder.customerPhone || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total</p>
                  <p className="font-medium text-gray-900">Rs. {selectedOrder.totalAmount.toFixed(2)}</p>
                </div>
              </div>

              {selectedOrder.shippingAddress && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Shipping Address</p>
                  <p className="font-medium text-gray-900">{selectedOrder.shippingAddress}</p>
                </div>
              )}

              {selectedOrder.paymentScreenshot && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Payment Screenshot</p>
                  <img src={selectedOrder.paymentScreenshot} alt="Payment" className="max-w-xs rounded border border-gray-200 dark:border-gray-700" />
                </div>
              )}

              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Items</p>
                <div className="bg-gray-50 dark:bg-gray-800 rounded p-3 space-y-2">
                  {selectedOrder.itemsData && selectedOrder.itemsData.length > 0 ? (
                    selectedOrder.itemsData.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-gray-900">{item.product?.name || `Product #${item.productId}`} x{item.quantity} ({item.size})</span>
                        <span className="font-medium text-gray-900">Rs. {(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-600 dark:text-gray-400">{selectedOrder.items} items</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Summary */}
      <div className="mt-8 p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/50 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-3">
          Order Summary
        </h3>
        <div className="grid sm:grid-cols-5 gap-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Active Orders
            </p>
            <p className="text-2xl font-bold text-gray-900">
              {adminOrders.filter(o => o.status !== "delivered").length}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total Orders
            </p>
            <p className="text-2xl font-bold text-gray-900">
              {adminOrders.length}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">
              {adminOrders.filter((o) => o.status === "pending").length}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Processing
            </p>
            <p className="text-2xl font-bold text-blue-600">
              {adminOrders.filter((o) => o.status === "processing").length}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Shipped</p>
            <p className="text-2xl font-bold text-green-600">
              {adminOrders.filter((o) => o.status === "shipped").length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
