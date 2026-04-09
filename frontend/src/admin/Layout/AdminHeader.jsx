import React, { useState } from "react";
import { Menu, X, LogOut, Bell, User } from "lucide-react";
import authService from "../../api/authService";
import { useNavigate } from "react-router-dom";

const AdminHeader = ({ toggleSidebar, sidebarOpen }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate("/admin/login");
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-3 sm:px-4 md:px-6 py-3 sm:py-4">
        {/* Left: Logo and Menu */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-700 lg:hidden"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? (
              <X size={20} />
            ) : (
              <Menu size={20} />
            )}
          </button>
          <div>
            <h1 className="text-lg sm:text-2xl font-bold text-primary">Reva</h1>
            <p className="text-xs text-gray-500 hidden sm:block">Admin Dashboard</p>
          </div>
        </div>

        {/* Right: Notifications and User Menu */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Notifications */}
          {/* <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-700 hidden sm:inline-flex">
            <Bell size={18} />
            <span className="absolute top-1 right-1 bg-secondary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
              3
            </span>
          </button> */}

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-1 sm:gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white flex-shrink-0">
                <User size={14} />
              </div>
              <span className="text-xs sm:text-sm font-medium text-gray-700 hidden sm:inline">Admin</span>
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-40 sm:w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 text-sm">
                <div className="p-3 border-b border-gray-200">
                  <p className="text-xs sm:text-sm font-medium text-gray-900">{user?.full_name || "Admin User"}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.email || "admin@reva.com"}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
