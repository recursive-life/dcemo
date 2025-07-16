import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card, { CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter } from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Label from '../components/Label';

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M44.5 20H24V28.5H36.9C35.5 33.1 31.2 36.5 24 36.5C16.3 36.5 10 30.2 10 22.5C10 14.8 16.3 8.5 24 8.5C27.3 8.5 30.2 9.7 32.4 11.7L38.1 6C34.3 2.6 29.5 0.5 24 0.5C11.8 0.5 2 10.3 2 22.5C2 34.7 11.8 44.5 24 44.5C36.2 44.5 46 34.7 46 22.5C46 21.1 45.8 20.5 45.5 20Z" fill="#FFC107"/><path d="M6.3 14.7L13.1 19.6C15 15.5 19.1 12.5 24 12.5C26.6 12.5 29 13.4 30.9 15L37.1 9.2C33.7 6.2 29.1 4.5 24 4.5C16.7 4.5 10.3 9.5 6.3 14.7Z" fill="#FF3D00"/><path d="M24 44.5C29.1 44.5 33.7 42.8 37.1 39.8L30.9 34C29 35.6 26.6 36.5 24 36.5C19.1 36.5 15 33.5 13.1 29.4L6.3 34.3C10.3 39.5 16.7 44.5 24 44.5Z" fill="#4CAF50"/><path d="M44.5 20H24V28.5H36.9C36.2 31 34.5 33.1 32.4 34.7L38.1 39.5C41.5 36.5 44.5 31.7 44.5 22.5C44.5 21.1 44.3 20.5 44 20Z" fill="#1976D2"/></g></svg>
);

const RegisterPage = () => {
  const [name, setName] = useState('');
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
      const res = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(120deg, #e0e7ef 0%, #f0f9ff 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: 800, width: '100%' }}>
        <Card style={{ width: '100%', boxShadow: '0 12px 48px 0 rgba(37,99,235,0.13), 0 2px 8px rgba(30,64,175,0.09)', padding: '3.5rem 2.8rem 2.8rem 2.8rem', borderRadius: 32, background: '#fff', position: 'relative' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
            <div style={{ width: 48, height: 6, borderRadius: 3, background: 'linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)', marginBottom: 18 }} />
            <CardHeader>
              <CardTitle style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: 0.5 }}>Create your Shopez account</CardTitle>
              <CardDescription style={{ color: '#6b7280', fontSize: '1.08rem', marginTop: 6 }}>Enter your details below to sign up</CardDescription>
              <CardAction>
                <Button variant="link" onClick={() => navigate('/login')}>Already have an account? Login</Button>
              </CardAction>
            </CardHeader>
          </div>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <div className="error-message" style={{ color: '#d32f2f', fontSize: '0.98rem' }}>{error}</div>}
              <Button type="submit" className="w-full" disabled={loading} style={{ fontSize: '1.1rem', padding: '1rem 0', marginBottom: 24 }}>
                {loading ? 'Signing up...' : 'Sign Up'}
              </Button>
              <Button variant="google" className="w-full" type="button" onClick={() => alert('Google signup coming soon!')} style={{ fontSize: '1.1rem', padding: '1rem 0' }}>
                <GoogleIcon /> Sign Up with Google
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            {/* Additional footer actions if needed */}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
  