import React, { createContext, useContext, useState, useEffect } from 'react';
import './Cart.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/cart');
        const data = await response.json();
        if (response.ok) {
          // Ensure each item has quantity (default 1 if missing)
          const itemsWithQty = data.map(item => ({
            ...item,
            quantity: item.quantity || 1,
          }));
          setCartItems(itemsWithQty);
        } else {
          throw new Error(data.message || 'Failed to load cart');
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCartItems();
  }, []);

  const addToCart = async (perfume, selectedMl) => {
    const exists = cartItems.find(
      (item) => item.id === perfume.id && item.ml === selectedMl
    );

    if (exists) {
      // If already in cart, update quantity by 1
      updateQuantity(perfume.id, selectedMl, exists.quantity + 1);
      return;
    }

    const newItem = { ...perfume, ml: selectedMl, quantity: 1 };
    setCartItems((prevItems) => [...prevItems, newItem]);

    try {
      const response = await fetch('http://localhost:3001/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to save cart item.');
      }

      toast.success('Cart item added successfully', {
        autoClose: 3000,
        toastId: 'add-cart-success',
        closeButton: false,
      });
    } catch (error) {
      console.error('Error saving cart item:', error);
      toast.error('Failed to save cart item', {
        autoClose: 3000,
        toastId: 'add-cart-error',
      });
    }
  };

  const removeFromCart = async (id, ml) => {
    try {
      const response = await fetch(`http://localhost:3001/api/cart/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ml }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to remove cart item.');
      }

      setCartItems((prevItems) =>
        prevItems.filter((item) => !(item.id === id && item.ml === ml))
      );

      toast.success('Cart item removed successfully', {
        autoClose: 3000,
        toastId: 'remove-cart-success',
        closeButton: false,
      });
    } catch (error) {
      console.error('Error removing cart item:', error);
      toast.error('Failed to remove item from cart', {
        autoClose: 3000,
        toastId: 'remove-cart-error',
      });
    }
  };

  // New method: update quantity both locally and in backend
  const updateQuantity = async (id, ml, newQuantity) => {
    if (newQuantity < 1) return; // optional, prevent invalid quantity

    try {
      const response = await fetch(`http://localhost:3001/api/cart/${id}`, {
        method: 'PUT', // Assuming your backend supports PUT for updates
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ml, quantity: newQuantity }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update cart item.');
      }

      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id && item.ml === ml ? { ...item, quantity: newQuantity } : item
        )
      );

      toast.success('Cart item quantity updated', {
        autoClose: 3000,
        toastId: 'update-cart-success',
        closeButton: false,
      });
    } catch (error) {
      console.error('Error updating cart item:', error);
      toast.error('Failed to update cart item', {
        autoClose: 3000,
        toastId: 'update-cart-error',
      });
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,  // expose the new method
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
