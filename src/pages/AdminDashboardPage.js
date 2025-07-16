import React from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import './AdminDashboardPage.css';
import { useNavigate } from 'react-router-dom';

const dashboardStats = [
  { label: 'Total Users', value: 120, color: '#fbcfe8', text: '#be185d' },
  { label: 'Total Products', value: 73, color: '#a7f3d0', text: '#047857' },
  { label: 'Total Orders', value: 34, color: '#dbeafe', text: '#2563eb' },
];

const AdminDashboardPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminInfo');
    navigate('/admin/login');
  };

  return (
    <div className="admin-dashboard-home">
      <Card className="admin-dashboard-welcome-card" style={{ maxWidth: 700, margin: '2.5rem auto 2rem auto', textAlign: 'center', padding: '2.5rem 2rem', background: 'linear-gradient(120deg, #fbcfe8 0%, #f0f9ff 100%)' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#be185d', marginBottom: '1rem' }}>Welcome, Admin!</h1>
        <p style={{ color: '#6b7280', fontSize: '1.15rem', marginBottom: '1.5rem' }}>Here's a quick overview of your store's activity and quick links to manage everything.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <Button style={{ background: 'linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)', color: '#fff', fontWeight: 700, minWidth: 160 }} onClick={() => navigate('/admin/products')}>Manage Products</Button>
          <Button style={{ background: 'linear-gradient(90deg, #06b6d4 0%, #3b82f6 100%)', color: '#fff', fontWeight: 700, minWidth: 160 }} onClick={() => navigate('/admin/users')}>Manage Users</Button>
          <Button style={{ background: 'linear-gradient(90deg, #a21caf 0%, #6366f1 100%)', color: '#fff', fontWeight: 700, minWidth: 160 }} onClick={() => navigate('/admin/orders')}>Manage Orders</Button>
        </div>
      </Card>
      <div className="admin-dashboard-stats-row">
        {dashboardStats.map(stat => (
          <Card key={stat.label} style={{ background: stat.color, minWidth: 220, flex: '1 1 220px', textAlign: 'center', margin: '0 1rem', padding: '2rem 1rem' }}>
            <div style={{ fontSize: '1.1rem', color: '#6b7280', marginBottom: 8 }}>{stat.label}</div>
            <div style={{ fontSize: '2.2rem', fontWeight: 700, color: stat.text }}>{stat.value}</div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboardPage; 