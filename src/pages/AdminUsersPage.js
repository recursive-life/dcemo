import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter } from '../components/Table';
import './AdminUsersPage.css';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', role: 'user' });
  const navigate = useNavigate();
  const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));

  useEffect(() => {
    if (!adminInfo) return navigate('/admin/login');
    fetchUsers();
    // eslint-disable-next-line
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/users', {
        headers: { Authorization: `Bearer ${adminInfo.token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch users');
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/users/${editing}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminInfo.token}`
        },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update user');
      setForm({ name: '', email: '', role: 'user' });
      setEditing(null);
      fetchUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = user => {
    setEditing(user._id);
    setForm({ name: user.name, email: user.email, role: user.role });
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this user?')) return;
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminInfo.token}` }
      });
      if (!res.ok) throw new Error('Failed to delete');
      fetchUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="admin-users-vertical-layout">
      <Card className="admin-users-wide-card" style={{ background: 'linear-gradient(120deg, #f6f8fc 0%, #e9f0fb 100%)', boxShadow: '0 8px 40px 0 rgba(37,99,235,0.10), 0 2px 8px rgba(30,64,175,0.07)', padding: '2.5rem 2.5rem 2rem 2.5rem', maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#2563eb', marginBottom: '1.5rem', letterSpacing: '0.5px' }}>Manage Users</h2>
        <div style={{ color: '#6b7280', fontSize: '1.08rem', marginBottom: '1.5rem' }}>List of all registered users.</div>
      </Card>
      <Card className="admin-users-wide-card" style={{ padding: 0, overflow: 'visible', maxWidth: 900, margin: '2.5rem auto 0 auto' }}>
        {editing && (
          <form onSubmit={handleSubmit} className="user-form">
            <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
            <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
            <select name="role" value={form.role} onChange={handleChange}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <button type="submit">Update User</button>
            <button type="button" onClick={() => { setEditing(null); setForm({ name: '', email: '', role: 'user' }); }}>Cancel</button>
          </form>
        )}
        {error && <div className="error-message">{error}</div>}
        {loading ? <div>Loading...</div> : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map(user => (
                <TableRow key={user._id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role === 'admin' ? 'Admin' : 'User'}</TableCell>
                  <TableCell>{user.isActive ? 'Active' : 'Inactive'}</TableCell>
                  <TableCell style={{ display: 'flex', flexDirection: 'row', gap: '0.5rem', alignItems: 'center', justifyContent: 'center' }}>
                    <Button variant="outline" size="sm" onClick={() => handleEdit(user)}>Edit</Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(user._id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={5} style={{ color: '#2563eb', fontWeight: 700 }}>Total users: {users.length}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        )}
      </Card>
    </div>
  );
};

export default AdminUsersPage; 