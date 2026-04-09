import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import AdminFooter from "./AdminFooter";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <AdminHeader toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />

      {/* Main Content Area */}
      <div className="flex flex-1 relative pt-16">
        {/* Sidebar */}
        <AdminSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Overlay for mobile when sidebar is open */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden mt-16"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden transition-all duration-300 lg:ml-64">
          <div className="p-4 sm:p-6 md:p-8">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Footer */}
      <div className="transition-all duration-300 lg:ml-64">
        <AdminFooter />
      </div>
    </div>
  );
};

export default AdminLayout;
