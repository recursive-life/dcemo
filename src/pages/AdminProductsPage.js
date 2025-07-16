import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter } from '../components/Table';
import './AdminProductsPage.css';

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', description: '', price: '', category: '', images: [''] });
  const navigate = useNavigate();
  const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));

  useEffect(() => {
    if (!adminInfo) return navigate('/admin/login');
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch products');
      setProducts(data);
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
      const method = editing ? 'PUT' : 'POST';
      const url = editing ? `/api/products/${editing}` : '/api/products';
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminInfo.token}`
        },
        body: JSON.stringify({ ...form, price: Number(form.price), images: [form.images] })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to save product');
      setForm({ name: '', description: '', price: '', category: '', images: [''] });
      setEditing(null);
      fetchProducts();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = product => {
    setEditing(product._id);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      images: product.images[0] || ''
    });
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this product?')) return;
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminInfo.token}` }
      });
      if (!res.ok) throw new Error('Failed to delete');
      fetchProducts();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="admin-products-vertical-layout">
      <Card className="admin-products-wide-card" style={{ background: 'linear-gradient(120deg, #f6f8fc 0%, #e9f0fb 100%)', boxShadow: '0 4px 32px rgba(37,99,235,0.10)', padding: '2.5rem 2.5rem 2rem 2.5rem', maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#2563eb', marginBottom: '1.5rem', letterSpacing: '0.5px' }}>Manage Products</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="ui-input" required />
          <input name="description" placeholder="Description" value={form.description} onChange={handleChange} className="ui-input" required />
          <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} className="ui-input" required />
          <input name="category" placeholder="Category" value={form.category} onChange={handleChange} className="ui-input" required />
          <input name="images" placeholder="Image URL" value={form.images} onChange={handleChange} className="ui-input" required />
          <Button type="submit" className="w-full" style={{ background: '#2563eb', color: '#fff', fontWeight: 700, fontSize: '1.1rem', marginTop: '0.5rem' }}>{editing ? 'Update' : 'Create'} Product</Button>
          {editing && <Button type="button" onClick={() => { setEditing(null); setForm({ name: '', description: '', price: '', category: '', images: [''] }); }} className="w-full" style={{ background: '#ef4444', color: '#fff', fontWeight: 700, fontSize: '1.1rem', marginTop: '0.5rem' }}>Cancel</Button>}
        </form>
      </Card>
      <Card className="admin-products-wide-card" style={{ padding: 0, overflow: 'visible', maxWidth: 900, margin: '2.5rem auto 0 auto' }}>
        <div style={{ padding: '1.5rem 1.5rem 0.5rem 1.5rem' }}>
          <div style={{ fontWeight: 600, color: '#181c32', fontSize: '1.15rem', marginBottom: '0.5rem' }}>List of all products.</div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product, idx) => (
              <TableRow key={product._id} className={idx % 2 === 0 ? 'table-row-even' : 'table-row-odd'}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>{product.countInStock}</TableCell>
                <TableCell style={{ display: 'flex', gap: '0.5rem' }}>
                  <Button variant="primary" size="sm" style={{ background: '#2563eb', color: '#fff', minWidth: 70 }} onClick={() => handleEdit(product)}>Edit</Button>
                  <Button variant="outline" size="sm" style={{ borderColor: '#ef4444', color: '#ef4444', minWidth: 70, fontWeight: 600 }} onClick={() => handleDelete(product._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5} style={{ color: '#2563eb', fontWeight: 700 }}>Total products: {products.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Card>
    </div>
  );
};

export default AdminProductsPage; 