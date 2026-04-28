import axios from 'axios';
import { auth, API_BASE } from '../firebase';

const apiClient = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use(async (config) => {
  if (auth.currentUser) {
    const token = await auth.currentUser.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (res) => res.data,
  (err) => {
    const message = err?.response?.data?.error || err?.message || 'Request failed';
    return Promise.reject(new Error(message));
  }
);

export default apiClient;
