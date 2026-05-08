import apiClient from './api-client';
import { ENDPOINTS } from '../constants/services/api-endpoints';
import { pickDefined, applyShopFilters } from '../lib/services/shops';
import { createCollectionStore, genId } from '../lib/local-store';
import { SEED_SHOPS } from '../data/shops';

const localShops = createCollectionStore('dalilk_shops', SEED_SHOPS);

function isOffline(err) {
  return err?.isBackendOffline === true;
}

export const shopsService = {
  list: async (filters) => {
    try {
      return await apiClient.get(ENDPOINTS.SHOPS.LIST, { params: pickDefined(filters) });
    } catch (e) {
      if (!isOffline(e)) throw e;
      const items = applyShopFilters(localShops.list(), filters);
      return { items, total: items.length };
    }
  },
  detail: async (id) => {
    try {
      return await apiClient.get(ENDPOINTS.SHOPS.DETAIL(id));
    } catch (e) {
      if (!isOffline(e)) throw e;
      return localShops.get(id);
    }
  },
  filterOptions: async () => {
    try {
      return await apiClient.get(ENDPOINTS.SHOPS.FILTER_OPTIONS);
    } catch (e) {
      if (!isOffline(e)) throw e;
      const { SEED_FILTER_OPTIONS } = await import('../data/filter-options');
      return SEED_FILTER_OPTIONS;
    }
  },
  create: async (shop) => {
    try {
      return await apiClient.post(ENDPOINTS.SHOPS.CREATE, shop);
    } catch (e) {
      if (!isOffline(e)) throw e;
      const created = { ...shop, id: genId('shop') };
      localShops.add(created);
      return { shop: created };
    }
  },
  update: async (id, shop) => {
    try {
      return await apiClient.put(ENDPOINTS.SHOPS.UPDATE(id), shop);
    } catch (e) {
      if (!isOffline(e)) throw e;
      return localShops.update(id, shop);
    }
  },
  remove: async (id) => {
    try {
      return await apiClient.delete(ENDPOINTS.SHOPS.DELETE(id));
    } catch (e) {
      if (!isOffline(e)) throw e;
      localShops.remove(id);
      return { ok: true };
    }
  },
};
