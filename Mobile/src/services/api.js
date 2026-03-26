import axios from "axios";

let baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Robustness: Ensure baseURL ends with /api
if (baseURL && !baseURL.endsWith("/api")) {
  baseURL = `${baseURL.replace(/\/+$/, "")}/api`;
}

// Production check: Warn if baseURL is relative or pointing to localhost/vercel
if (import.meta.env.PROD && (baseURL.startsWith("http://localhost") || !baseURL.startsWith("http"))) {
  console.warn("API Warning: baseURL might be misconfigured for production:", baseURL);
}

const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
