import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Systems endpoints
export const getSystems = () => api.get('/systems/');
export const createSystem = (data) => api.post('/systems/', data);
export const updateSystem = (id, data) => api.put(`/systems/${id}`, data);
export const deleteSystem = (id) => api.delete(`/systems/${id}`);

// Resources endpoints
export const getResources = () => api.get('/resources/');
export const createResource = (data) => api.post('/resources/', data);

export default api;