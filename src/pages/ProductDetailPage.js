import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to fetch product');
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCart = () => {
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

  if (loading) return <div className="product-detail-loading">Loading product...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!product) return null;

  return (
    <div className="product-detail-main">
      {notification && (
        <div className="notification-tick">
          <span className="notification-icon">✔</span> {notification}
        </div>
      )}
      <Card className="product-detail-card">
        <div className="product-detail-img-wrap">
          <img src={product.images[0]} alt={product.name} className="product-detail-img" />
        </div>
        <div className="product-detail-info">
          <h2 className="product-detail-title">{product.name}</h2>
          <p className="product-detail-desc">{product.description}</p>
          <div className="product-detail-price">${product.price}</div>
          <div className="product-detail-btns">
            <Button onClick={addToCart} style={{ minWidth: 130 }}>Add to Cart</Button>
            <Button variant="outline" onClick={() => navigate(-1)} style={{ minWidth: 130, marginLeft: 12 }}>Back to Products</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProductDetailPage; 