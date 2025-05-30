import React, { useEffect, useState } from 'react';
import './ShopPerfume.css';
import axios from 'axios';
import { FaHeart } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext'; // Corrected import

const ShopPerfume = () => {
  const [perfumes, setPerfumes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [mlSelections, setMlSelections] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToWishlist } = useWishlist();
  const { addToCart } = useCart(); // Corrected hook

  const location = useLocation();
  const categoryFromUrl = new URLSearchParams(location.search).get('category');

  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  useEffect(() => {
    const fetchPerfumes = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/shopperfumes');
        setPerfumes(res.data);
        setLoading(false);
      } catch {
        setError('Error fetching perfumes');
        setLoading(false);
      }
    };
    fetchPerfumes();
  }, []);

  const handleMLChange = (perfumeId, ml) => {
    setMlSelections((prev) => ({ ...prev, [perfumeId]: ml }));
  };

  const filteredPerfumes = perfumes.filter((perfume) =>
    perfume.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'All' || perfume.category.toLowerCase() === selectedCategory.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="shop-section">
      <h2 className="shop-title">Shop Perfume</h2>

      <div className="search-bar-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search perfumes..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          />
          {showSuggestions && searchTerm.trim() && (
            <ul className="suggestions">
              {filteredPerfumes.length ? (
                filteredPerfumes.map((perfume, index) => (
                  <li key={index} onClick={() => setSearchTerm(perfume.name)}>
                    {perfume.name}
                  </li>
                ))
              ) : (
                <li className="no-match">No matches found</li>
              )}
            </ul>
          )}
        </div>

        <select
          className="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Unisex">Unisex</option>
        </select>
      </div>

      <div className="shop-grid">
        {filteredPerfumes.map((perfume) => (
          <div className="shop-card" key={perfume.id}>
            <div className="image-container">
              <img
                src={`http://localhost:3001/uploads/${perfume.image}`}
                alt={perfume.name}
                className="shop-image"
              />
              <FaHeart
                className="wishlist-icon"
                title="Add to Wishlist"
                onClick={() => {
                  const selectedML = mlSelections[perfume.id];
                  if (!selectedML) {
                    alert('Please select a ML before adding to wishlist.');
                    return;
                  }
                  addToWishlist({ ...perfume, ml: selectedML });
                }}
              />
            </div>

            <h3 className="shop-name">{perfume.name}</h3>
            <p className="shop-description">{perfume.description}</p>
            <p className="shop-price">₹{perfume.price}</p>

            <select
              className="ml-select"
              value={mlSelections[perfume.id] || ''}
              onChange={(e) => handleMLChange(perfume.id, e.target.value)}
            >
              <option value="">Select ML</option>
              {perfume.ml ? perfume.ml.split(',').map((size, i) => (
                <option key={i} value={size.trim()}>{size.trim()}</option>
              )) : (
                <option disabled>No sizes available</option>
              )}
            </select>

            <div className="shop-actions">
            <button
  className="add-to-cart-btn"
  onClick={() => {
    const selectedML = mlSelections[perfume.id];
    if (!selectedML) {
      alert('Please select a size (ML) before adding to cart.');
      return;
    }
    addToCart({ ...perfume, ml: selectedML }, selectedML);  {/* Corrected */}
  }}
>
  Add to Cart
</button>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShopPerfume;
