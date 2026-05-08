import { useState } from 'react';
import { usersService } from '../../services/users-service';
import { useToast } from '../../components/toast';
import { USER_MGMT_TEXT } from '../../constants/pages/dashboard';

export function useCreateUser({ onSuccess } = {}) {
  const toast = useToast();
  const [creating, setCreating] = useState(false);

  const createUser = async (data) => {
    setCreating(true);
    try {
      const res = await usersService.create(data);
      toast.success(USER_MGMT_TEXT.ADDED_TOAST);
      onSuccess?.(res);
      return res;
    } catch (e) {
      toast.error(e.message);
      throw e;
    } finally {
      setCreating(false);
    }
  };

  return { createUser, creating };
}
