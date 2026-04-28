import { useEffect, useState } from 'react';
import Header from '../../components/header';
import { useAuth } from '../../hooks/use-auth';
import { useProfile } from '../../hooks/use-profile';
import { useToast } from '../../components/toast';
import { TEXT } from '../../constants/ui-text';
import './styles.css';

const FIELDS = [
  { key: 'name', label: TEXT.PROFILE.NAME, placeholder: TEXT.PROFILE.NAME_PLACEHOLDER, section: 'account' },
  { key: 'phone', label: TEXT.PROFILE.PHONE, placeholder: TEXT.PROFILE.PHONE_PLACEHOLDER, section: 'contact', type: 'tel' },
  { key: 'street', label: TEXT.PROFILE.STREET, placeholder: TEXT.PROFILE.STREET_PLACEHOLDER, section: 'address' },
  { key: 'building', label: TEXT.PROFILE.BUILDING, placeholder: TEXT.PROFILE.BUILDING_PLACEHOLDER, section: 'address' },
  { key: 'area', label: TEXT.PROFILE.AREA, placeholder: TEXT.PROFILE.AREA_PLACEHOLDER, section: 'address' },
  { key: 'conservative', label: TEXT.PROFILE.CONSERVATIVE, placeholder: TEXT.PROFILE.CONSERVATIVE_PLACEHOLDER, section: 'address' },
  { key: 'locationUrl', label: TEXT.PROFILE.LOCATION_URL, placeholder: TEXT.PROFILE.LOCATION_URL_PLACEHOLDER, section: 'location', type: 'url' },
  { key: 'notes', label: TEXT.PROFILE.NOTES, placeholder: TEXT.PROFILE.NOTES_PLACEHOLDER, section: 'notes', textarea: true },
];

function getInitial(name, email) {
  return ((name || email || '?').trim().charAt(0) || '?').toUpperCase();
}

function completionStats(profile) {
  const total = FIELDS.length;
  const filled = FIELDS.filter((f) => (profile[f.key] || '').trim().length > 0).length;
  return { filled, total };
}

export default function ProfilePage() {
  const { user } = useAuth();
  const { data, loading, save } = useProfile();
  const toast = useToast();
  const [form, setForm] = useState(() => ({
    name: '',
    phone: '',
    street: '',
    building: '',
    area: '',
    conservative: '',
    locationUrl: '',
    notes: '',
  }));
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    if (data?.profile) setForm({ ...form, ...data.profile });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.uid]);

  const set = (k, v) => {
    setForm((p) => ({ ...p, [k]: v }));
    setMsg(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMsg(null);
    try {
      await save(form);
      toast.success(TEXT.COMMON.SAVED);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    if (data?.profile) setForm({ ...form, ...data.profile });
    setMsg(null);
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="ProfilePage">
          <div className="ProfilePage-loading">{TEXT.COMMON.LOADING}</div>
        </div>
      </>
    );
  }

  const initial = getInitial(form.name, user?.email);
  const stats = completionStats(form);
  const sections = {
    account: { title: TEXT.PROFILE.SECTION_ACCOUNT, fields: ['name'] },
    contact: { title: TEXT.PROFILE.SECTION_CONTACT, fields: ['phone'] },
    address: { title: TEXT.PROFILE.SECTION_ADDRESS, fields: ['conservative', 'area', 'street', 'building'] },
    location: { title: TEXT.PROFILE.SECTION_LOCATION, fields: ['locationUrl'] },
    notes: { title: TEXT.PROFILE.SECTION_NOTES, fields: ['notes'] },
  };

  const renderField = (key) => {
    const def = FIELDS.find((f) => f.key === key);
    if (!def) return null;
    return (
      <div className="ProfileField" key={key}>
        <label>{def.label}</label>
        {def.textarea ? (
          <textarea
            value={form[key] || ''}
            onChange={(e) => set(key, e.target.value)}
            placeholder={def.placeholder}
          />
        ) : (
          <input
            type={def.type || 'text'}
            value={form[key] || ''}
            onChange={(e) => set(key, e.target.value)}
            placeholder={def.placeholder}
          />
        )}
      </div>
    );
  };

  return (
    <>
      <Header />
      <div className="ProfilePage">
        <div className="ProfilePage-shell">
          {/* Summary */}
          <aside className="ProfileSummary">
            <div className="ProfileSummary-avatar">{initial}</div>
            <p className="ProfileSummary-hello">{TEXT.PROFILE.SUMMARY_HELLO}</p>
            <h2 className="ProfileSummary-name">
              {form.name || TEXT.PROFILE.SUMMARY_NO_NAME}
            </h2>
            <p className="ProfileSummary-email">{user?.email}</p>

            <div className="ProfileSummary-stats">
              <div className="ProfileSummary-stat">
                <strong>{stats.filled}/{stats.total}</strong>
                <span>اكتمال البيانات</span>
              </div>
              <div className="ProfileSummary-stat">
                <strong>{data?.role === 'admin' ? 'Admin' : 'User'}</strong>
                <span>الصلاحية</span>
              </div>
            </div>

            <div className="ProfileSummary-hint">
              {TEXT.PROFILE.SUMMARY_HINT}
            </div>
          </aside>

          {/* Form */}
          <form className="ProfileForm" onSubmit={handleSubmit}>
            <div className="ProfileForm-header">
              <h1>{TEXT.PROFILE.TITLE}</h1>
              <p>{TEXT.PROFILE.SUMMARY_HINT}</p>
            </div>

            <section className="ProfileForm-section">
              <h2>{sections.account.title}</h2>
              <div className="ProfileForm-grid">
                {sections.account.fields.map(renderField)}
                <div className="ProfileField">
                  <label>{TEXT.PROFILE.EMAIL_READONLY}</label>
                  <input value={user?.email || ''} disabled />
                </div>
              </div>
            </section>

            <section className="ProfileForm-section">
              <h2>{sections.contact.title}</h2>
              <div className="ProfileForm-grid">{sections.contact.fields.map(renderField)}</div>
            </section>

            <section className="ProfileForm-section">
              <h2>{sections.address.title}</h2>
              <div className="ProfileForm-grid">{sections.address.fields.map(renderField)}</div>
            </section>

            <section className="ProfileForm-section">
              <h2>{sections.location.title}</h2>
              <div className="ProfileForm-grid ProfileForm-grid--single">
                {sections.location.fields.map(renderField)}
              </div>
            </section>

            <section className="ProfileForm-section">
              <h2>{sections.notes.title}</h2>
              <div className="ProfileForm-grid ProfileForm-grid--single">
                {sections.notes.fields.map(renderField)}
              </div>
            </section>

            <div className="ProfileForm-actions">
              {msg && (
                <span className={`ProfileForm-msg ${msg.type}`}>{msg.text}</span>
              )}
              <button
                type="button"
                className="ProfileBtn ProfileBtn--ghost"
                onClick={handleReset}
                disabled={submitting}
              >
                {TEXT.COMMON.CANCEL}
              </button>
              <button
                type="submit"
                className="ProfileBtn ProfileBtn--primary"
                disabled={submitting}
              >
                {submitting && <span className="spinner" />}
                {submitting ? TEXT.COMMON.SAVING : TEXT.COMMON.SAVE}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
