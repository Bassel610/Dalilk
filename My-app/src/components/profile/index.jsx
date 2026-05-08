import WebsiteLayout from '../../layouts/website';
import ProfileSummary from './summary';
import ProfileForm from './form';
import { useAuth } from '../../hooks/auth/use-auth';
import { useProfileForm } from '../../hooks/profile/use-profile-form';
import { TEXT } from '../../constants/app/ui-text';
import './page.css';

export default function Profile() {
  const { user } = useAuth();
  const { form, setField, submit, reset, submitting, loading, profile, stats } =
    useProfileForm();

  if (loading) {
    return (
      <WebsiteLayout>
        <div className="ProfilePage">
          <div className="ProfilePage-loading">{TEXT.COMMON.LOADING}</div>
        </div>
      </WebsiteLayout>
    );
  }

  return (
    <WebsiteLayout>
      <div className="ProfilePage">
        <div className="ProfilePage-shell">
          <ProfileSummary
            form={form}
            user={user}
            role={profile?.role}
            stats={stats}
          />
          <ProfileForm
            form={form}
            setField={setField}
            submit={submit}
            reset={reset}
            submitting={submitting}
            user={user}
          />
        </div>
      </div>
    </WebsiteLayout>
  );
}
