import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminProfilePanel.css";

const AdminProfilePanel = ({ closePanel }) => {
  const [admins, setAdmins] = useState([
    { name: "Admin Name" }
  ]);

  const navigate = useNavigate();

  const handleNameChange = (index, newName) => {
    const updatedAdmins = [...admins];
    updatedAdmins[index].name = newName;
    setAdmins(updatedAdmins);
  };

  const handleAddAdmin = () => {
    setAdmins([...admins, { name: "" }]);
  };

  const handleSaveAdmin = (index) => {
    alert(`Admin "${admins[index].name}" saved!`);
    // Add actual save logic here
  };

  const handleCancelAddAdmin = () => {
    setAdmins(admins.slice(0, -1));
  };

  const handleLogout = () => {
    // Add actual logout logic here (e.g., clearing auth state)
    navigate("/admin/login");
  };

  return (
    <div className="admin-profile-panel">
      <button className="close-btn" onClick={closePanel}>✕</button>

      <div className="profile-section">
        {admins.map((admin, index) => (
          <div className="admin-profile-block" key={index}>
            <div className="admin-name-edit">
              <label>Admin Name:</label>
              <input
                type="text"
                value={admin.name}
                onChange={(e) => handleNameChange(index, e.target.value)}
                placeholder="Enter admin name"
              />
            </div>

            <div className="admin-actions">
              <button
                className="save-admin-btn"
                onClick={() => handleSaveAdmin(index)}
              >
                Save
              </button>
              {index === admins.length - 1 && admin.name === "" && (
                <button
                  className="cancel-add-btn"
                  onClick={handleCancelAddAdmin}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        ))}

        <button className="add-admin-btn" onClick={handleAddAdmin}>
          ➕ Add Another Admin
        </button>
      </div>

      <div className="logout-container">
        <button className="logout-btn" onClick={handleLogout}>
          🔓 Logout
        </button>
      </div>
    </div>
  );
};

export default AdminProfilePanel;
