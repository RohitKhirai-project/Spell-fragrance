import React, { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaUser,
  FaHeart,
  FaShoppingCart,
  FaSearch,
  FaBars,
  FaHome,
  FaShoppingBag,
} from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { togglePanel } = useWishlist();
  const { cartItems = [] } = useCart();

  return (
    <>
      <div className="navbar-wrapper">
        {/* Logo Section */}
        <div className="navbar-logo">
          <img src="/company logo.avif" alt="PerfumeX Logo" className="logo-img" />
        </div>

        {/* Main Navigation */}
        <div className="navbar-bottom">
          <div className="navbar-left">
            <FaBars
              className="menu-icon mobile-only"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              title="Menu"
            />
            <div className="navbar-social-icons">
              <a
                href="https://www.facebook.com/profile.php?id=61552653317749&sk=friends"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.instagram.com/spellfragrance"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://api.whatsapp.com/send/?phone=919148554116&text&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* Center Links */}
          <div className="navbar-center">
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>

          {/* Right Section */}
          <div className="navbar-right">
            <FaHeart
              className="wishlist-icon"
              onClick={togglePanel}
              title="Wishlist"
            />
            <Link to="/cart" className="cart-icon-link" title="Cart">
              <FaShoppingCart className="cart-icon" />
              {cartItems.length > 0 && (
                <span className="cart-count">{cartItems.length}</span>
              )}
            </Link>
            <Link to="/login" className="web-only" title="Login / Profile">
              <FaUser />
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-sidebar">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/shop" onClick={() => setIsMenuOpen(false)}>Shop</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          </div>
        )}
      </div>

      {/* Mobile Bottom Nav */}
      <div className="mobile-footer mobile-only">
        <Link to="/" title="Home"><FaHome /></Link>
        <Link to="/shop" title="Shop"><FaShoppingBag /></Link>
        <Link to="/search" title="Search"><FaSearch /></Link>
        <Link to="/categories" title="Categories"><BiCategory /></Link>
        <Link to="/register" title="Profile"><FaUser /></Link>
      </div>
    </>
  );
};

export default Navbar;
