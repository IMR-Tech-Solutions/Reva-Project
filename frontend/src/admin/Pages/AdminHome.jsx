import React, { useState, useEffect } from "react";
import { TrendingUp, Users, FileText, MessageSquare, Briefcase, Cpu, Loader2 } from "lucide-react";
import authService from "../../api/authService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const DashboardHome = () => {
  const navigate = useNavigate();
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await authService.getDashboardStats();
        setStatsData(data);
      } catch (error) {
        console.error("Dashboard stats error:", error);
        toast.error("Failed to load dashboard statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const stats = [
    {
      label: "News Articles",
      value: statsData?.total_news || "0",
      icon: TrendingUp,
      color: "bg-blue-100",
      iconColor: "text-primary",
      path: "/admin/news"
    },
    {
      label: "Products",
      value: statsData?.total_products || "0",
      icon: Cpu,
      color: "bg-yellow-100",
      iconColor: "text-secondary",
      path: "/admin/products"
    },
    {
      label: "Technologies",
      value: statsData?.total_technologies || "0",
      icon: Briefcase,
      color: "bg-green-100",
      iconColor: "text-green-600",
      path: "/admin/technologies"
    },
    {
      label: "Messages",
      value: statsData?.unread_messages !== undefined ? `${statsData.unread_messages} Unread` : "0",
      icon: MessageSquare,
      color: "bg-purple-100",
      iconColor: "text-purple-600",
      path: "/admin/contact"
    },
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <p className="text-gray-600 font-medium">Loading Dashboard Overview...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold text-primary">Dashboard <span className="text-secondary">Overview</span></h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening on your site.</p>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-sm text-gray-400">Total Admins</p>
          <p className="text-xl font-bold text-primary">{statsData?.total_admins || 1}</p>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              onClick={() => navigate(stat.path)}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium group-hover:text-primary transition-colors">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-4 rounded-xl group-hover:scale-110 transition-transform`}>
                  <Icon size={28} className={stat.iconColor} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity Placeholder (Future improvement: Fetch real activity) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-primary">Pending <span className="text-secondary">Items</span></h2>
          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold uppercase tracking-wider">
            Action Required
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="p-3 bg-red-100 text-red-600 rounded-full mr-4">
              <MessageSquare size={20} />
            </div>
            <div>
              <p className="font-bold text-gray-900">{statsData?.unread_messages || 0} Unread Messages</p>
              <button
                onClick={() => navigate("/admin/contact")}
                className="text-primary text-sm font-semibold hover:underline"
              >
                View Messages &rarr;
              </button>
            </div>
          </div>
          <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-full mr-4">
              <Briefcase size={20} />
            </div>
            <div>
              <p className="font-bold text-gray-900">{statsData?.pending_applications || 0} Pending Applications</p>
              <button
                onClick={() => navigate("/admin/career")}
                className="text-primary text-sm font-semibold hover:underline"
              >
                Review Applications &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-primary to-blue-900 text-white rounded-xl p-8 shadow-lg shadow-blue-900/20 relative overflow-hidden group">
          <TrendingUp className="absolute -right-4 -bottom-4 w-32 h-32 text-white/10 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-bold mb-2">Manage News</h3>
          <p className="text-blue-100/80 mb-6 text-sm">Keep your audience updated with the latest news and industry trends.</p>
          <button
            onClick={() => navigate("/admin/news")}
            className="bg-secondary text-primary px-6 py-2.5 rounded-lg font-bold hover:bg-yellow-500 transition-all hover:shadow-lg active:scale-95"
          >
            Go to News
          </button>
        </div>

        <div className="bg-gradient-to-br from-secondary to-yellow-600 text-primary rounded-xl p-8 shadow-lg shadow-yellow-600/20 relative overflow-hidden group">
          <Cpu className="absolute -right-4 -bottom-4 w-32 h-32 text-primary/10 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-bold mb-2">Manage Products</h3>
          <p className="text-yellow-900/80 mb-6 text-sm">Control your product catalog, features, and application details.</p>
          <button
            onClick={() => navigate("/admin/products")}
            className="bg-primary text-white px-6 py-2.5 rounded-lg font-bold hover:bg-blue-900 transition-all hover:shadow-lg active:scale-95"
          >
            Go to Products
          </button>
        </div>

        <div className="bg-gradient-to-br from-green-600 to-teal-700 text-white rounded-xl p-8 shadow-lg shadow-green-900/20 relative overflow-hidden group">
          <MessageSquare className="absolute -right-4 -bottom-4 w-32 h-32 text-white/10 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-bold mb-2">Communication</h3>
          <p className="text-green-100/80 mb-6 text-sm">Respond to customer inquiries and manage your contact settings.</p>
          <button
            onClick={() => navigate("/admin/contact")}
            className="bg-white text-green-700 px-6 py-2.5 rounded-lg font-bold hover:bg-gray-100 transition-all hover:shadow-lg active:scale-95"
          >
            View Messages
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
