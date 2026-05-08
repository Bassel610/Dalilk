import { useState } from 'react';
import { shopsService } from '../../services/shops-service';
import { useToast } from '../../components/toast';
import { ADD_SHOP_TEXT } from '../../constants/pages/dashboard';

export function useCreateShop({ onSuccess } = {}) {
  const toast = useToast();
  const [creating, setCreating] = useState(false);

  const createShop = async (payload) => {
    setCreating(true);
    try {
      const res = await shopsService.create(payload);
      toast.success(ADD_SHOP_TEXT.ADDED_TOAST(res.shop?.Name || payload.Name));
      onSuccess?.(res);
      return res;
    } catch (e) {
      toast.error(e.message);
      throw e;
    } finally {
      setCreating(false);
    }
  };

  return { createShop, creating };
}
