import authService from "../api/authService";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const getAllProducts = async (skip = 0, limit = 100) => {
  const response = await fetch(`${API_BASE_URL}/products?skip=${skip}&limit=${limit}`, {
    headers: { ...authService.getAuthHeader() }
  });
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
};

export const getProductById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    headers: { ...authService.getAuthHeader() }
  });
  if (!response.ok) throw new Error("Failed to fetch product");
  return response.json();
};

export const getProductByPath = async (path) => {
  // Remove leading slash if present for the API call
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  const response = await fetch(`${API_BASE_URL}/products/path/${cleanPath}`, {
    headers: { ...authService.getAuthHeader() }
  });
  if (!response.ok) throw new Error("Failed to fetch product");
  return response.json();
};

export const createProduct = async (productData) => {
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authService.getAuthHeader(),
    },
    body: JSON.stringify(productData),
  });
  if (!response.ok) throw new Error("Failed to create product");
  return response.json();
};

export const updateProduct = async (id, productData) => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authService.getAuthHeader(),
    },
    body: JSON.stringify(productData),
  });
  if (!response.ok) throw new Error("Failed to update product");
  return response.json();
};

export const deleteProduct = async (id) => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: "DELETE",
    headers: { ...authService.getAuthHeader() },
  });
  if (!response.ok) throw new Error("Failed to delete product");
  return response.json();
};
