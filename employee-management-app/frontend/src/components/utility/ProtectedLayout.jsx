import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import Sidebar from "./Sidebar";
import authUserAPI from "../../services/authUserAPI";

const ProtectedLayout = () => {
  const { user, setUser } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const toggleSidebar = () => setSidebarCollapsed((prev) => !prev);

  const handleLogout = async () => {
    try {
      await authUserAPI.logoutUser();
      setUser(null);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        userEmail={user?.email || ""}
        onLogout={handleLogout}
        collapsed={sidebarCollapsed}
        toggleSidebar={toggleSidebar}
      />

      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? "ml-[58px]" : "ml-64"
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default ProtectedLayout;
