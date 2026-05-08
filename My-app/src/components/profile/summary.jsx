import { TEXT } from '../../constants/app/ui-text';
import { PROFILE_TEXT } from '../../constants/pages/profile';
import { getInitial } from '../../lib/pages/profile';

export default function ProfileSummary({ form, user, role, stats }) {
  const initial = getInitial(form.name, user?.email);
  const isAdmin = role === 'admin';
  return (
    <aside className="ProfileSummary">
      <div className="ProfileSummary-avatar">{initial}</div>
      <p className="ProfileSummary-hello">{TEXT.PROFILE.SUMMARY_HELLO}</p>
      <h2 className="ProfileSummary-name">
        {form.name || TEXT.PROFILE.SUMMARY_NO_NAME}
      </h2>
      <p className="ProfileSummary-email">{user?.email}</p>

      <div className="ProfileSummary-stats">
        <div className="ProfileSummary-stat">
          <strong>
            {stats.filled}/{stats.total}
          </strong>
          <span>{PROFILE_TEXT.STATS_COMPLETION}</span>
        </div>
        <div className="ProfileSummary-stat">
          <strong>{isAdmin ? PROFILE_TEXT.ROLE_ADMIN : PROFILE_TEXT.ROLE_USER}</strong>
          <span>{PROFILE_TEXT.STATS_ROLE}</span>
        </div>
      </div>

      <div className="ProfileSummary-hint">{TEXT.PROFILE.SUMMARY_HINT}</div>
    </aside>
  );
}
