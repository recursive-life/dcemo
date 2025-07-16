import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import './CartPage.css';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart')) || []);
  }, []);

  const removeFromCart = (id) => {
    const newCart = cart.filter(item => item._id !== id);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const updateQuantity = (id, qty) => {
    if (qty < 1) return;
    const newCart = cart.map(item => item._id === id ? { ...item, quantity: qty } : item);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const checkout = () => {
    navigate('/checkout');
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cart.length === 0) return <div className="cart-empty">Your cart is empty.</div>;

  return (
    <div className="cart-page-main">
      <Card className="cart-card">
        <h2 className="cart-title">Your Cart</h2>
        <div className="cart-items-list">
          {cart.map(item => (
            <div key={item._id} className="cart-item">
              <img src={item.images[0]} alt={item.name} className="cart-item-img" />
              <div className="cart-item-info">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-price">${item.price} x</div>
                <input type="number" min="1" value={item.quantity} onChange={e => updateQuantity(item._id, parseInt(e.target.value))} className="cart-item-qty" />
                <div className="cart-item-total">= ${item.price * item.quantity}</div>
                <Button variant="outline" size="sm" onClick={() => removeFromCart(item._id)} style={{ marginLeft: 12 }}>Remove</Button>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <div className="cart-total-label">Total:</div>
          <div className="cart-total-value">${total}</div>
        </div>
        <Button className="cart-checkout-btn" onClick={checkout} style={{ marginTop: 18, width: '100%' }}>Proceed to Checkout</Button>
      </Card>
    </div>
  );
};

export default CartPage; 