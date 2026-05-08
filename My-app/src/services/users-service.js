import apiClient from './api-client';
import { ENDPOINTS } from '../constants/services/api-endpoints';
import { createCollectionStore, genId } from '../lib/local-store';
import { SEED_USERS } from '../data/users';

const localUsers = createCollectionStore('dalilk_users', SEED_USERS, 'uid');

function isOffline(err) {
  return err?.isBackendOffline === true;
}

export const usersService = {
  list: async () => {
    try {
      return await apiClient.get(ENDPOINTS.USERS.LIST);
    } catch (e) {
      if (!isOffline(e)) throw e;
      return localUsers.list();
    }
  },
  create: async (data) => {
    try {
      return await apiClient.post(ENDPOINTS.USERS.CREATE, data);
    } catch (e) {
      if (!isOffline(e)) throw e;
      const created = {
        uid: genId('user'),
        email: data.email,
        role: data.role || 'user',
      };
      localUsers.add(created);
      return created;
    }
  },
  remove: async (uid) => {
    try {
      return await apiClient.delete(ENDPOINTS.USERS.DELETE(uid));
    } catch (e) {
      if (!isOffline(e)) throw e;
      localUsers.remove(uid);
      return { ok: true };
    }
  },
};
