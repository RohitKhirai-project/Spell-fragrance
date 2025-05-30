import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AdminSidebar.css';

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  const [isProductsOpen, setProductsOpen] = useState(false);
  const location = useLocation();

  const handleLinkClick = () => {
    // Close the sidebar on mobile after a link is clicked
    if (window.innerWidth <= 768) {
      toggleSidebar();
    }
  };

  const getLinkClass = (path) => location.pathname === path ? 'active' : '';

  return (
    <div className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-close-btn" onClick={toggleSidebar}>✕</div>

      <div className="sidebar-header">
        <h2>Admin Panel</h2>
      </div>

      <nav>
        <ul>
          {/* Dashboard Link */}
          <li>
            <Link
              to="/admin/dashboard"
              onClick={handleLinkClick}
              className={getLinkClass('/admin/dashboard')}
            >
              Dashboard
            </Link>
          </li>

          {/* Products Section with Submenu */}
          <li>
            <div
              className="submenu-toggle"
              onClick={() => setProductsOpen(!isProductsOpen)}
            >
              <span>Products</span>
              <span>{isProductsOpen ? '▾' : '▸'}</span>
            </div>
            {isProductsOpen && (
              <ul className="submenu">
                <li>
                  <Link
                    to="/admin/products/add"
                    onClick={handleLinkClick}
                    className={getLinkClass('/admin/products/add')}
                  >
                    Add Perfume
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/products/view"
                    onClick={handleLinkClick}
                    className={getLinkClass('/admin/products/view')}
                  >
                    View Existing Perfume
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Orders Link */}
          <li>
            <Link
              to="/admin/orders"
              onClick={handleLinkClick}
              className={getLinkClass('/admin/orders')}
            >
              Orders
            </Link>
          </li>

          {/* Users Link */}
          <li>
            <Link
              to="/admin/users"
              onClick={handleLinkClick}
              className={getLinkClass('/admin/users')}
            >
              Users
            </Link>
          </li>

          {/* Edit Hero Section Link */}
          <li>
            <Link
              to="/admin/edit-hero"
              onClick={handleLinkClick}
              className={getLinkClass('/admin/edit-hero')}
            >
              Edit Hero Section
            </Link>
          </li>

          {/* Edit Perfume Carousel Link */}
          <li>
            <Link
              to="/admin/edit-perfumes"
              onClick={handleLinkClick}
              className={getLinkClass('/admin/edit-perfumes')}
            >
              Edit Perfume Carousel
            </Link>
          </li>

          {/* New Link for Admin Most Selling page */}
          <li>
            <Link
              to="/admin/Adminmost-selling"
              onClick={handleLinkClick}
              className={getLinkClass('/admin/Adminmost-selling')}
            >
              Manage Most Selling Perfumes
            </Link>
          </li>

          {/* New Link for Admin Contact Page */}
          <li>
            <Link
              to="/admin/contact"
              onClick={handleLinkClick}
              className={getLinkClass('/admin/contact')}
            >
              Manage Contact Information
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
