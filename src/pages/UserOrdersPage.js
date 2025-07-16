import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo) {
      navigate('/login');
      return;
    }
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/orders/my', {
          headers: { Authorization: `Bearer ${userInfo.token}` }
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to fetch orders');
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [navigate]);

  if (loading) return <div>Loading your orders...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (orders.length === 0) return <div>You have no orders yet.</div>;

  return (
    <div className="user-orders-page">
      <h2>Your Orders</h2>
      <ul>
        {orders.map(order => (
          <li key={order._id}>
            <div>Order ID: {order._id}</div>
            <div>Date: {new Date(order.createdAt).toLocaleString()}</div>
            <div>Total: ${order.totalPrice}</div>
            <div>Status: {order.status}</div>
            <ul>
              {order.orderItems.map(item => (
                <li key={item.product}>{item.name} (x{item.quantity})</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserOrdersPage; 