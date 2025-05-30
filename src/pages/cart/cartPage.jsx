import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + (parseFloat(item.price) || 0) * (item.quantity || 1),
      0
    );
  };

  const handleQuantityChange = (id, ml, e) => {
    const newQty = parseInt(e.target.value, 10);
    if (newQty >= 1) {
      updateQuantity(id, ml, newQty);
    }
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-header">
            <div className="col product">Product</div>
            <div className="col price">Price</div>
            <div className="col quantity">Quantity</div>
            <div className="col total">Total</div>
            <div className="col action"></div>
          </div>

          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div className="cart-item" key={`${item.id}-${item.ml}-${index}`}>
                <div className="col product">
                  <img
                    src={`http://localhost:3001/uploads/${item.image}`}
                    alt={item.name}
                    className="cart-item-img"
                  />
                  <div className="product-details">
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <small>ML: {item.ml}</small>
                  </div>
                </div>
                <div className="col price">₹{parseFloat(item.price).toFixed(2)}</div>
                <div className="col quantity">
                  <select
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, item.ml, e)}
                    className="quantity-select"
                  >
                    {[...Array(10).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col total">
                  ₹{((parseFloat(item.price) || 0) * (item.quantity || 1)).toFixed(2)}
                </div>

                <div className="col action">
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id, item.ml)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {cartItems.length > 0 && (
        <div className="cart-summary">
          <h3>Total: ₹{getTotalPrice().toFixed(2)}</h3>
          <Link to="/checkout">
            <button className="checkout-btn">Proceed to Checkout</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
