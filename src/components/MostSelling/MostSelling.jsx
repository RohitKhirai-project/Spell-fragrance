import React, { useEffect, useState } from 'react';
import './MostSelling.css';

const MostSelling = () => {
  const [perfumes, setPerfumes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/mostselling')
      .then((response) => response.json())
      .then((data) => setPerfumes(data))
      .catch((error) => console.error('Error fetching perfumes:', error));
  }, []);

  return (
    <section className="most-selling-container">
      <h2 className="title">Most Selling Perfumes</h2>
      <div className="perfume-list">
        {perfumes.map((perfume) => (
          <div key={perfume.id} className="perfume-card">
            <img
              src={
                perfume.image
                  ? `http://localhost:3001${perfume.image}`
                  : '/default-image.jpg'
              }
              alt={perfume.name}
              className="perfume-img"
            />
            <h3>{perfume.name}</h3>
            <p className="price">{perfume.price}</p>
            <button className="buy-btn">Shop Now</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MostSelling;
