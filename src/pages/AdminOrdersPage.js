import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter } from '../components/Table';
import './AdminOrdersPage.css';

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null);
  const [status, setStatus] = useState('');
  const navigate = useNavigate();
  const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));

  useEffect(() => {
    if (!adminInfo) return navigate('/admin/login');
    fetchOrders();
    // eslint-disable-next-line
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/orders', {
        headers: { Authorization: `Bearer ${adminInfo.token}` }
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

  const handleEdit = order => {
    setEditing(order._id);
    setStatus(order.status);
  };

  const handleUpdate = async id => {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminInfo.token}`
        },
        body: JSON.stringify({ status })
      });
      if (!res.ok) throw new Error('Failed to update order');
      setEditing(null);
      fetchOrders();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="admin-orders-vertical-layout">
      <Card className="admin-orders-wide-card" style={{ background: 'linear-gradient(120deg, #f6f8fc 0%, #e9f0fb 100%)', boxShadow: '0 8px 40px 0 rgba(37,99,235,0.10), 0 2px 8px rgba(30,64,175,0.07)', padding: '2.5rem 2.5rem 2rem 2.5rem', maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#2563eb', marginBottom: '1.5rem', letterSpacing: '0.5px' }}>Manage Orders</h2>
        <div style={{ color: '#6b7280', fontSize: '1.08rem', marginBottom: '1.5rem' }}>List of all orders.</div>
      </Card>
      <Card className="admin-orders-wide-card" style={{ padding: 0, overflow: 'visible', maxWidth: 900, margin: '2.5rem auto 0 auto' }}>
        {error && <div className="error-message">{error}</div>}
        {loading ? <div>Loading...</div> : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map(order => (
                <TableRow key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{order.user && order.user.name} ({order.user && order.user.email})</TableCell>
                  <TableCell>
                    {editing === order._id ? (
                      <select value={status} onChange={e => setStatus(e.target.value)}>
                        <option>Pending</option>
                        <option>Processing</option>
                        <option>Shipped</option>
                        <option>Delivered</option>
                        <option>Cancelled</option>
                      </select>
                    ) : order.status}
                  </TableCell>
                  <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
                  <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                    {editing === order._id ? (
                      <>
                        <Button variant="outline" size="sm" onClick={() => handleUpdate(order._id)}>Save</Button>
                        <Button variant="outline" size="sm" style={{ marginLeft: 8 }} onClick={() => setEditing(null)}>Cancel</Button>
                      </>
                    ) : (
                      <Button variant="outline" size="sm" onClick={() => handleEdit(order)}>Edit</Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={6} style={{ color: '#2563eb', fontWeight: 700 }}>Total orders: {orders.length}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        )}
      </Card>
    </div>
  );
};

export default AdminOrdersPage; 