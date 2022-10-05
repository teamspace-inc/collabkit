import { Button, Text, Page, H2, Auth } from '../../UIKit';
import { devEvents } from '../devEvents';

export function CreateOrg() {
  return (
    <Page>
      <Auth>
        <div style={{ alignItems: 'flex-start' }}>
          <H2>What's the name of your product or company?</H2>
          <Text>
            This is the name your users and other admins will see. <br />
            <b>You can change this later.</b>
          </Text>
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
              type="text/email"
            />
            <Button onClick={devEvents.onCreateOrgButtonClick}>Continue</Button>
          </div>
        </div>
      </Auth>
    </Page>
  );
}
