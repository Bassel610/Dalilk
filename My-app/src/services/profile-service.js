import apiClient from './api-client';
import { ENDPOINTS } from '../constants/api-endpoints';

export const profileService = {
  get: () => apiClient.get(ENDPOINTS.AUTH.PROFILE),
  update: (data) => apiClient.put(ENDPOINTS.AUTH.PROFILE, data),
};
