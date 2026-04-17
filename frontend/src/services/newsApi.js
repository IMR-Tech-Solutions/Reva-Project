import authService from "../api/authService";
const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

/**
 * Fetch all news articles from the backend
 * @param {number} skip - Number of records to skip
 * @param {number} limit - Maximum number of records to return
 * @returns {Promise<Array>} - List of news articles
 */
export const getAllNews = async (skip = 0, limit = 100) => {
  const response = await fetch(`${API_BASE_URL}/news?skip=${skip}&limit=${limit}`);
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.detail || "Failed to fetch news articles");
  }
  return response.json();
};

/**
 * Fetch a single news article by ID
 * @param {number} id - The ID of the news article to fetch
 * @returns {Promise<Object>} - The news article
 */
export const getNewsById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/news/${id}`);
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.detail || "Failed to fetch news article");
  }
  return response.json();
};

/**
 * Fetch a single news article by SLUG
 * @param {string} slug - The slug of the news article to fetch
 * @returns {Promise<Object>} - The news article
 */
export const getNewsBySlug = async (slug) => {
  const response = await fetch(`${API_BASE_URL}/news/slug/${slug}`);
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.detail || "Failed to fetch news article");
  }
  return response.json();
};

/**
 * Create a new news article
 * @param {Object} newsData - The news article data
 * @returns {Promise<Object>} - The created news article
 */
export const createNews = async (newsData) => {
  const response = await fetch(`${API_BASE_URL}/news`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authService.getAuthHeader(),
    },
    body: JSON.stringify(newsData),
  });
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.detail || "Failed to create news article");
  }
  return response.json();
};

/**
 * Update an existing news article
 * @param {number} id - The ID of the news article to update
 * @param {Object} newsData - The updated news article data
 * @returns {Promise<Object>} - The updated news article
 */
export const updateNews = async (id, newsData) => {
  const response = await fetch(`${API_BASE_URL}/news/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authService.getAuthHeader(),
    },
    body: JSON.stringify(newsData),
  });
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.detail || "Failed to update news article");
  }
  return response.json();
};

/**
 * Delete a news article
 * @param {number} id - The ID of the news article to delete
 * @returns {Promise<Object>} - Success message
 */
export const deleteNews = async (id) => {
  const response = await fetch(`${API_BASE_URL}/news/${id}`, {
    method: "DELETE",
    headers: { ...authService.getAuthHeader() },
  });
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.detail || "Failed to delete news article");
  }
  return response.json();
};
