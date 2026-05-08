import apiClient from './api-client';
import { ENDPOINTS } from '../constants/services/api-endpoints';
import { createDocStore } from '../lib/local-store';
import { SEED_PROFILE } from '../data/profile';

const localProfile = createDocStore('dalilk_profile', SEED_PROFILE);

function isOffline(err) {
  return err?.isBackendOffline === true;
}

export const profileService = {
  get: async () => {
    try {
      return await apiClient.get(ENDPOINTS.AUTH.PROFILE);
    } catch (e) {
      if (!isOffline(e)) throw e;
      return localProfile.get();
    }
  },
  update: async (data) => {
    try {
      return await apiClient.put(ENDPOINTS.AUTH.PROFILE, data);
    } catch (e) {
      if (!isOffline(e)) throw e;
      const current = localProfile.get();
      const next = {
        ...current,
        profile: { ...(current.profile || {}), ...data },
      };
      localProfile.set(next);
      return next;
    }
  },
};
