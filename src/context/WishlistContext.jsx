import React, { createContext, useContext, useState, useEffect } from 'react';
import './WishlistPanel.css';
import { useCart } from './CartContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const { addToCart } = useCart();

  // 🔁 Load wishlist from backend when app loads
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/wishlist');
        const data = await response.json();
        if (response.ok) {
          setWishlistItems(data);
        } else {
          throw new Error(data.message || 'Failed to load wishlist');
        }
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    fetchWishlist();
  }, []);

  // Add to Wishlist and save to server
  const addToWishlist = async (perfume) => {
    if (!perfume.ml) {
      toast.error('Please select a ML before adding to wishlist.');
      return;
    }

    const exists = wishlistItems.find(
      (item) => item.id === perfume.id && item.ml === perfume.ml
    );
    if (exists) return;

    setWishlistItems((prev) => [...prev, perfume]);
    setIsPanelOpen(true);

    try {
      const response = await fetch('http://localhost:3001/api/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(perfume),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to save wishlist item.');
      }
      toast.success('Wishlist item saved to server.');
    } catch (error) {
      console.error('Error saving wishlist:', error);
      toast.error('Could not save to server.');
    }
  };

  // Remove from Wishlist and delete from server
  const removeFromWishlist = async (id, ml) => {
    try {
      // Remove from backend (MySQL)
      const response = await fetch(`http://localhost:3001/api/wishlist/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ml }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to remove wishlist item.');
      }

      // Remove from local state (if removed from backend)
      setWishlistItems((prev) => prev.filter((item) => item.id !== id || item.ml !== ml));
      toast.success('Wishlist item removed successfully');
      
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      toast.error('Failed to remove item from wishlist');
    }
  };

  const togglePanel = () => setIsPanelOpen(!isPanelOpen);
  const closePanel = () => setIsPanelOpen(false);

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        togglePanel,
        closePanel,
        isPanelOpen,
      }}
    >
      {children}

      {isPanelOpen && (
        <div className="wishlist-panel">
          <div className="wishlist-header">
            <h2>Your Wishlist</h2>
          </div>

          <button className="close-btn" onClick={closePanel}>✖</button>

          {wishlistItems.length === 0 ? (
            <p className="empty-text">Your wishlist is empty.</p>
          ) : (
            <div className="wishlist-items">
              {wishlistItems.map((item) => (
                <div key={`${item.id}-${item.ml}`} className="wishlist-item">
                  <img
                    src={`http://localhost:3001/uploads/${item.image}`}
                    alt={item.name}
                    className="item-image"
                  />
                  <div className="item-details">
                    <div className="top-row">
                      <h3>{item.name}</h3>
                    </div>
                    <p className="description">{item.description}</p>
                    <div className="bottom-row">
                      <div><span className="label">Qty:</span> 1</div>
                      <div><span className="label">Price:</span> ₹{item.price}</div>
                      <div><span className="label">ML:</span> {item.ml}</div>
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromWishlist(item.id, item.ml)}
                    >
                      Remove
                    </button>
                    <button
                      className="add-to-cart-btn"
                      onClick={() => addToCart(item, item.ml)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Toast container to show messages */}
      
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
