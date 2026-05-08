import { shopsService } from '../../services/shops-service';
import { useToast } from '../../components/toast';
import { useConfirm } from '../../components/confirm-dialog';
import { ALL_SHOPS_TEXT } from '../../constants/pages/dashboard';

export function useDeleteShop({ onSuccess } = {}) {
  const toast = useToast();
  const confirm = useConfirm();

  const deleteShop = async (shop) => {
    const ok = await confirm({
      title: ALL_SHOPS_TEXT.CONFIRM_DELETE_TITLE,
      message: ALL_SHOPS_TEXT.CONFIRM_DELETE_MESSAGE(shop.Name),
      confirmLabel: ALL_SHOPS_TEXT.CONFIRM_DELETE_OK,
      cancelLabel: ALL_SHOPS_TEXT.CONFIRM_DELETE_CANCEL,
      variant: 'danger',
    });
    if (!ok) return false;
    try {
      await shopsService.remove(shop.id);
      toast.success(ALL_SHOPS_TEXT.DELETED_TOAST(shop.Name));
      onSuccess?.(shop);
      return true;
    } catch (e) {
      toast.error(e.message);
      return false;
    }
  };

  return { deleteShop };
}
