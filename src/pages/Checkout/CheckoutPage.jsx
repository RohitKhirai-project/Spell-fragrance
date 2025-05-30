import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../../context/CartContext';
import './CheckoutPage.css';
import { FaGooglePay, FaPhone, FaMoneyBillWave } from 'react-icons/fa';

const CheckoutPage = () => {
  const { cartItems } = useCart();

  const formContainerRef = useRef(null);

  const [storedAddresses, setStoredAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [editAddressId, setEditAddressId] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState('');
  const [selectedUPI, setSelectedUPI] = React.useState(null); // <-- add this
  const [errorMessage, setErrorMessage] = React.useState('');

   const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi",
    "Jammu and Kashmir", "Ladakh", "Puducherry"
  ];

  const [formData, setFormData] = useState({
    country: 'India',
    firstName: '',
    lastName: '',
    city: '',
    address: '',
    apartment: '',
    state: '',
    pincode: '',
    phone: '',
  });

  useEffect(() => {
    const fetchStoredAddresses = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/addresses');
        if (res.ok) {
          const data = await res.json();
          setStoredAddresses(data);
        } else {
          console.error('Failed to fetch addresses');
        }
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };

    fetchStoredAddresses();
  }, []);

  const scrollToTop = () => {
    if (formContainerRef.current) {
      formContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectStoredAddress = (address) => {
    setFormData({
      country: address.country || 'India',
      firstName: address.firstName || '',
      lastName: address.lastName || '',
      city: address.city || '',
      address: address.address || '',
      apartment: address.apartment || '',
      state: address.state || '',
      pincode: address.pincode || '',
      phone: address.phone || '',
    });
    setSelectedAddressId(address.id);
    setEditAddressId(null);
    scrollToTop();
  };

  const handleEditAddress = (address) => {
    setFormData({
      country: address.country || 'India',
      firstName: address.firstName || '',
      lastName: address.lastName || '',
      city: address.city || '',
      address: address.address || '',
      apartment: address.apartment || '',
      state: address.state || '',
      pincode: address.pincode || '',
      phone: address.phone || '',
    });
    setEditAddressId(address.id);
    setSelectedAddressId(null);
    scrollToTop();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if ((name === 'pincode' || name === 'phone') && !/^[0-9]*$/.test(value)) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, address, apartment, city, state, pincode, phone, country } = formData;


  
    if (!firstName || !lastName || !address || !city || !state) {
      setErrorMessage('Please fill all required address fields including First and Last name.');
      return;
    }
    if (!/^\d{6}$/.test(pincode)) {
      setErrorMessage('PIN code must be exactly 6 digits.');
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      setErrorMessage('Phone number must be exactly 10 digits.');
      return;
    }
    if (cartItems.length === 0) {
      setErrorMessage('Your cart is empty. Add items before checkout.');
      return;
    }
    
    if (!selectedPayment) {
      setErrorMessage('Please select a payment method before placing the order.');
      return;
    }
    if (selectedPayment === 'online' && !selectedUPI) {
      setErrorMessage('Please select a UPI app for online payment.');
      return;
    } 


    try {
      const response = await fetch('http://localhost:3001/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: firstName.trim(),
          lastName: lastName.trim(),
          address: address.trim(),
          apartment: apartment.trim(),
          city: city.trim(),
          state: state.trim(),
          pincode: pincode.trim(),
          phone: phone.trim(),
          country,
          cartItems,
          billingSame: true,
        }),
      });

      if (response.ok) {
        alert('Order submitted successfully!');
        const resJson = await response.json();
        console.log('Order Response:', resJson);
      } else {
        alert('Failed to submit order.');
        console.error(await response.text());
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + (parseFloat(item.price) || 0) * (item.quantity || 1),
    0
  );

  return (
    <div className="checkout-container">
      <div className="checkout-left">
        <h2>Delivery</h2>
        <div ref={formContainerRef}>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <input name="country" value={formData.country} onChange={handleChange} placeholder="Country" className="full-width" readOnly />
              <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" className="half-width" required />
              <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className="half-width" required />
              <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="full-width" required />
              <input name="apartment" value={formData.apartment} onChange={handleChange} placeholder="Apartment, suite, etc." className="full-width" />
              <input name="city" value={formData.city} onChange={handleChange} placeholder="City" className="third-width" required />
              <select name="state" value={formData.state} onChange={handleChange} className="third-width" required>
                <option value="" disabled>Select State / Province</option>
                {states.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              <input name="pincode" value={formData.pincode} onChange={handleChange} placeholder="PIN code (6 digits)" maxLength={6} className="third-width" required />
              <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone (10 digits)" maxLength={10} className="full-width" required />
            </div>

            <p className="note">Enter your shipping address to view available shipping methods.</p>

            {storedAddresses.length > 0 && (
              <div className="stored-addresses">
                <h3>Choose a saved address:</h3>
                {storedAddresses.map((addr) => (
                  <div key={addr.id} className={`address-card ${selectedAddressId === addr.id ? 'selected' : ''}`}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedAddressId === addr.id}
                        onChange={() => handleSelectStoredAddress(addr)}
                      />
                      <span>
                        <strong>{addr.firstName} {addr.lastName}</strong><br />
                        {addr.address}{addr.apartment && `, ${addr.apartment}`}<br />
                        {addr.city}, {addr.state} - {addr.pincode}<br />
                        Phone: {addr.phone}
                      </span>
                    </label>
                    <button type="button" onClick={() => handleEditAddress(addr)}>Edit</button>
                  </div>
                ))}
              </div>
            )}

<h2>Payment</h2>
<div className="payment-method">
  <div
    className={selectedPayment === 'online' ? 'selected' : ''}
    onClick={() => setSelectedPayment('online')}
    style={{ cursor: 'pointer' }}
  >
    <h3>Pay through UPI apps</h3>
    {selectedPayment === 'online' && (
      <div className="upi-options">
        <div
          className={selectedUPI === 'gpay' ? 'selected' : ''}
          onClick={(e) => {
            e.stopPropagation(); // prevent parent div's onClick
            setSelectedUPI('gpay');
          }}
          style={{ display: 'flex', alignItems: 'center', padding: '8px', cursor: 'pointer', borderRadius: '6px', marginBottom: '6px', border: '1px solid #ccc' }}
        >
          <img
            src="/images/gpay.png"
            alt="GPay"
            style={{ width: 40, marginRight: 8 }}
          />
          GPay
        </div>
        <div
          className={selectedUPI === 'phonepe' ? 'selected' : ''}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedUPI('phonepe');
          }}
          style={{ display: 'flex', alignItems: 'center', padding: '8px', cursor: 'pointer', borderRadius: '6px', border: '1px solid #ccc' }}
        >
          <img
            src="/images/phonepay.png"
            alt="PhonePe"
            style={{ width: 40, marginRight: 8 }}
          />
          PhonePe
        </div>
      </div>
    )}
  </div>

  <div
    className={selectedPayment === 'offline' ? 'selected' : ''}
    onClick={() => setSelectedPayment('offline')}
    style={{ cursor: 'pointer' }}
  >
    <h3>
      <img 
        src="/images/truck.png" 
        alt="Offline Payment" 
        style={{ width: "24px", height: "24px", verticalAlign: "middle", marginRight: "8px" }} 
      />
      Offline
    </h3>
    <ul>
      <li>Cash on Delivery (COD)</li>
    </ul>
  </div>
</div>

 {/* Display error message */}
 {errorMessage && (
    <div style={{ color: 'red', marginBottom: '16px' }}>
      {errorMessage}
    </div>
  )}

            <button type="submit" className="submit-order-btn">Place Order</button>
          </form>
        </div>
      </div>

      <div className="checkout-right">
        <h2>Order Summary</h2>
        <div className="order-summary">
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item, idx) => (
              <div className="order-item" key={`${item.id}-${item.ml}-${idx}`}>
                <img src={`http://localhost:3001/uploads/${item.image}`} alt={item.name} />
                <div>
                  <p><strong>{item.name} {item.ml}</strong></p>
                  <p>Quantity: {item.quantity}</p>
                  <p>₹{(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))
          )}
          <div className="discount-code">
            <label>Discount code</label>
            <div className="discount-input">
              <input type="text" placeholder="Enter code" />
              <button type="button">Submit</button>
            </div>
          </div>
          <div className="price-summary">
            <div><strong>Subtotal:</strong> ₹{subtotal.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
