import authService from "../api/authService";

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

let productsCache = null;
let productsListCache = null;
let productHomeCardsCache = null;

const clearProductsCache = () => {
  productsCache = null;
  productsListCache = null;
  productHomeCardsCache = null;
};

export const getProductHomeCards = async () => {
  if (productHomeCardsCache) return productHomeCardsCache;

  const response = await fetch(`${API_BASE_URL}/products/home`, {
    headers: { ...authService.getAuthHeader() }
  });
  if (!response.ok) throw new Error("Failed to fetch product home cards");
  const data = await response.json();
  
  productHomeCardsCache = data;
  return data;
};

export const getAllProducts = async (skip = 0, limit = 100) => {
  // Use cache only for default full list fetch
  if (productsCache && skip === 0 && limit === 100) return productsCache;

  const response = await fetch(`${API_BASE_URL}/products?skip=${skip}&limit=${limit}`, {
    headers: { ...authService.getAuthHeader() }
  });
  if (!response.ok) throw new Error("Failed to fetch products");
  const data = await response.json();
  
  if (skip === 0 && limit === 100) productsCache = data;
  return data;
};

export const getProductsList = async () => {
  if (productsListCache) return productsListCache;

  const response = await fetch(`${API_BASE_URL}/products/list`, {
    headers: { ...authService.getAuthHeader() }
  });
  if (!response.ok) throw new Error("Failed to fetch products list");
  const data = await response.json();
  
  productsListCache = data;
  return data;
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
  clearProductsCache();
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
  clearProductsCache();
  return response.json();
};

export const deleteProduct = async (id) => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: "DELETE",
    headers: { ...authService.getAuthHeader() },
  });
  if (!response.ok) throw new Error("Failed to delete product");
  clearProductsCache();
  return response.json();
};
