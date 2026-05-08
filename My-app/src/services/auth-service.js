import apiClient from './api-client';
import { ENDPOINTS } from '../constants/services/api-endpoints';

function isOffline(err) {
  return err?.isBackendOffline === true;
}

export const authService = {
  register: (email, password) =>
    apiClient.post(ENDPOINTS.AUTH.REGISTER, { email, password }),
  me: async () => {
    try {
      return await apiClient.get(ENDPOINTS.AUTH.ME);
    } catch (e) {
      if (!isOffline(e)) throw e;
      return { role: 'user' };
    }
  },
  sync: async () => {
    try {
      return await apiClient.post(ENDPOINTS.AUTH.SYNC);
    } catch (e) {
      if (!isOffline(e)) throw e;
      return { role: 'user' };
    }
  },
};
