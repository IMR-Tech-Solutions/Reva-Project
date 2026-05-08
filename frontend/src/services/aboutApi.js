import authService from "../api/authService";

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

const aboutApi = {
  // Get all about data (Public)
  getAboutFull: async () => {
    const response = await fetch(`${API_BASE_URL}/about`);
    if (!response.ok) throw new Error("Failed to fetch about data");
    return response.json();
  },

  // Get only content
  getAboutContent: async () => {
    const response = await fetch(`${API_BASE_URL}/about/content`);
    if (!response.ok) throw new Error("Failed to fetch about content");
    return response.json();
  },

  // Update content
  updateAboutContent: async (contentData) => {
    const formData = new FormData();
    Object.keys(contentData).forEach(key => {
      if (["highlights", "core_pills", "advantages"].includes(key)) {
        formData.append(key, JSON.stringify(contentData[key]));
      } else if (contentData[key] !== null && contentData[key] !== undefined) {
        formData.append(key, contentData[key]);
      }
    });

    const response = await fetch(`${API_BASE_URL}/about/content`, {
      method: "PUT",
      headers: {
        ...authService.getAuthHeader(),
      },
      body: formData,
    });
    if (!response.ok) throw new Error("Failed to update content");
    return response.json();
  },

  // Team Members
  getTeamMembers: async () => {
    const response = await fetch(`${API_BASE_URL}/about/team`);
    if (!response.ok) throw new Error("Failed to fetch team members");
    return response.json();
  },

  createTeamMember: async (formData) => {
    const response = await fetch(`${API_BASE_URL}/about/team`, {
      method: "POST",
      headers: {
        ...authService.getAuthHeader(),
        // Note: No Content-Type header for FormData, browser handles it
      },
      body: formData,
    });
    if (!response.ok) throw new Error("Failed to create team member");
    return response.json();
  },

  updateTeamMember: async (id, formData) => {
    const response = await fetch(`${API_BASE_URL}/about/team/${id}`, {
      method: "PUT",
      headers: {
        ...authService.getAuthHeader(),
      },
      body: formData,
    });
    if (!response.ok) throw new Error("Failed to update team member");
    return response.json();
  },

  deleteTeamMember: async (id) => {
    const response = await fetch(`${API_BASE_URL}/about/team/${id}`, {
      method: "DELETE",
      headers: { ...authService.getAuthHeader() },
    });
    if (!response.ok) throw new Error("Failed to delete team member");
    return response.json();
  },

  // Company Values
  createValue: async (data) => {
    const response = await fetch(`${API_BASE_URL}/about/values`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authService.getAuthHeader(),
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to create value");
    return response.json();
  },

  updateValue: async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/about/values/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...authService.getAuthHeader(),
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to update value");
    return response.json();
  },

  deleteValue: async (id) => {
    const response = await fetch(`${API_BASE_URL}/about/values/${id}`, {
      method: "DELETE",
      headers: { ...authService.getAuthHeader() },
    });
    if (!response.ok) throw new Error("Failed to delete value");
    return response.json();
  },

  // Differentiators
  createDifferentiator: async (data) => {
    const response = await fetch(`${API_BASE_URL}/about/differentiators`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authService.getAuthHeader(),
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to create differentiator");
    return response.json();
  },

  updateDifferentiator: async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/about/differentiators/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...authService.getAuthHeader(),
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to update differentiator");
    return response.json();
  },

  deleteDifferentiator: async (id) => {
    const response = await fetch(`${API_BASE_URL}/about/differentiators/${id}`, {
      method: "DELETE",
      headers: { ...authService.getAuthHeader() },
    });
    if (!response.ok) throw new Error("Failed to delete differentiator");
    return response.json();
  },

  // Testimonials
  getTestimonials: async () => {
    const response = await fetch(`${API_BASE_URL}/about/testimonials`);
    if (!response.ok) throw new Error("Failed to fetch testimonials");
    return response.json();
  },

  createTestimonial: async (data) => {
    const response = await fetch(`${API_BASE_URL}/about/testimonials`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authService.getAuthHeader(),
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to create testimonial");
    return response.json();
  },

  updateTestimonial: async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/about/testimonials/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...authService.getAuthHeader(),
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to update testimonial");
    return response.json();
  },

  deleteTestimonial: async (id) => {
    const response = await fetch(`${API_BASE_URL}/about/testimonials/${id}`, {
      method: "DELETE",
      headers: { ...authService.getAuthHeader() },
    });
    if (!response.ok) throw new Error("Failed to delete testimonial");
    return response.json();
  },

  // =====================================================================
  // What Sets Us Apart
  // =====================================================================

  // Public: Get combined content + active items
  getWhatSetsUsApart: async () => {
    const response = await fetch(`${API_BASE_URL}/about/what-sets-us-apart`);
    if (!response.ok) throw new Error("Failed to fetch What Sets Us Apart data");
    return response.json();
  },

  // Admin: Update section content (label, heading, description)
  updateWhatSetsUsApartContent: async (data) => {
    const response = await fetch(`${API_BASE_URL}/about/what-sets-us-apart`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...authService.getAuthHeader(),
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to update section content");
    return response.json();
  },

  // Admin: Get ALL items (including inactive)
  getWhatSetsUsApartItems: async () => {
    const response = await fetch(`${API_BASE_URL}/about/what-sets-us-apart/items`, {
      headers: { ...authService.getAuthHeader() },
    });
    if (!response.ok) throw new Error("Failed to fetch feature items");
    return response.json();
  },

  // Admin: Create a new feature item
  createWhatSetsUsApartItem: async (data) => {
    const response = await fetch(`${API_BASE_URL}/about/what-sets-us-apart/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authService.getAuthHeader(),
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to create feature item");
    return response.json();
  },

  // Admin: Update a feature item
  updateWhatSetsUsApartItem: async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/about/what-sets-us-apart/items/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...authService.getAuthHeader(),
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to update feature item");
    return response.json();
  },

  // Admin: Delete a feature item
  deleteWhatSetsUsApartItem: async (id) => {
    const response = await fetch(`${API_BASE_URL}/about/what-sets-us-apart/items/${id}`, {
      method: "DELETE",
      headers: { ...authService.getAuthHeader() },
    });
    if (!response.ok) throw new Error("Failed to delete feature item");
    return response.json();
  },
};

export default aboutApi;

