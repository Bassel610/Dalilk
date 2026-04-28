import apiClient from './api-client';
import { ENDPOINTS } from '../constants/api-endpoints';

export const authService = {
  register: (email, password) =>
    apiClient.post(ENDPOINTS.AUTH.REGISTER, { email, password }),
  me: () => apiClient.get(ENDPOINTS.AUTH.ME),
  sync: () => apiClient.post(ENDPOINTS.AUTH.SYNC),
};
