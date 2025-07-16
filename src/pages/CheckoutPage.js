import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const [shipping, setShipping] = useState({
    street: '', city: '', state: '', zipCode: '', country: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleChange = e => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (!userInfo) throw new Error('You must be logged in to checkout.');
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        },
        body: JSON.stringify({
          orderItems: cart.map(item => ({
            product: item._id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            image: item.images && item.images[0]
          })),
          shippingAddress: shipping,
          paymentMethod,
          itemsPrice: total,
          taxPrice: 0,
          shippingPrice: 0,
          totalPrice: total
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Order failed');
      setSuccess(true);
      localStorage.removeItem('cart');
      setTimeout(() => navigate('/orders'), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) return <div>Your cart is empty.</div>;

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit} className="checkout-form">
        <input name="street" placeholder="Street" value={shipping.street} onChange={handleChange} required />
        <input name="city" placeholder="City" value={shipping.city} onChange={handleChange} required />
        <input name="state" placeholder="State" value={shipping.state} onChange={handleChange} required />
        <input name="zipCode" placeholder="Zip Code" value={shipping.zipCode} onChange={handleChange} required />
        <input name="country" placeholder="Country" value={shipping.country} onChange={handleChange} required />
        <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
          <option>Credit Card</option>
          <option>PayPal</option>
          <option>Cash on Delivery</option>
        </select>
        <h3>Total: ${total}</h3>
        <button type="submit" disabled={loading}>{loading ? 'Placing order...' : 'Place Order'}</button>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">Order placed successfully!</div>}
      </form>
    </div>
  );
};

export default CheckoutPage; 