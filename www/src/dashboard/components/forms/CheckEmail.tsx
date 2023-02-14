import { dashboardStore } from '../../dashboardActions';
import { dashboardEvents } from '../../dashboardActions';
import { useSnapshot } from 'valtio';

export function CheckEmail() {
  const { forms } = useSnapshot(dashboardStore);

  return (
    <div>
      <div style={{ alignItems: 'flex-start' }}>
        <h2>Check your email</h2>
        <p>
          We've sent a magic link to <b>{forms.enterEmail?.email}</b> click on it to continue.
        </p>
        <div style={{ gap: '1rem' }}>
          <button onClick={() => dashboardEvents.onAuthFormSubmit()}>Resend Magic Link</button>
        </div>
      </div>
    </div>
  );
}
