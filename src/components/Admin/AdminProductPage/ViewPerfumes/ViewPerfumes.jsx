import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewPerfumes.css";

const ViewPerfumes = () => {
  const [perfumes, setPerfumes] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editedProductDetails, setEditedProductDetails] = useState({
    name: "",
    description: "",
    price: "",
    ml: "",
    category: "",
    newImage: null,
    previewImage: null,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/shopperfumes");
      setPerfumes(response.data);
    } catch (error) {
      console.error("Error fetching perfumes:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/shopperfumes/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting perfume:", error);
    }
  };

  const handleEdit = (perfume) => {
    setEditingProductId(perfume.id);
    setEditedProductDetails({
      name: perfume.name,
      description: perfume.description,
      price: perfume.price,
      ml: perfume.ml,
      category: perfume.category,
      newImage: null,
      previewImage: null,
    });
  };

  const handleSaveEditedProduct = async () => {
    const formData = new FormData();
    formData.append("name", editedProductDetails.name);
    formData.append("description", editedProductDetails.description);
    formData.append("price", editedProductDetails.price);
    formData.append("ml", editedProductDetails.ml);
    formData.append("category", editedProductDetails.category);

    if (editedProductDetails.newImage) {
      formData.append("image", editedProductDetails.newImage);
    }

    try {
      await axios.put(
        `http://localhost:3001/api/shopperfumes/${editingProductId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setEditingProductId(null);
      fetchProducts();
    } catch (error) {
      console.error("Error updating perfume:", error);
    }
  };

  return (
    <div className="view-products-container">
      <h2>View Perfumes</h2>
      {perfumes.map((perfume) => (
        <div key={perfume.id} className="product-card">
          {editingProductId === perfume.id ? (
            <div className="edit-section">
              <input
                type="text"
                value={editedProductDetails.name}
                onChange={(e) =>
                  setEditedProductDetails((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
              <textarea
                value={editedProductDetails.description}
                onChange={(e) =>
                  setEditedProductDetails((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
              <input
                type="number"
                value={editedProductDetails.price}
                onChange={(e) =>
                  setEditedProductDetails((prev) => ({
                    ...prev,
                    price: e.target.value,
                  }))
                }
              />
              <input
                type="text"
                value={editedProductDetails.ml}
                onChange={(e) =>
                  setEditedProductDetails((prev) => ({
                    ...prev,
                    ml: e.target.value,
                  }))
                }
              />
              <input
                type="text"
                value={editedProductDetails.category}
                onChange={(e) =>
                  setEditedProductDetails((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setEditedProductDetails((prev) => ({
                      ...prev,
                      newImage: file,
                      previewImage: URL.createObjectURL(file),
                    }));
                  }
                }}
              />
              {editedProductDetails.previewImage && (
                <img
                  src={editedProductDetails.previewImage}
                  alt="Preview"
                  className="preview-image"
                />
              )}
              <button onClick={handleSaveEditedProduct}>Save</button>
              <button onClick={() => setEditingProductId(null)}>Cancel</button>
            </div>
          ) : (
            <>
              <h3>{perfume.name}</h3>
              <p>{perfume.description}</p>
              <p>Price: ₹{perfume.price}</p>
              <p>Size: {perfume.ml}</p>
              <p>Category: {perfume.category}</p>
              <img
                src={`http://localhost:3001/uploads/${perfume.image}`}
                alt={perfume.name}
                className="product-image"
              />
              <div className="button-group">
                <button onClick={() => handleEdit(perfume)}>Edit</button>
                <button onClick={() => handleDelete(perfume.id)}>Delete</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ViewPerfumes;
