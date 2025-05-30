import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "./Hero.css";
import FlowerAnimation from "./FlowerAnimation";

const Hero = () => {
  const [slides, setSlides] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false); // Add state to track data load

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/hero');

        const data = await response.json();

        // Ensure exactly 3 slides
        if (data.length === 3) {
          setSlides(data);
        } else {
          console.error('Error: There should be exactly 3 slides for the hero section.');
        }

        // Mark data as loaded
        setIsDataLoaded(true);
      } catch (error) {
        console.error('Error fetching hero slides:', error);
      }
    };

    fetchSlides();
  }, []);

  // Check if there are enough slides for loop
  const slidesCount = slides.length;

  // Handle loop mode conditionally
  const loopEnabled = slidesCount > 2; // Enable loop only if there are enough slides

  return (
    <div className="hero-container">
      <FlowerAnimation />
      {isDataLoaded && ( // Only render Swiper after data is loaded
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={loopEnabled} // Enable loop only if there are enough slides
          slidesPerView={1} // Show 1 slide at a time
          slidesPerGroup={1} // Group 1 slide at a time
          centeredSlides={true} // Center the slides
          key={isDataLoaded ? 'loaded' : 'loading'} // Add key to force re-render
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="hero-content">
                <div className="hero-image-wrapper">
                  <img src={slide.image} alt={slide.title} className="hero-image" />
                </div>

                <div className="hero-text">
                  <h1 className="hero-title">{slide.title}</h1>
                  <h3 className="hero-subtitle">{slide.subtitle}</h3>
                  <p className="hero-desc">{slide.description}</p>

                  <Link to="/shop" className="hero-button">
                    Shop Now →
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default Hero;
