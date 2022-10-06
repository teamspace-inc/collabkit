import { H2, Auth } from '../../UIKit';
import { devEvents } from '../devEvents';

export function CreateOrg() {
  return (
    <div>
      <Auth>
        <div style={{ alignItems: 'flex-start' }}>
          <H2>What's the name of your product or company?</H2>
          <div>
            This is the name your users and other admins will see. <br />
            <b>You can change this later.</b>
          </div>
          <div style={{ gap: '1rem' }}>
            <input
              placeholder="Ex. Acme or June Analytics"
              style={{
                width: '30ch',
                fontSize: '1.5rem',
                padding: '0.75rem 1.5rem',
                border: '2px solid #222',
                borderRadius: '100px',
              }}
              onChange={devEvents.onCreateOrgInputChange}
              type="div/email"
            />
            <button onClick={devEvents.onCreateOrgButtonClick}>Continue</button>
          </div>
        </div>
      </Auth>
    </div>
  );
}
