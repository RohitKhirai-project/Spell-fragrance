import React, { useState } from 'react';
import axios from 'axios';
import './AddPerfume.css';

const AddPerfume = () => {
  const [perfumeData, setPerfumeData] = useState({
    name: '',
    description: '',
    price: '',
    image: null,
    sizes: { '15ml': false, '20ml': false, '30ml': false, '50ml': false },
    category: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setPerfumeData({ ...perfumeData, image: files[0] });
    } else {
      setPerfumeData({ ...perfumeData, [name]: value });
    }
  };

  const handleSizeChange = (e) => {
    const { name, checked } = e.target;
    setPerfumeData((prev) => ({
      ...prev,
      sizes: { ...prev.sizes, [name]: checked },
    }));
  };

  const handleCheckAll = (e) => {
    const checked = e.target.checked;
    const updatedSizes = Object.keys(perfumeData.sizes).reduce((acc, size) => {
      acc[size] = checked;
      return acc;
    }, {});
    setPerfumeData((prev) => ({ ...prev, sizes: updatedSizes }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedSizes = Object.keys(perfumeData.sizes)
      .filter((size) => perfumeData.sizes[size])
      .join(', ');  // Join the selected sizes as a string

    const formData = new FormData();
    formData.append('name', perfumeData.name);
    formData.append('description', perfumeData.description);
    formData.append('price', perfumeData.price);
    formData.append('image', perfumeData.image);  // Image file
    formData.append('sizes', selectedSizes);  // Send sizes as a comma-separated string
    formData.append('category', perfumeData.category);

    try {
      const res = await axios.post(
        'http://localhost:3001/api/shopperfumes/addshopperfume',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      alert('Perfume added successfully');
      setPerfumeData({
        name: '',
        description: '',
        price: '',
        image: null,
        sizes: { '15ml': false, '20ml': false, '30ml': false, '50ml': false },
        category: '',
      });
    } catch (err) {
      console.error('Error adding perfume:', err);
      alert('Failed to add perfume');
    }
  };

  const allSelected = Object.values(perfumeData.sizes).every((val) => val);
  const selectedSizesStr = Object.keys(perfumeData.sizes)
    .filter((size) => perfumeData.sizes[size])
    .join(', ');

  return (
    <div className="admin-product-page">
      <h2>Add New Perfume</h2>
      <form className="product-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="name"
          placeholder="Perfume Name"
          value={perfumeData.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Product Description"
          value={perfumeData.description}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={perfumeData.price}
          onChange={handleChange}
          required
        />

        {/* Sizes */}
        <div className="size-options">
          <label>
            <input type="checkbox" checked={allSelected} onChange={handleCheckAll} />
            Check All
          </label>
          {['15ml', '20ml', '30ml', '50ml'].map((size) => (
            <label key={size}>
              <input
                type="checkbox"
                name={size}
                checked={perfumeData.sizes[size]}
                onChange={handleSizeChange}
              />
              {size}
            </label>
          ))}
        </div>

        {selectedSizesStr && <h3>Available Sizes for Users: {selectedSizesStr}</h3>}

        {/* Category */}
        <div className="category-select-container">
          <label htmlFor="category">Select Category</label>
          <select
            name="category"
            id="category"
            value={perfumeData.category}
            onChange={handleChange}
            required
          >
            <option value="">-- Choose Category --</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        {/* Image Upload */}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          required
        />

        <button type="submit">Add Perfume</button>
      </form>
    </div>
  );
};

export default AddPerfume;
