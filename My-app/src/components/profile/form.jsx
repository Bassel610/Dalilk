import Input from '../input';
import Button from '../button';
import FormSection from '../form-section';
import ProfileField from './field';
import { TEXT } from '../../constants/app/ui-text';
import { PROFILE_SECTIONS } from '../../constants/pages/profile';

function renderFields(keys, form, setField) {
  return keys.map((k) => (
    <ProfileField key={k} name={k} value={form[k]} onChange={setField} />
  ));
}

export default function ProfileForm({ form, setField, submit, reset, submitting, user }) {
  return (
    <form className="ProfileForm" onSubmit={submit}>
      <header className="ProfileForm-header">
        <h1>{TEXT.PROFILE.TITLE}</h1>
        <p>{TEXT.PROFILE.SUMMARY_HINT}</p>
      </header>

      <FormSection title={PROFILE_SECTIONS.account.title} layout="grid">
        {renderFields(PROFILE_SECTIONS.account.fields, form, setField)}
        <Input
          label={TEXT.PROFILE.EMAIL_READONLY}
          value={user?.email || ''}
          onChange={() => {}}
          disabled
          readOnly
        />
      </FormSection>

      <FormSection title={PROFILE_SECTIONS.contact.title} layout="grid">
        {renderFields(PROFILE_SECTIONS.contact.fields, form, setField)}
      </FormSection>

      <FormSection title={PROFILE_SECTIONS.address.title} layout="grid">
        {renderFields(PROFILE_SECTIONS.address.fields, form, setField)}
      </FormSection>

      <FormSection title={PROFILE_SECTIONS.location.title} layout="single">
        {renderFields(PROFILE_SECTIONS.location.fields, form, setField)}
      </FormSection>

      <FormSection title={PROFILE_SECTIONS.notes.title} layout="single">
        {renderFields(PROFILE_SECTIONS.notes.fields, form, setField)}
      </FormSection>

      <div className="ProfileForm-actions">
        <Button
          type="button"
          variant="ghost"
          disabled={submitting}
          onClick={reset}
        >
          {TEXT.COMMON.CANCEL}
        </Button>
        <Button
          type="submit"
          variant="primary"
          loading={submitting}
        >
          {submitting ? TEXT.COMMON.SAVING : TEXT.COMMON.SAVE}
        </Button>
      </div>
    </form>
  );
}
