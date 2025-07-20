import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_LINK}/api/allorders`)
      .then((res) => {
        if (res.data.success) setOrders(res.data.orders);
        else setOrders([]);
      })
      .catch((err) => {
        console.error(err);
        setOrders([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-lg text-gray-700">Loading orders...</div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="p-6 text-center text-lg text-gray-600">No orders found.</div>
    );
  }

  return (
    <div className="p-4 max-w-7xl mx-auto pt-16">
      <h2 className="text-3xl font-bold mb-6">All Orders</h2>

      {/* Desktop Table - hidden on mobile */}
      <div className="hidden md:block overflow-x-auto border rounded shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Order ID</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">User ID</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Items</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Total (₹)</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Payment</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50 border-b">
                <td className="px-4 py-3 text-sm font-mono text-gray-800">{order._id.slice(-6)}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{order.userId}</td>
                <td className="px-4 py-3 text-sm text-gray-800 max-w-xs">
                  <ul className="space-y-1">
                    {order.items.map((item, i) => (
                      <li key={i}>
                        {item.name} × {item.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-4 py-3 text-sm font-semibold text-gray-900">₹{order.totalAmount}</td>
                <td className="px-4 py-3 text-sm text-gray-700 capitalize">UPI</td>
                <td className="px-4 py-3 text-sm">
                  <span className="inline-block px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-semibold">
                    Pending
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">
                  {new Date(order.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards - show only on mobile */}
      <div className="md:hidden space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-md p-4 bg-white shadow-sm"
          >
            <p><strong>Order ID:</strong> {order._id.slice(-6)}</p>
            <p><strong>User ID:</strong> {order.userId}</p>
            <p><strong>Items:</strong></p>
            <ul className="list-disc list-inside ml-5 max-h-36 overflow-auto">
              {order.items.map((item, i) => (
                <li key={i}>
                  {item.name} × {item.quantity}
                </li>
              ))}
            </ul>
            <p><strong>Total (₹):</strong> ₹{order.totalAmount}</p>
            <p><strong>Payment:</strong> UPI</p>
            <p>
              <strong>Status:</strong>{" "}
              <span className="inline-block px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-semibold">
                Pending
              </span>
            </p>
            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
