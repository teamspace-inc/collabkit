import { Auth } from '../../UIKit';
import { devStore } from '../devStore';
import { useSnapshot } from 'valtio';
import { devEvents } from '../devEvents';

export function CheckEmail() {
  const { forms } = useSnapshot(devStore);

  return (
    <div>
      <Auth>
        <div style={{ alignItems: 'flex-start' }}>
          <h2>Check your email</h2>
          We've sent a magic link to <b>{forms.enterEmail?.email}</b> click on it to continue.
          <div style={{ gap: '1rem' }}>
            <button onClick={() => devEvents.onAuthFormSubmit()}>Resend Magic Link</button>
          </div>
        </div>
      </Auth>
    </div>
  );
}
