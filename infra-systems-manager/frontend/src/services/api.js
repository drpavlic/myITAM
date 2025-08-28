import axios from 'axios';

// API base URL from environment variable or relative path
const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Systems endpoints
export const getSystems = () => api.get('/systems/');
export const createSystem = (data) => api.post('/systems/', data);
export const updateSystem = (id, data) => api.put(`/systems/${id}`, data);
export const deleteSystem = (id) => api.delete(`/systems/${id}`);

// Resources endpoints
export const getResources = () => api.get('/resources/');
export const createResource = (data) => api.post('/resources/', data);

export default api;