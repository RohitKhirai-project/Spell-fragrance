import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/api/login", loginData);
      setMessage(res.data); // "Login successful"
      setLoginData({ email: "", password: "" });
      setTimeout(() => {
        navigate("/"); // redirect to home or dashboard
      }, 1000);
    } catch (err) {
      setMessage(err.response?.data || "Login failed");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="login-page">
      <h2>Log In</h2>
      <nav className="breadcrumb">
        <Link to="/">Home</Link> &gt; <span>Account</span>
      </nav>

      <div className="login-container">
        <div className="login-left">
          <h3>Log In</h3>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={loginData.email}
              onChange={handleLoginChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleLoginChange}
              required
            />
            <Link to="/forgot-password" className="forgot-link">
              Forgot your password?
            </Link>
            <button type="submit" className="login-button">
              Sign In
            </button>
          </form>
          {message && <p className="login-message">{message}</p>}
          <p className="register-redirect">
            New user? <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
