import { useEffect, useState, useCallback } from 'react';
import { profileService } from '../../services/profile-service';
import { useAuth } from '../auth/use-auth';

const emptyProfile = {
  uid: null,
  email: '',
  role: '',
  profile: {
    name: '',
    phone: '',
    street: '',
    building: '',
    area: '',
    conservative: '',
    locationUrl: '',
    notes: '',
  },
};

export function useProfile() {
  const { user } = useAuth();
  const [data, setData] = useState(emptyProfile);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reload = useCallback(async () => {
    if (!user) {
      setData(emptyProfile);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await profileService.get();
      setData({
        ...res,
        profile: { ...emptyProfile.profile, ...(res.profile || {}) },
      });
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    reload();
  }, [reload]);

  const save = async (profileFields) => {
    const res = await profileService.update(profileFields);
    setData({
      ...res,
      profile: { ...emptyProfile.profile, ...(res.profile || {}) },
    });
    return res;
  };

  return { data, loading, error, reload, save };
}
