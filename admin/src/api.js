// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Replace with your API base URL
});

export const setAccessToken = (token) => {
  api.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : '';
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post('/api/refresh', { refreshToken });
        const { accessToken } = response.data;
        setAccessToken(accessToken);
        if (window.updateAccessToken) {
          window.updateAccessToken(accessToken); // Update context
        }
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        if (window.logout) {
          window.logout(); // Logout if refresh fails
        }
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;