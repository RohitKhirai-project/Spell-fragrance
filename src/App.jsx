import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from 'react-router-dom';

// React Toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context Providers
import { WishlistProvider } from './context/WishlistContext';
import { CartProvider } from './context/CartContext';

// User Components
import Loader from './components/Loader/Loader';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Animation from './components/Circle/Animation';
import MostSelling from './components/MostSelling/MostSelling';
import PerfumeCategories from './components/PerfumeCategories/PerfumeCategories';
import Services from './components/Services/Services';
import Footer from './components/Footer/Footer';
import ShopPerfume from './components/Shopperfume/ShopPerfume';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Login from './pages/login/login';
import Register from './pages/login/Register';
import TermsAndPolicies from './pages/TermsAndPolicies/TermsAndPolicies';
import CartPage from './pages/cart/cartPage';
import CheckoutPage from './pages/checkout/CheckoutPage';

// Admin Components
import AdminLogin from './components/Admin/AdminLogin/AdminLogin';
import AdminLayout from './components/Admin/AdminLayout/AdminLayout';
import AdminDashboard from './components/Admin/AdminDashboard/AdminDashboard';
import AddPerfume from './components/Admin/AdminProductPage/AddPerfume/AddPerfume';
import ViewPerfumes from './components/Admin/AdminProductPage/ViewPerfumes/ViewPerfumes';
import Orders from './components/Admin/OrderPage/OrderPage';
import Users from './components/Admin/Users/Users';
import AdminEditHero from './components/Admin/AdminEditHero/AdminEditHero';
import AdminEditPerfumes from './components/Admin/AdminEditPerfumes/AdminEditPerfumes';
import AdminMostSelling from './components/Admin/AdminMostSelling/AdminMostSelling';
import AdminContactPage from './components/Admin/AdminContactPage/AdminContactPage';

function App() {
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <MainContent wishlist={wishlist} setWishlist={setWishlist} />
          </Router>
        </WishlistProvider>
      </CartProvider>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        closeButton={false}
      />
    </>
  );
}

const MainContent = ({ wishlist, setWishlist }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Navbar wishlist={wishlist} />}

      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Animation />
              <MostSelling />
              <PerfumeCategories />
              <Services />
            </>
          }
        />
        <Route path="/shop" element={<ShopPerfume wishlist={wishlist} setWishlist={setWishlist} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />

        {/* Terms & Policies */}
        <Route path="/privacy-policy" element={<TermsAndPolicies />} />
        <Route path="/terms-and-conditions" element={<TermsAndPolicies />} />
        <Route path="/refund-policy" element={<TermsAndPolicies />} />
        <Route path="/shipping-and-returns" element={<TermsAndPolicies />} />
        <Route path="/terms-of-service" element={<TermsAndPolicies />} />

        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Routes - No Auth Check */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products/add" element={<AddPerfume />} />
          <Route path="products/view" element={<ViewPerfumes />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
          <Route path="edit-hero" element={<AdminEditHero />} />
          <Route path="edit-perfumes" element={<AdminEditPerfumes />} />
          <Route path="Adminmost-selling" element={<AdminMostSelling />} />
          <Route path="contact" element={<AdminContactPage />} />
        </Route>
      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  );
};

export default App;
