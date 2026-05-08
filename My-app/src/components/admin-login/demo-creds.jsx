import Button from '../button';
import { IconKey } from '../icons';
import { DEMO_EMAIL, DEMO_PASSWORD } from '../../constants/pages/admin-login';

export default function DemoCreds({ onAutofill }) {
  return (
    <div className="demo-creds" role="note" aria-label="Demo credentials">
      <div className="demo-creds-header">
        <span className="demo-creds-badge">
          <IconKey />
          demo access
        </span>
        <Button type="button" variant="link" size="sm" onClick={onAutofill}>
          autofill ↵
        </Button>
      </div>
      <dl className="demo-creds-grid">
        <dt>email</dt>
        <dd><code>{DEMO_EMAIL}</code></dd>
        <dt>password</dt>
        <dd><code>{DEMO_PASSWORD}</code></dd>
      </dl>
    </div>
  );
}
