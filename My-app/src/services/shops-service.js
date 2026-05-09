import apiClient from './api-client';
import { ENDPOINTS } from '../constants/services/api-endpoints';
import { pickDefined, applyShopFilters } from '../lib/services/shops';
import { createCollectionStore, genId } from '../lib/local-store';
import { SEED_SHOPS } from '../data/shops';

const localShops = createCollectionStore('dalilk_shops_v3', SEED_SHOPS);

function isOffline(err) {
  return err?.isBackendOffline === true;
}

export const shopsService = {
  list: async (filters) => {
    const seed = () => {
      const items = applyShopFilters(localShops.list(), filters);
      return { items, total: items.length };
    };
    try {
      const res = await apiClient.get(ENDPOINTS.SHOPS.LIST, { params: pickDefined(filters) });
      const items = Array.isArray(res) ? res : res?.items;
      if (!Array.isArray(items) || items.length === 0) return seed();
      return res;
    } catch {
      return seed();
    }
  },
  detail: async (id) => {
    try {
      const res = await apiClient.get(ENDPOINTS.SHOPS.DETAIL(id));
      return res || localShops.get(id);
    } catch {
      return localShops.get(id);
    }
  },
  filterOptions: async () => {
    const seed = async () => {
      const { SEED_FILTER_OPTIONS } = await import('../data/filter-options');
      return SEED_FILTER_OPTIONS;
    };
    try {
      const res = await apiClient.get(ENDPOINTS.SHOPS.FILTER_OPTIONS);
      if (!res || (typeof res === 'object' && Object.keys(res).length === 0)) return seed();
      return res;
    } catch {
      return seed();
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
