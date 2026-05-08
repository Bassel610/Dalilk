import axios from 'axios';
import { auth, API_BASE } from '../firebase';
import { setBackendStatus } from '../hooks/use-backend-status';

const apiClient = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
  timeout: 6000,
});

apiClient.interceptors.request.use(async (config) => {
  if (auth.currentUser) {
    const token = await auth.currentUser.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (res) => {
    setBackendStatus('online');
    return res.data;
  },
  (err) => {
    const isNetworkError =
      !err.response || err.code === 'ECONNABORTED' || err.message === 'Network Error';
    if (isNetworkError) {
      setBackendStatus('offline');
      const e = new Error('backend_offline');
      e.isBackendOffline = true;
      return Promise.reject(e);
    }
    setBackendStatus('online');
    const message = err?.response?.data?.error || err?.message || 'Request failed';
    return Promise.reject(new Error(message));
  },
);

export default apiClient;
