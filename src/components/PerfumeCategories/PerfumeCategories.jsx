import React from 'react';
import './PerfumeCategories.css';
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    title: 'For Him',
    description: 'Bold. Sophisticated. Timeless.',
    notes: ['Sandalwood', 'Leather', 'Oud', 'Vetiver'],
    image: '/perfumes/for-him.jpeg',
  },
  {
    title: 'For Her',
    description: 'Elegant. Alluring. Feminine.',
    notes: ['Rose', 'Jasmine', 'Vanilla', 'Peach'],
    image: '/perfumes/for-her.jpeg',
  },
  {
    title: 'Unisex',
    description: 'Balanced. Versatile. Modern.',
    notes: ['Citrus', 'Musk', 'Amber', 'Bergamot'],
    image: '/perfumes/unisex.jpeg',
  },
];

const PerfumeCategories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/shop?category=${category}`);
  };

  return (
    <section className="perfume-section">
      <h2 className="perfume-title">Discover by Category</h2>
      <div className="category-grid">
        {categories.map((category) => (
          <div
            key={category.title}
            className="category-card"
            onClick={() => handleCategoryClick(category.title)}
          >
            <img src={category.image} alt={category.title} className="category-image" />
            <h3 className="category-heading">{category.title}</h3>
            <p className="category-description">{category.description}</p>
            <ul className="category-notes">
              {category.notes.map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PerfumeCategories;
