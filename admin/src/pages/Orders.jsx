import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_LINK}/api/order/allorders`);
      if (res.data.success) setOrders(res.data.orders);
      else setOrders([]);
    } catch (err) {
      console.error(err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancel = async (orderId) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this order?");
    if (!confirmCancel) return;

    try {
      const res = await axios.delete(`${import.meta.env.VITE_BACKEND_LINK}/api/order/${orderId}`);
      if (res.data.success) {
        alert("Order cancelled");
        setOrders((prevOrders) => prevOrders.filter((o) => o._id !== orderId));
      } else {
        alert("Failed to cancel order");
      }
    } catch (err) {
      console.error(err);
      alert("Error cancelling order");
    }
  };

  if (loading) return <div className="p-6 text-center pt-16">Loading orders...</div>;
  if (orders.length === 0) return <div className="p-6 text-center pt-16">No orders found.</div>;

  return (
    <div className="p-4 max-w-5xl mx-auto pt-16">
      <h2 className="text-3xl font-bold mb-6">All Orders</h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto border rounded shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold">Order ID</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">User ID</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Items</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Total (₹)</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Payment</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Status</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Date</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50 border-b">
                <td className="px-4 py-3 text-sm font-mono">{order._id.slice(-6)}</td>
                <td className="px-4 py-3 text-sm">{order.userId}</td>
                <td className="px-4 py-3 text-sm">
                  <ul className="space-y-1">
                    {order.items.map((item, i) => (
                      <li key={i}>
                        {item.productId?.name || "Unknown"} × {item.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-4 py-3 text-sm font-semibold">₹{order.totalAmount}</td>
                <td className="px-4 py-3 text-sm capitalize">{order.paymentMethod || "N/A"}</td>
                <td className="px-4 py-3 text-sm">
                  <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">
                    {order.status || "Pending"}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">{new Date(order.createdAt).toLocaleString()}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleCancel(order._id)}
                    className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="border rounded-lg p-4 bg-white shadow-sm space-y-2 text-sm">
            <p><strong>Order ID:</strong> {order._id.slice(-6)}</p>
            <p><strong>User ID:</strong> {order.userId}</p>
            <p><strong>Items:</strong></p>
            <ul className="ml-4 space-y-1 list-disc">
              {order.items.map((item, i) => (
                <li key={i}>
                  {item.productId?.name || "Unknown"} × {item.quantity}
                </li>
              ))}
            </ul>
            <p><strong>Total:</strong> ₹{order.totalAmount}</p>
            <p><strong>Payment:</strong> {order.paymentMethod || "N/A"}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                {order.status || "Pending"}
              </span>
            </p>
            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            <div className="text-right">
              <button
                onClick={() => handleCancel(order._id)}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
