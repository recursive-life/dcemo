import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card, { CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter } from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Label from '../components/Label';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      if (data.role !== 'admin') throw new Error('Not an admin account');
      localStorage.setItem('adminInfo', JSON.stringify(data));
      navigate('/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card>
        <CardHeader>
          <CardTitle>Admin Login</CardTitle>
          <CardDescription>Enter your admin credentials to access the dashboard</CardDescription>
          <CardAction>
            <Button variant="link" onClick={() => navigate('/')}>Back to Home</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center" style={{ justifyContent: 'space-between' }}>
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="error-message" style={{ color: '#d32f2f', fontSize: '0.98rem' }}>{error}</div>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          {/* Additional footer actions if needed */}
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminLoginPage; 