import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Info,
  Briefcase,
  Zap,
  Package,
  Newspaper,
  Users,
  Mail,
  Layout,
  Settings,
  Star,
} from "lucide-react";

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: Home },
    { name: "Home Hero", path: "/admin/home-hero", icon: Home },
    { name: "Home About", path: "/admin/home-about", icon: Info },
    { name: "Strategic Advice", path: "/admin/strategic-advice", icon: Layout },
    { name: "News", path: "/admin/news", icon: Newspaper },
    { name: "Work In Action", path: "/admin/work-in-action", icon: Layout },
    { name: "About Page", path: "/admin/about", icon: Info },
    { name: "What Sets Us Apart", path: "/admin/what-sets-us-apart", icon: Star },
    { name: "Services", path: "/admin/services", icon: Briefcase },
    { name: "Technologies", path: "/admin/technologies", icon: Zap },
    { name: "Products", path: "/admin/products", icon: Package },
    { name: "Career", path: "/admin/career", icon: Users },
    { name: "Contact", path: "/admin/contact", icon: Mail },
    { name: "Settings", path: "/admin/settings", icon: Settings },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside
      className={`fixed left-0 top-16 h-[calc(100vh-84px)] bg-primary text-white transition-all duration-300 z-40 overflow-hidden border-r border-blue-900 w-64 ${isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 mt-5`}
    >
      <nav className="p-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => {
                if (isOpen) {
                  toggleSidebar();
                }
              }}
              className={`flex items-center gap-5 px-5 py-2 rounded-xl transition-all duration-200 ${active
                ? "bg-secondary text-primary font-bold shadow-lg"
                : "hover:bg-blue-800 text-white/90 hover:text-white"
                }`}
              title={item.name}
            >
              <Icon size={20} className="flex-shrink-0" />
              <span className="text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
