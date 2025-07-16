import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserLoginPage from './pages/UserLoginPage';
import RegisterPage from './pages/RegisterPage';
import UserPage from './pages/UserPage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import UserOrdersPage from './pages/UserOrdersPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminProductsPage from './pages/AdminProductsPage';
import AdminUsersPage from './pages/AdminUsersPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
import DashboardPage from './pages/DashboardPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/login" element={<UserLoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<UserOrdersPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/products" element={<AdminProductsPage />} />
        <Route path="/admin/users" element={<AdminUsersPage />} />
        <Route path="/admin/orders" element={<AdminOrdersPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        {/* ...other routes... */}
      </Routes>
    </Router>
  );
}

export default App;
