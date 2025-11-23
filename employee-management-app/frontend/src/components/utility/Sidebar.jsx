import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiUserPlus, FiUsers, FiLogOut, FiMenu } from "react-icons/fi";

const menuItems = [
  {
    label: "View Employees",
    path: "/employees",
    icon: <FiUsers />,
  },
  {
    label: "Add Employee",
    path: "/employees/new",
    icon: <FiUserPlus />,
  },
];
const Sidebar = ({ userEmail, onLogout, collapsed, toggleSidebar }) => {
  const location = useLocation();

  return (
    <aside
      className={`fixed top-0 left-0 z-50 h-screen bg-white shadow-sm 
            transition-all duration-300 ease-in-out flex flex-col justify-between
            ${collapsed ? "w-[58px]" : "w-64"}
            `}
    >
      {/* Header */}
      <div>
        <div className="flex items-center justify-between px-4 py-4">
          {!collapsed && (
            <h1 className="text-lg font-semibold text-gray-800 tracking-tight">
              Employee App
            </h1>
          )}
          <button
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
            title="Toggle Sidebar"
            className="text-gray-500 hover:text-gray-800 transition-colors"
          >
            <FiMenu size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-4 space-y-1 px-2">
          {menuItems.map(({ path, label, icon }) => {
            const isActive = location.pathname === path;

            return (
              <Link
                key={path}
                to={path}
                className={`group flex items-center gap-3 px-3 py-2 text-sm rounded-lg 
                    transition-all duration-200 
                    ${
                      isActive
                        ? "bg-blue-100 text-blue-600 font-medium"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }
                    `}
              >
                <span className="text-[18px]">{icon}</span>
                {!collapsed && <span>{label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="px-4 py-4">
        {!collapsed && userEmail && (
          <div className="mb-2 text-xs text-gray-400 truncate">{userEmail}</div>
        )}
        <button
          onClick={onLogout}
          className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 transition-colors"
          title="Logout"
          aria-label="Logout"
        >
          <FiLogOut size={16} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
