import apiClient from './api-client';
import { ENDPOINTS } from '../constants/api-endpoints';

function pickDefined(obj) {
  const out = {};
  Object.entries(obj || {}).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') out[k] = v;
  });
  return out;
}

export const shopsService = {
  list: (filters) =>
    apiClient.get(ENDPOINTS.SHOPS.LIST, { params: pickDefined(filters) }),
  detail: (id) => apiClient.get(ENDPOINTS.SHOPS.DETAIL(id)),
  filterOptions: () => apiClient.get(ENDPOINTS.SHOPS.FILTER_OPTIONS),
  create: (shop) => apiClient.post(ENDPOINTS.SHOPS.CREATE, shop),
  update: (id, shop) => apiClient.put(ENDPOINTS.SHOPS.UPDATE(id), shop),
  remove: (id) => apiClient.delete(ENDPOINTS.SHOPS.DELETE(id)),
};
