import authService from "../api/authService";

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

let technologiesCache = null;
let technologiesListCache = null;

const clearTechnologiesCache = () => {
  technologiesCache = null;
  technologiesListCache = null;
};

export const getAllTechnologies = async (skip = 0, limit = 100) => {
  // Use cache for default list
  if (technologiesCache && skip === 0 && limit === 100) return technologiesCache;

  const response = await fetch(`${API_BASE_URL}/technologies?skip=${skip}&limit=${limit}`, {
    headers: { ...authService.getAuthHeader() }
  });
  if (!response.ok) throw new Error("Failed to fetch technologies");
  const data = await response.json();

  if (skip === 0 && limit === 100) technologiesCache = data;
  return data;
};

export const getTechnologiesList = async () => {
  if (technologiesListCache) return technologiesListCache;

  const response = await fetch(`${API_BASE_URL}/technologies/list`, {
    headers: { ...authService.getAuthHeader() }
  });
  if (!response.ok) throw new Error("Failed to fetch technologies list");
  const data = await response.json();

  technologiesListCache = data;
  return data;
};

export const getTechnologyById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/technologies/${id}`, {
    headers: { ...authService.getAuthHeader() }
  });
  if (!response.ok) throw new Error("Failed to fetch technology");
  return response.json();
};

export const getTechnologyBySlug = async (slug) => {
  const response = await fetch(`${API_BASE_URL}/technologies/slug/${slug}`, {
    headers: { ...authService.getAuthHeader() }
  });
  if (!response.ok) throw new Error("Failed to fetch technology");
  return response.json();
};

export const createTechnology = async (techData) => {
  const response = await fetch(`${API_BASE_URL}/technologies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authService.getAuthHeader(),
    },
    body: JSON.stringify(techData),
  });
  if (!response.ok) throw new Error("Failed to create technology");
  clearTechnologiesCache();
  return response.json();
};

export const updateTechnology = async (id, techData) => {
  const response = await fetch(`${API_BASE_URL}/technologies/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authService.getAuthHeader(),
    },
    body: JSON.stringify(techData),
  });
  if (!response.ok) throw new Error("Failed to update technology");
  clearTechnologiesCache();
  return response.json();
};

export const deleteTechnology = async (id) => {
  const response = await fetch(`${API_BASE_URL}/technologies/${id}`, {
    method: "DELETE",
    headers: { ...authService.getAuthHeader() },
  });
  if (!response.ok) throw new Error("Failed to delete technology");
  clearTechnologiesCache();
  return response.json();
};

export const uploadTechnologyImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);
  
  const response = await fetch(`${API_BASE_URL}/admin/technologies/upload-image`, {
    method: "POST",
    headers: {
      ...authService.getAuthHeader(),
    },
    body: formData,
  });
  
  if (!response.ok) throw new Error("Failed to upload image");
  return response.json();
};
