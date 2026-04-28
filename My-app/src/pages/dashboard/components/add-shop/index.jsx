import ShopForm from '../../../../components/shop-form';
import { shopsService } from '../../../../services/shops-service';
import { useToast } from '../../../../components/toast';
import { TEXT } from '../../../../constants/ui-text';

export default function AddShop() {
  const toast = useToast();

  const handleSubmit = async (payload) => {
    const res = await shopsService.create(payload);
    toast.success(`تمت إضافة "${res.shop?.Name || payload.Name}"`);
  };

  return (
    <ShopForm
      submitLabel={TEXT.ADMIN.ADD_SHOP}
      submittingLabel={TEXT.COMMON.SAVING}
      onSubmit={handleSubmit}
    />
  );
}
