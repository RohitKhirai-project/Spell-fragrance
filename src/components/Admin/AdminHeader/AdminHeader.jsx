import React, { useState } from "react";
import './AdminHeader.css';
import AdminProfilePanel from "./AdminProfilePanel";

const AdminHeader = ({ toggleSidebar }) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  return (
    <>
      <div className="admin-header">
        <div className="menu-toggle" onClick={toggleSidebar}>☰</div>
        <h1>Admin Dashboard</h1>
        <div className="header-right">
          <div className="notification-icon">🔔</div>
          <div className="user-avatar" onClick={togglePanel}>U</div>
        </div>
      </div>

      {isPanelOpen && <AdminProfilePanel closePanel={togglePanel} />}
    </>
  );
};

export default AdminHeader;
