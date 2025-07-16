import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductListPage.css';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [notification, setNotification] = useState('');
  const cardRefs = useRef([]);

  useEffect(() => {
    const fetchProducts = async () => {
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
    fetchProducts();
  }, []);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('float-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    cardRefs.current.forEach(card => {
      if (card) observer.observe(card);
    });
    return () => observer.disconnect();
  }, [products]);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.cdnfonts.com/css/asterion';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const exists = cart.find(item => item._id === product._id);
    if (exists) {
      exists.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    setNotification('Added to cart!');
    setTimeout(() => setNotification(''), 2000);
  };

  if (loading) return <div className="product-list-loading">Loading products...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="product-list-main">
      {notification && (
        <div className="notification-tick">
          <span className="notification-icon">✔</span> {notification}
        </div>
      )}
      <h2 className="product-list-title" style={{ fontFamily: 'Asterion, sans-serif', fontWeight: 900, fontSize: '2.2rem', letterSpacing: 1.2, color: '#2563eb', marginBottom: '2.2rem' }}>Shop Products</h2>
      <div className="product-list-grid">
        {products.map((product, idx) => (
          <div
            key={product._id}
            className="product-list-card"
            ref={el => (cardRefs.current[idx] = el)}
          >
            <img src={product.images[0]} alt={product.name} className="product-list-img" />
            <div className="product-list-info">
              <h3>{product.name}</h3>
              <p className="product-list-price">${product.price}</p>
              <button className="product-list-btn" onClick={() => navigate(`/products/${product._id}`)}>View Details</button>
              <button className="product-list-btn" onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListPage; 