import { useState } from 'react';
import { shopsService } from '../../services/shops-service';
import { useToast } from '../../components/toast';
import { EDIT_SHOP_TEXT } from '../../constants/pages/dashboard';

export function useUpdateShop({ onSuccess } = {}) {
  const toast = useToast();
  const [updating, setUpdating] = useState(false);

  const updateShop = async (id, payload) => {
    setUpdating(true);
    try {
      const res = await shopsService.update(id, payload);
      toast.success(EDIT_SHOP_TEXT.SAVED_TOAST(payload.Name));
      onSuccess?.(res);
      return res;
    } catch (e) {
      toast.error(e.message);
      throw e;
    } finally {
      setUpdating(false);
    }
  };

  return { updateShop, updating };
}
