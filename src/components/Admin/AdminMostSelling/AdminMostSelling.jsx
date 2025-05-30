import React, { useEffect, useState } from 'react';
import './AdminMostSelling.css';

const AdminMostSelling = () => {
  const [perfumes, setPerfumes] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/mostselling')
      .then((res) => res.json())
      .then((data) => setPerfumes(data))
      .catch((err) => console.error('Fetch error:', err));
  }, []);

  const handleEdit = (index) => {
    setEditingIndex(index);
    setSelectedImage(null);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updated = [...perfumes];
    updated[index][name] = value;
    setPerfumes(updated);
  };

  const handleFileChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleSave = (index) => {
    const perfume = perfumes[index];
    const formData = new FormData();

    formData.append('id', perfume.id);
    formData.append('name', perfume.name);
    formData.append('price', perfume.price);
    if (selectedImage) {
      formData.append('image', selectedImage);
    }

    fetch('http://localhost:3001/api/mostselling/update', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message || 'Updated!');
        setEditingIndex(null);
      })
      .catch((err) => console.error('Save failed:', err));
  };

  return (
    <div className="admin-most-selling">
      <h2>Manage Most Selling Perfumes</h2>
      <div className="perfume-list">
        {perfumes.map((perfume, index) => (
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

            {editingIndex === index ? (
              <>
                <input
                  name="name"
                  value={perfume.name}
                  onChange={(e) => handleInputChange(e, index)}
                />
                <input
                  name="price"
                  value={perfume.price}
                  onChange={(e) => handleInputChange(e, index)}
                />
                <input type="file" onChange={handleFileChange} />
                <button className="save-btn" onClick={() => handleSave(index)}>Save</button>
              </>
            ) : (
              <>
                <h3>{perfume.name}</h3>
                <p>{perfume.price}</p>
                <button className="edit-btn" onClick={() => handleEdit(index)}>Edit</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMostSelling;
