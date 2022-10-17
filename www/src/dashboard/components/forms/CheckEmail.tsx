import { Auth } from '../../../UIKit';
import { dashboardStore } from '../../dashboardStore';
import { useSnapshot } from 'valtio';
import { dashboardEvents } from '../../dashboardEvents';

export function CheckEmail() {
  const { forms } = useSnapshot(dashboardStore);

  return (
    <div>
      <Auth>
        <div style={{ alignItems: 'flex-start' }}>
          <h2>Check your email</h2>
          We've sent a magic link to <b>{forms.enterEmail?.email}</b> click on it to continue.
          <div style={{ gap: '1rem' }}>
            <button onClick={() => dashboardEvents.onAuthFormSubmit()}>Resend Magic Link</button>
          </div>
        </div>
      </Auth>
    </div>
  );
}
