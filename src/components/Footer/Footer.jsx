import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-address">
          <h3>Contact Us</h3>
          <p>Rehman Market, Pan Mandi, Sadar Bazar, Delhi, 110006 India</p>
          <p>Email: <a href="mailto:fragranceheaven2705@gmail.com">fragranceheaven2705@gmail.com</a></p>
          <p>Phone: <a href="tel:+917838191410">+91 7838191410</a></p>
        </div>
        <div className="footer-links">
          <h3>Categories</h3>
          <ul>
          <li><Link to="/shop?category=Male">For Him</Link></li>
<li><Link to="/shop?category=Female">For Her</Link></li>
<li><Link to="/shop?category=Unisex">Unisex</Link></li>

          </ul>
        </div>
        <div className="footer-links">
          <h3>Useful Links</h3>
          <ul>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
            <li><a href="/terms-and-conditions">Terms and Conditions</a></li>
            <li><a href="/refund-policy">Refund Policy</a></li>
            <li><a href="/shipping-and-returns">Shipping and Returns</a></li>
            <li><a href="/terms-of-service">Terms of Service</a></li>
          </ul>
        </div>
        <div className="footer-newsletter">
          <h3>Newsletter Signup</h3>
          <p>Subscribe to our newsletter and get 10% off your first purchase</p>
          <input type="email" placeholder="Your email address" className="newsletter-input" />
          <button className="subscribe-btn">Subscribe</button>
        </div>
        <div className="footer-payment">
          <h3>We Accept</h3>
          <div className="payment-icons">
            <img src="/images/paypal.png" alt="PayPal" />
            <img src="/images/maestro.png" alt="Maestro" />
            <img src="/images/american-express.png" alt="American Express" />
            <img src="/images/discover.png" alt="Discover" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
