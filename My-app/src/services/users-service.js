import apiClient from './api-client';
import { ENDPOINTS } from '../constants/api-endpoints';

export const usersService = {
  list: () => apiClient.get(ENDPOINTS.USERS.LIST),
  create: (data) => apiClient.post(ENDPOINTS.USERS.CREATE, data),
  remove: (uid) => apiClient.delete(ENDPOINTS.USERS.DELETE(uid)),
};
