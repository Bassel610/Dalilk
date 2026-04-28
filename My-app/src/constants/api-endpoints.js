const API_PREFIX = '/api/v1';

export const ENDPOINTS = {
  AUTH: {
    REGISTER: `${API_PREFIX}/auth/register`,
    ME: `${API_PREFIX}/auth/me`,
    SYNC: `${API_PREFIX}/auth/sync`,
    PROFILE: `${API_PREFIX}/profile`,
  },
  USERS: {
    LIST: `${API_PREFIX}/users`,
    CREATE: `${API_PREFIX}/users`,
    DELETE: (uid) => `${API_PREFIX}/users/${uid}`,
  },
  SHOPS: {
    LIST: `${API_PREFIX}/shops`,
    DETAIL: (id) => `${API_PREFIX}/shops/${id}`,
    CREATE: `${API_PREFIX}/shops`,
    UPDATE: (id) => `${API_PREFIX}/shops/${id}`,
    DELETE: (id) => `${API_PREFIX}/shops/${id}`,
    FILTER_OPTIONS: `${API_PREFIX}/shops/filter-options`,
  },
};
