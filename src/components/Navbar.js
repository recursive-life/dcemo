import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (userInfo) {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      setCartCount(cart.reduce((acc, item) => acc + item.quantity, 0));
    }
    const handleStorage = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      setCartCount(cart.reduce((acc, item) => acc + item.quantity, 0));
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [userInfo]);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.cdnfonts.com/css/asterion';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar__brand" onClick={() => navigate('/')} style={{ fontFamily: 'Asterion, sans-serif', fontWeight: 900, fontSize: 32, letterSpacing: 1.5, color: '#2563eb' }}>Shopez</div>
      <div className="navbar__links">
        <Link to="/" className="navbar__btn navbar__btn--home">Home</Link>
        <Link to="/products" className="navbar__btn navbar__btn--products">Products</Link>
        {adminInfo && <Link to="/admin" className="navbar__btn navbar__btn--admin">Admin</Link>}
      </div>
      <div className="navbar__actions">
        {userInfo && !adminInfo && (
          <button className="navbar__btn navbar__btn--cart" onClick={() => navigate('/cart')} style={{ position: 'relative', marginRight: 12 }}>
            <span role="img" aria-label="cart" style={{ fontSize: 22 }}>🛒</span>
            {cartCount > 0 && <span className="navbar__cart-badge">{cartCount}</span>}
          </button>
        )}
        {!adminInfo && !userInfo && <>
          <button className="navbar__btn navbar__btn--outline" onClick={() => navigate('/login')}>Login</button>
          <button className="navbar__btn navbar__btn--primary" onClick={() => navigate('/register')}>Register</button>
        </>}
        {(adminInfo || userInfo) && <button className="navbar__btn navbar__btn--primary" onClick={() => {
          localStorage.clear();
          navigate('/');
        }}>Logout</button>}
      </div>
    </nav>
  );
};

export default Navbar; 