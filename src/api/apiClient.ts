import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://40b6-42-115-115-73.ngrok-free.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to the Authorization header if present
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
