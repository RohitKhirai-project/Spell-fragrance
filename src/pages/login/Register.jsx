import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/api/register", registerData);
      setMessage(res.data); // "User registered successfully"
      setRegisterData({ name: "", email: "", password: "" });
      setTimeout(() => {
        navigate("/login"); // redirect to login after successful registration
      }, 1000);
    } catch (err) {
      setMessage(err.response?.data || "Registration failed");
      console.error("Registration error:", err);
    }
  };

  return (
    <div className="login-page">
      <h2>Create Account</h2>
      <nav className="breadcrumb">
        <Link to="/">Home</Link> &gt; <span>Account</span>
      </nav>

      <div className="register-container">
        <div className="register-form">
          <h3>New Customer</h3>
          <p>
            Sign up for early Sale access plus tailored new arrivals, trends, and promotions.
            To opt out, click unsubscribe in our emails.
          </p>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={registerData.name}
              onChange={handleRegisterChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={registerData.email}
              onChange={handleRegisterChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={registerData.password}
              onChange={handleRegisterChange}
              required
            />
            <button type="submit" className="register-button">
              Register
            </button>
          </form>
          {message && <p className="register-message">{message}</p>}

          <p className="login-redirect">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
