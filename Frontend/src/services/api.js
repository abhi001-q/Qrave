import axios from 'axios';

let baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Robustness: Ensure baseURL ends with /api
if (baseURL && !baseURL.endsWith('/api')) {
  baseURL = `${baseURL.replace(/\/+$/, '')}/api`;
}

// Production check: Warn if baseURL is relative or pointing to localhost/vercel
if (import.meta.env.PROD && (baseURL.startsWith('http://localhost') || !baseURL.startsWith('http'))) {
  console.warn('API Warning: baseURL might be misconfigured for production:', baseURL);
}

const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('qrave_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401 globally - clear session & redirect to login
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('qrave_user');
      localStorage.removeItem('qrave_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
