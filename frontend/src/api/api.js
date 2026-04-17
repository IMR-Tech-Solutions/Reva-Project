import authService from "./authService";

const API_ROOT = import.meta.env.VITE_API_URL;
const API_BASE_URL = API_ROOT; // Root domain for images
const API_LOGIC_URL = `${API_ROOT}/api`; // Prefixed root for API logic

const api = {
  // =====================================================================
  // SERVICES MODULE API
  // =====================================================================

  // --- Public ---
  getActiveServices: async () => {
    const response = await fetch(`${API_LOGIC_URL}/services`);
    if (!response.ok) throw new Error("Failed to fetch services");
    return response.json();
  },

  getServiceBySlug: async (slug) => {
    const response = await fetch(`${API_LOGIC_URL}/services/${slug}`);
    if (!response.ok) throw new Error("Failed to fetch service");
    return response.json();
  },

  // --- Admin Services ---
  getAdminServices: async () => {
    const response = await fetch(`${API_LOGIC_URL}/admin/services`, {
      headers: { ...authService.getAuthHeader() },
    });
    if (!response.ok) throw new Error("Failed to fetch services");
    return response.json();
  },

  getAdminService: async (id) => {
    const response = await fetch(`${API_LOGIC_URL}/admin/services/${id}`, {
      headers: { ...authService.getAuthHeader() },
    });
    if (!response.ok) throw new Error("Failed to fetch service");
    return response.json();
  },

  createService: async (serviceData) => {
    const response = await fetch(`${API_LOGIC_URL}/admin/services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authService.getAuthHeader(),
      },
      body: JSON.stringify(serviceData),
    });
    if (!response.ok) throw new Error("Failed to create service");
    return response.json();
  },

  updateService: async (id, serviceData) => {
    const response = await fetch(`${API_LOGIC_URL}/admin/services/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...authService.getAuthHeader(),
      },
      body: JSON.stringify(serviceData),
    });
    if (!response.ok) throw new Error("Failed to update service");
    return response.json();
  },

  deleteService: async (id) => {
    const response = await fetch(`${API_LOGIC_URL}/admin/services/${id}`, {
      method: "DELETE",
      headers: { ...authService.getAuthHeader() },
    });
    if (!response.ok) throw new Error("Failed to delete service");
    return response.json();
  },

  reorderServices: async (orderedIds) => {
    const response = await fetch(`${API_LOGIC_URL}/admin/services/reorder`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...authService.getAuthHeader(),
      },
      body: JSON.stringify(orderedIds),
    });
    if (!response.ok) throw new Error("Failed to reorder services");
    return response.json();
  },

  // --- Admin Sections ---
  createSection: async (serviceId, sectionData) => {
    const response = await fetch(`${API_LOGIC_URL}/admin/services/${serviceId}/sections`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authService.getAuthHeader(),
      },
      body: JSON.stringify(sectionData),
    });
    if (!response.ok) throw new Error("Failed to create section");
    return response.json();
  },

  updateSection: async (sectionId, sectionData) => {
    const response = await fetch(`${API_LOGIC_URL}/admin/sections/${sectionId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...authService.getAuthHeader(),
      },
      body: JSON.stringify(sectionData),
    });
    if (!response.ok) throw new Error("Failed to update section");
    return response.json();
  },

  deleteSection: async (sectionId) => {
    const response = await fetch(`${API_LOGIC_URL}/admin/sections/${sectionId}`, {
      method: "DELETE",
      headers: { ...authService.getAuthHeader() },
    });
    if (!response.ok) throw new Error("Failed to delete section");
    return response.json();
  },

  reorderSections: async (serviceId, orderedIds) => {
    const response = await fetch(`${API_LOGIC_URL}/admin/services/${serviceId}/sections/reorder`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...authService.getAuthHeader(),
      },
      body: JSON.stringify(orderedIds),
    });
    if (!response.ok) throw new Error("Failed to reorder sections");
    return response.json();
  },

  // --- Admin Items ---
  createItem: async (sectionId, itemData) => {
    const response = await fetch(`${API_LOGIC_URL}/admin/sections/${sectionId}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authService.getAuthHeader(),
      },
      body: JSON.stringify(itemData),
    });
    if (!response.ok) throw new Error("Failed to create item");
    return response.json();
  },

  updateItem: async (itemId, itemData) => {
    const response = await fetch(`${API_LOGIC_URL}/admin/items/${itemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...authService.getAuthHeader(),
      },
      body: JSON.stringify(itemData),
    });
    if (!response.ok) throw new Error("Failed to update item");
    return response.json();
  },

  deleteItem: async (itemId) => {
    const response = await fetch(`${API_LOGIC_URL}/admin/items/${itemId}`, {
      method: "DELETE",
      headers: { ...authService.getAuthHeader() },
    });
    if (!response.ok) throw new Error("Failed to delete item");
    return response.json();
  },

  // --- Service Image Upload ---
  uploadServiceImage: async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const response = await fetch(`${API_LOGIC_URL}/admin/services/upload-image`, {
      method: "POST",
      headers: { ...authService.getAuthHeader() },
      body: formData,
    });
    if (!response.ok) throw new Error("Failed to upload image");
    return response.json();
  },

  // News
  getNews: async () => {
    const response = await fetch(`${API_LOGIC_URL}/news`);
    if (!response.ok) throw new Error("Failed to fetch news");
    return response.json();
  },

  getNewsById: async (id) => {
    const response = await fetch(`${API_LOGIC_URL}/news/${id}`);
    if (!response.ok) throw new Error("Failed to fetch news article");
    return response.json();
  },

  createNews: async (formData) => {
    const response = await fetch(`${API_LOGIC_URL}/news`, {
      method: "POST",
      headers: { ...authService.getAuthHeader() },
      body: formData,
    });
    if (!response.ok) throw new Error("Failed to create news article");
    return response.json();
  },

  updateNews: async (id, formData) => {
    const response = await fetch(`${API_LOGIC_URL}/news/${id}`, {
      method: "PUT",
      headers: { ...authService.getAuthHeader() },
      body: formData,
    });
    if (!response.ok) throw new Error("Failed to update news article");
    return response.json();
  },

  deleteNews: async (id) => {
    const response = await fetch(`${API_LOGIC_URL}/news/${id}`, {
      method: "DELETE",
      headers: { ...authService.getAuthHeader() },
    });
    if (!response.ok) throw new Error("Failed to delete news article");
    return response.json();
  },

  // Technologies
  getTechnologies: async () => {
    const response = await fetch(`${API_LOGIC_URL}/technologies`);
    if (!response.ok) throw new Error("Failed to fetch technologies");
    return response.json();
  },

  createTechnology: async (formData) => {
    const response = await fetch(`${API_LOGIC_URL}/technologies`, {
      method: "POST",
      headers: { ...authService.getAuthHeader() },
      body: formData,
    });
    if (!response.ok) throw new Error("Failed to create technology");
    return response.json();
  },

  updateTechnology: async (id, formData) => {
    const response = await fetch(`${API_LOGIC_URL}/technologies/${id}`, {
      method: "PUT",
      headers: { ...authService.getAuthHeader() },
      body: formData,
    });
    if (!response.ok) throw new Error("Failed to update technology");
    return response.json();
  },

  deleteTechnology: async (id) => {
    const response = await fetch(`${API_LOGIC_URL}/technologies/${id}`, {
      method: "DELETE",
      headers: { ...authService.getAuthHeader() },
    });
    if (!response.ok) throw new Error("Failed to delete technology");
    return response.json();
  },

  // Products
  getProducts: async () => {
    const response = await fetch(`${API_LOGIC_URL}/products`);
    if (!response.ok) throw new Error("Failed to fetch products");
    return response.json();
  },

  createProduct: async (formData) => {
    const response = await fetch(`${API_LOGIC_URL}/products`, {
      method: "POST",
      headers: { ...authService.getAuthHeader() },
      body: formData,
    });
    if (!response.ok) throw new Error("Failed to create product");
    return response.json();
  },

  updateProduct: async (id, formData) => {
    const response = await fetch(`${API_LOGIC_URL}/products/${id}`, {
      method: "PUT",
      headers: { ...authService.getAuthHeader() },
      body: formData,
    });
    if (!response.ok) throw new Error("Failed to update product");
    return response.json();
  },

  deleteProduct: async (id) => {
    const response = await fetch(`${API_LOGIC_URL}/products/${id}`, {
      method: "DELETE",
      headers: { ...authService.getAuthHeader() },
    });
    if (!response.ok) throw new Error("Failed to delete product");
    return response.json();
  },

  // Career Positions
  getPositions: async () => {
    const response = await fetch(`${API_LOGIC_URL}/career/positions`);
    if (!response.ok) throw new Error("Failed to fetch career positions");
    return response.json();
  },

  createPosition: async (positionData) => {
    const response = await fetch(`${API_LOGIC_URL}/career/positions`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        ...authService.getAuthHeader() 
      },
      body: JSON.stringify(positionData),
    });
    if (!response.ok) throw new Error("Failed to create job position");
    return response.json();
  },

  updatePosition: async (id, positionData) => {
    const response = await fetch(`${API_LOGIC_URL}/career/positions/${id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        ...authService.getAuthHeader() 
      },
      body: JSON.stringify(positionData),
    });
    if (!response.ok) throw new Error("Failed to update job position");
    return response.json();
  },

  deletePosition: async (id) => {
    const response = await fetch(`${API_LOGIC_URL}/career/positions/${id}`, {
      method: "DELETE",
      headers: { ...authService.getAuthHeader() },
    });
    if (!response.ok) throw new Error("Failed to delete job position");
    return response.json();
  },

  // Applications
  getApplications: async () => {
    const response = await fetch(`${API_LOGIC_URL}/career/applications`, {
      headers: { ...authService.getAuthHeader() },
    });
    if (!response.ok) throw new Error("Failed to fetch applications");
    return response.json();
  },

  submitApplication: async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });

    const response = await fetch(`${API_LOGIC_URL}/career/applications`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) throw new Error("Failed to submit application");
    return response.json();
  },

  updateApplicationStatus: async (id, status) => {
    const response = await fetch(`${API_LOGIC_URL}/career/applications/${id}/status?status=${status}`, {
      method: "PATCH",
      headers: { ...authService.getAuthHeader() },
    });
    if (!response.ok) throw new Error("Failed to update application status");
    return response.json();
  },

  deleteApplication: async (id) => {
    const response = await fetch(`${API_LOGIC_URL}/career/applications/${id}`, {
      method: "DELETE",
      headers: { ...authService.getAuthHeader() },
    });
    if (!response.ok) throw new Error("Failed to delete application");
    return response.json();
  },

  downloadResume: async (applicationId) => {
    const response = await fetch(`${API_LOGIC_URL}/career/applications/${applicationId}/download-resume`, {
      headers: { ...authService.getAuthHeader() },
    });
    if (!response.ok) throw new Error("Failed to download resume");
    
    // Handle Blob for file download
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resume_${applicationId}.pdf`; 
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  },

  // Career Content
  getCareerContent: async () => {
    const response = await fetch(`${API_LOGIC_URL}/career/content`);
    if (!response.ok) throw new Error("Failed to fetch career content");
    return response.json();
  },

  updateCareerContent: async (contentData) => {
    const formData = new FormData();
    Object.keys(contentData).forEach(key => {
      if (key === 'specs' || key === 'benefits') {
        formData.append(key, JSON.stringify(contentData[key]));
      } else if (contentData[key] !== null && contentData[key] !== undefined) {
        formData.append(key, contentData[key]);
      }
    });

    const response = await fetch(`${API_LOGIC_URL}/career/content`, {
      method: "PUT",
      headers: { ...authService.getAuthHeader() },
      body: formData,
    });
    if (!response.ok) throw new Error("Failed to update career content");
    return response.json();
  },

  // Home About
  getHomeAboutContent: async () => {
    const response = await fetch(`${API_LOGIC_URL}/home/about`);
    if (!response.ok) throw new Error("Failed to fetch home about content");
    return response.json();
  },

  updateHomeAboutContent: async (contentData) => {
    const formData = new FormData();
    Object.keys(contentData).forEach(key => {
      if (key === "pillars") {
        formData.append(key, JSON.stringify(contentData[key]));
      } else if (contentData[key] !== null && contentData[key] !== undefined) {
        formData.append(key, contentData[key]);
      }
    });

    const response = await fetch(`${API_LOGIC_URL}/home/about`, {
      method: "PUT",
      headers: { ...authService.getAuthHeader() },
      body: formData,
    });
    if (!response.ok) throw new Error("Failed to update home about content");
    return response.json();
  },
  
  // Strategic Advice
  getStrategicAdvice: async () => {
    const response = await fetch(`${API_LOGIC_URL}/home/strategic-advice`);
    if (!response.ok) throw new Error("Failed to fetch strategic advice content");
    return response.json();
  },
  updateStrategicAdvice: async (contentData) => {
    const formData = new FormData();
    Object.keys(contentData).forEach(key => {
      if (key === "features") {
        formData.append(key, JSON.stringify(contentData[key]));
      } else if (contentData[key] !== null && contentData[key] !== undefined) {
        formData.append(key, contentData[key]);
      }
    });

    const response = await fetch(`${API_LOGIC_URL}/home/strategic-advice`, {
      method: "PUT",
      headers: { ...authService.getAuthHeader() },
      body: formData,
    });
    if (!response.ok) throw new Error("Failed to update strategic advice content");
    return response.json();
  },

  // Home Hero Slides
  getHomeHeroSlides: async () => {
    const response = await fetch(`${API_LOGIC_URL}/home/hero`);
    if (!response.ok) throw new Error("Failed to fetch home hero slides");
    return response.json();
  },

  createHomeHeroSlide: async (slideData) => {
    const formData = new FormData();
    Object.keys(slideData).forEach((key) => {
      if (slideData[key] !== null && slideData[key] !== undefined) {
        formData.append(key, slideData[key]);
      }
    });

    const response = await fetch(`${API_LOGIC_URL}/home/hero`, {
      method: "POST",
      headers: { ...authService.getAuthHeader() },
      body: formData,
    });
    if (!response.ok) throw new Error("Failed to create hero slide");
    return response.json();
  },

  updateHomeHeroSlide: async (id, slideData) => {
    const formData = new FormData();
    Object.keys(slideData).forEach((key) => {
      if (key !== 'id' && slideData[key] !== null && slideData[key] !== undefined) {
        formData.append(key, slideData[key]);
      }
    });

    const response = await fetch(`${API_LOGIC_URL}/home/hero/${id}`, {
      method: "PUT",
      headers: { ...authService.getAuthHeader() },
      body: formData,
    });
    if (!response.ok) throw new Error("Failed to update hero slide");
    return response.json();
  },

  deleteHomeHeroSlide: async (id) => {
    const response = await fetch(`${API_LOGIC_URL}/home/hero/${id}`, {
      method: "DELETE",
      headers: { ...authService.getAuthHeader() },
    });
    if (!response.ok) throw new Error("Failed to delete hero slide");
    return response.json();
  },

  // News & Testimonials (Shortcuts for Home)
  getLatestNews: async (limit = 3) => {
    const response = await fetch(`${API_LOGIC_URL}/news?limit=${limit}`);
    if (!response.ok) throw new Error("Failed to fetch latest news");
    return response.json();
  },
  getTestimonials: async () => {
    const response = await fetch(`${API_LOGIC_URL}/about/testimonials`);
    if (!response.ok) throw new Error("Failed to fetch testimonials");
    return response.json();
  },

  // --- Legal Content ---
  getLegalContent: async (type) => {
    const response = await fetch(`${API_LOGIC_URL}/legal/${type}`);
    if (!response.ok) throw new Error(`Failed to fetch ${type} content`);
    return response.json();
  },

  updateLegalContent: async (type, data) => {
    const response = await fetch(`${API_LOGIC_URL}/legal/${type}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        ...authService.getAuthHeader() 
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`Failed to update ${type} content`);
    return response.json();
  },

  // --- Site Settings ---
  getSettings: async () => {
    const response = await fetch(`${API_LOGIC_URL}/settings`);
    if (!response.ok) throw new Error("Failed to fetch settings");
    return response.json();
  },

  updateSettings: async (data) => {
    const response = await fetch(`${API_LOGIC_URL}/settings`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        ...authService.getAuthHeader() 
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to update settings");
    return response.json();
  },
};

export default api;
export { API_BASE_URL };
