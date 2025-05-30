import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import perfumeAnimation from "../../assets/perfume.json";
import "./Loader.css";

const Loader = () => {
  const captions = [
    "Crafting luxury in every drop 💧",
    "Awaken your senses ✨",
    "Fragrance that speaks for you 🗣️",
    "Elegance bottled just for you 💖",
    "Smell unforgettable 🌸"
  ];

  const [captionIndex, setCaptionIndex] = useState(0);

  useEffect(() => {
    // Get index from localStorage
    const storedIndex = parseInt(localStorage.getItem("captionIndex")) || 0;
    setCaptionIndex(storedIndex);

    // Update for next reload
    const nextIndex = (storedIndex + 1) % captions.length;
    localStorage.setItem("captionIndex", nextIndex);
  }, []);

  return (
    <div className="loader-container">
      <div className="animation">
        <Lottie animationData={perfumeAnimation} loop />
      </div>
      <p className="caption">{captions[captionIndex]}</p>
    </div>
  );
};

export default Loader;
