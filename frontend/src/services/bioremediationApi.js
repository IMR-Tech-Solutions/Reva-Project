import authService from "../api/authService";

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

const bioremediationApi = {
  // =====================================================================
  // Public: Get all bioremediation data
  // =====================================================================
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/bioremediation`);
    if (!response.ok) throw new Error("Failed to fetch bioremediation data");
    return response.json();
  },

  // =====================================================================
  // Admin: Update section content (FormData with optional image uploads)
  // =====================================================================
  updateContent: async (contentData, files = {}) => {
    const formData = new FormData();
    Object.keys(contentData).forEach((key) => {
      if (contentData[key] !== null && contentData[key] !== undefined) {
        formData.append(key, contentData[key]);
      }
    });
    // Attach file uploads if provided
    if (files.hero_bg_file) formData.append("hero_bg_file", files.hero_bg_file);
    if (files.what_image_file) formData.append("what_image_file", files.what_image_file);
    if (files.europe_profile_file) formData.append("europe_profile_file", files.europe_profile_file);

    const response = await fetch(`${API_BASE_URL}/bioremediation/content`, {
      method: "PUT",
      headers: { ...authService.getAuthHeader() },
      body: formData,
    });
    if (!response.ok) throw new Error("Failed to update bioremediation content");
    return response.json();
  },

  // =====================================================================
  // Admin: Upload a bioremediation image
  // =====================================================================
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const response = await fetch(`${API_BASE_URL}/bioremediation/upload-image`, {
      method: "POST",
      headers: { ...authService.getAuthHeader() },
      body: formData,
    });
    if (!response.ok) throw new Error("Failed to upload image");
    return response.json();
  },

  // =====================================================================
  // Admin: Generic CRUD for items (type = hero-badges, features, etc.)
  // =====================================================================
  getItems: async (itemType) => {
    const response = await fetch(`${API_BASE_URL}/bioremediation/${itemType}`, {
      headers: { ...authService.getAuthHeader() },
    });
    if (!response.ok) throw new Error(`Failed to fetch ${itemType}`);
    return response.json();
  },

  createItem: async (itemType, data) => {
    const response = await fetch(`${API_BASE_URL}/bioremediation/${itemType}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authService.getAuthHeader(),
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`Failed to create ${itemType}`);
    return response.json();
  },

  updateItem: async (itemType, id, data) => {
    const response = await fetch(`${API_BASE_URL}/bioremediation/${itemType}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...authService.getAuthHeader(),
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`Failed to update ${itemType}`);
    return response.json();
  },

  deleteItem: async (itemType, id) => {
    const response = await fetch(`${API_BASE_URL}/bioremediation/${itemType}/${id}`, {
      method: "DELETE",
      headers: { ...authService.getAuthHeader() },
    });
    if (!response.ok) throw new Error(`Failed to delete ${itemType}`);
    return response.json();
  },
};

export default bioremediationApi;
