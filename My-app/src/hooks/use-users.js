import { useEffect, useState, useCallback } from 'react';
import { usersService } from '../services/users-service';

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await usersService.list();
      setUsers(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const create = async (data) => {
    await usersService.create(data);
    await reload();
  };

  const remove = async (uid) => {
    await usersService.remove(uid);
    setUsers((prev) => prev.filter((u) => u.uid !== uid));
  };

  return { users, loading, error, reload, create, remove };
}
