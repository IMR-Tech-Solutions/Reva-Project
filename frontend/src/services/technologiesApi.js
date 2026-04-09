import authService from "../api/authService";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const getAllTechnologies = async (skip = 0, limit = 100) => {
  const response = await fetch(`${API_BASE_URL}/technologies?skip=${skip}&limit=${limit}`, {
    headers: { ...authService.getAuthHeader() }
  });
  if (!response.ok) throw new Error("Failed to fetch technologies");
  return response.json();
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
  return response.json();
};

export const deleteTechnology = async (id) => {
  const response = await fetch(`${API_BASE_URL}/technologies/${id}`, {
    method: "DELETE",
    headers: { ...authService.getAuthHeader() },
  });
  if (!response.ok) throw new Error("Failed to delete technology");
  return response.json();
};
