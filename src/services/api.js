import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

// Admin API requests only
api.interceptors.request.use((config) => {
  const url = config.url || "";

  if (url.startsWith("/admin")) {
    const token = localStorage.getItem("gs_admin_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default api;