import axios from 'axios';
import { API_URL } from 'constants/app';
import { getCookie } from 'utils/cookie';

const formDataClient = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'ngrok-skip-browser-warning': 'true', // Default header
  },
});

// Interceptor to set Authorization header and handle FormData Content-Type
formDataClient.interceptors.request.use((config) => {
  const token = getCookie('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // If the request is sending FormData, do not set Content-Type (browser handles it)
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type']; // Remove Content-Type header to let the browser set it correctly
  }

  return config;
});

export default formDataClient;
