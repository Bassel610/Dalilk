import { usersService } from '../../services/users-service';
import { useToast } from '../../components/toast';
import { useConfirm } from '../../components/confirm-dialog';
import { USER_MGMT_TEXT } from '../../constants/pages/dashboard';

export function useDeleteUser({ onSuccess } = {}) {
  const toast = useToast();
  const confirm = useConfirm();

  const deleteUser = async (user) => {
    const ok = await confirm({
      title: USER_MGMT_TEXT.CONFIRM_DELETE_TITLE,
      message: USER_MGMT_TEXT.CONFIRM_DELETE_MESSAGE(user.email),
      confirmLabel: USER_MGMT_TEXT.CONFIRM_DELETE_OK,
      cancelLabel: USER_MGMT_TEXT.CONFIRM_DELETE_CANCEL,
      variant: 'danger',
    });
    if (!ok) return false;
    try {
      await usersService.remove(user.uid);
      toast.success(USER_MGMT_TEXT.DELETED_TOAST);
      onSuccess?.(user);
      return true;
    } catch (e) {
      toast.error(e.message);
      return false;
    }
  };

  return { deleteUser };
}
