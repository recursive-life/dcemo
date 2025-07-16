import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserPage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      navigate('/login');
    } else {
      setUser(JSON.parse(userInfo));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="user-dashboard">
      <h2>Welcome, {user.name}!</h2>
      <p>Email: {user.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserPage;
