import ShopForm from '../../shop-form';
import { useCreateShop } from '../../../hooks/shops/use-create-shop';
import { TEXT } from '../../../constants/app/ui-text';

export default function AddShop() {
  const { createShop } = useCreateShop();

  return (
    <ShopForm
      submitLabel={TEXT.ADMIN.ADD_SHOP}
      submittingLabel={TEXT.COMMON.SAVING}
      onSubmit={createShop}
    />
  );
}
