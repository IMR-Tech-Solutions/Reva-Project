import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

const authService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      if (response.data.access_token) {
        localStorage.setItem("admin_token", response.data.access_token);
        localStorage.setItem("admin_user", JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data?.detail || "Login failed";
    }
  },

  logout: () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem("admin_user");
    return userStr ? JSON.parse(userStr) : null;
  },

  getToken: () => {
    return localStorage.getItem("admin_token");
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("admin_token");
  },

  // Helper to get axios config with token
  getAuthHeader: () => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      return { Authorization: `Bearer ${token}` };
    }
    return {};
  },

  getDashboardStats: async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await axios.get(`${API_URL}/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.detail || "Failed to fetch stats";
    }
  }
};

export default authService;
