import { useEffect, useState } from 'react';
import { useProfile } from './use-profile';
import { useToast } from '../../components/toast';
import { EMPTY_PROFILE_FORM } from '../../constants/pages/profile';
import { completionStats } from '../../lib/pages/profile';
import { TEXT } from '../../constants/app/ui-text';

export function useProfileForm() {
  const { data, loading, save } = useProfile();
  const toast = useToast();
  const [form, setForm] = useState(() => ({ ...EMPTY_PROFILE_FORM }));
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (data?.profile) {
      setForm((prev) => ({ ...prev, ...data.profile }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.uid]);

  const setField = (key, value) =>
    setForm((p) => ({ ...p, [key]: value }));

  const submit = async (e) => {
    e?.preventDefault?.();
    setSubmitting(true);
    try {
      await save(form);
      toast.success(TEXT.COMMON.SAVED);
      return true;
    } catch (err) {
      toast.error(err.message);
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    if (data?.profile) {
      setForm((prev) => ({ ...prev, ...data.profile }));
    } else {
      setForm({ ...EMPTY_PROFILE_FORM });
    }
  };

  return {
    form,
    setField,
    submit,
    reset,
    submitting,
    loading,
    profile: data,
    stats: completionStats(form),
  };
}
