import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './AdminLogin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3001/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the token in localStorage
        localStorage.setItem('adminToken', data.token);

        // Call your auth context login
        login();

        // Navigate to dashboard
        navigate('/admin/dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Server error');
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="admin-login-left">
          <h2>Log in.</h2>
          <p className="subtitle">Login with your admin credentials.</p>
          {error && <p className="admin-login-error">{error}</p>}
          <form onSubmit={handleSubmit} className="admin-login-form">
            <label>Your e-mail</label>
            <input
              type="email"
              placeholder="name@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Password</label>
            <input
              type="password"
              placeholder="your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="login-options">
              <label>
                <input type="checkbox" /> Keep me logged in
              </label>
            </div>
            <button type="submit" className="login-btn">Log In</button>
            <p className="forgot-password">Forgot Password?</p>
          </form>
        </div>
        <div className="admin-login-right">
          <img src="/login-illustration.jpg" alt="Login illustration" />
          <p className="no-account">Don't have account yet?</p>
          <p className="contact-text">
            Contact us at <span>name@domain.com</span> and<br />
            We will take care of everything!!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
