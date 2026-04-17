import authService from "../api/authService";

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

export const getContactSettings = async () => {
  const response = await fetch(`${API_BASE_URL}/contact/settings`, {
    headers: { ...authService.getAuthHeader() }
  });
  if (!response.ok) throw new Error("Failed to fetch contact settings");
  return response.json();
};

export const updateContactSettings = async (settingsData) => {
  const response = await fetch(`${API_BASE_URL}/contact/settings`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authService.getAuthHeader(),
    },
    body: JSON.stringify(settingsData),
  });
  if (!response.ok) throw new Error("Failed to update contact settings");
  return response.json();
};

export const submitContactMessage = async (messageData) => {
  const response = await fetch(`${API_BASE_URL}/contact/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messageData),
  });
  if (!response.ok) throw new Error("Failed to submit message");
  return response.json();
};

export const getContactMessages = async () => {
  const response = await fetch(`${API_BASE_URL}/contact/messages`, {
    headers: { ...authService.getAuthHeader() }
  });
  if (!response.ok) throw new Error("Failed to fetch messages");
  return response.json();
};

export const markMessageRead = async (id) => {
  const response = await fetch(`${API_BASE_URL}/contact/messages/${id}/read`, {
    method: "PUT",
    headers: { ...authService.getAuthHeader() }
  });
  if (!response.ok) throw new Error("Failed to mark message as read");
  return response.json();
};

export const deleteContactMessage = async (id) => {
  const response = await fetch(`${API_BASE_URL}/contact/messages/${id}`, {
    method: "DELETE",
    headers: { ...authService.getAuthHeader() },
  });
  if (!response.ok) throw new Error("Failed to delete message");
  return response.json();
};
