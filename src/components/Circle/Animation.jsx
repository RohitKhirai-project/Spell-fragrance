import React, { useState, useEffect } from "react";
import "./Animation.css";

const Animation = () => {
  const [perfumes, setPerfumes] = useState([]);
  const [error, setError] = useState(null);
  const BASE_URL = "http://localhost:3001";

  useEffect(() => {
    const fetchPerfumes = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/perfumes`);

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setPerfumes(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching perfumes:", error);
      }
    };

    fetchPerfumes();
  }, []);

  return (
    <section id="perfumes" className="services-section">
      <div className="banner">
        <div className="services-heading">
          <h2>Our Signature Perfumes</h2>
          <p>Experience the essence of elegance and aroma</p>
        </div>

        <div className="slider">
          {error ? (
            <div className="error-message">
              <p>{`Failed to load perfumes: ${error}`}</p>
            </div>
          ) : (
            perfumes.length > 0 ? (
              perfumes.map((perfume, index) => (
                <div
                  className="item"
                  key={perfume.id || index}
                  style={{
                    "--position": (index + 1).toString(),
                    "--quantity": perfumes.length,
                  }}
                >
                 <img
  src={perfume.image?.startsWith("/uploads") ? `http://localhost:3001${perfume.image}` : perfume.image}
  alt={perfume.name}
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = "/fallback.jpg";
  }}
/>

                  <div className="service-name">{perfume.name}</div>
                </div>
              ))
            ) : (
              <div className="loading-message">
                <p>Loading perfumes...</p>
              </div>
            )
          )}

          <div className="center-image">
            <img
              src={`${BASE_URL}/uploads/perfumes/center-perfume.png`}
              alt="Center Perfume Showcase"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Animation;
