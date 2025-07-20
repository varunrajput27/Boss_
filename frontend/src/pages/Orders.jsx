import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Orders = () => {
    const { token } = useAuth();  
  const { currency, user } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setOrders([]);
      setLoading(false);
      return;
    }
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_LINK}/api/order/myorders`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.success) {
          setOrders(res.data.orders);
        }
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  if (loading)
    return (
      <p className="text-center mt-24 text-gray-500 text-lg">Loading orders...</p>
    );
  if (!user)
    return (
      <p className="text-center mt-24 text-red-600 text-lg">
        Please login to view your orders.
      </p>
    );
  if (orders.length === 0)
    return (
      <p className="text-center mt-24 text-gray-500 text-lg">No orders found.</p>
    );

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <Title text1="YOUR" text2="ORDERS" />

      <div className="mt-12 space-y-10">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow-md rounded-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
              <h3 className="text-xl font-bold text-gray-900">
                Order Date:{' '}
                <span className="font-normal">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </h3>
              <span
                className={`text-sm font-semibold py-1.5 px-4 rounded-full 
                ${
                  order.status === 'Delivered'
                    ? 'bg-green-100 text-green-800'
                    : order.status === 'Processing'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {order.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-gray-700">
              <div>
                <p>
                  <strong>Name:</strong> {order.deliveryDetails.fullName}
                </p>
                <p>
                  <strong>Email:</strong> {order.deliveryDetails.email}
                </p>
                <p>
                  <strong>Mobile:</strong> {order.deliveryDetails.mobile}
                </p>
              </div>
              <div>
                <p>
                  <strong>Address:</strong>
                </p>
                <p>
                  {order.deliveryDetails.street}, {order.deliveryDetails.city},{' '}
                  {order.deliveryDetails.state}, {order.deliveryDetails.zip},{' '}
                  {order.deliveryDetails.country}
                </p>
              </div>
            </div>

            <h4 className="font-semibold text-gray-900 mb-4">Items in this order:</h4>
            <div className="space-y-4">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row items-center gap-4 border p-4 rounded-lg hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full sm:w-24 aspect-square object-contain rounded-md shadow-sm"
                  />
                  <div className="flex-1 text-center sm:text-left">
                    <p className="text-lg font-semibold text-gray-900 mb-1">{item.name}</p>
                    <p className="text-gray-700">
                      Price: {currency} {item.price.toFixed(2)}
                    </p>
                    <p className="text-gray-700">Quantity: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
