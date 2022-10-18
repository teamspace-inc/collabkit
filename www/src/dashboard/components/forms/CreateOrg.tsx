import { dashboardEvents } from '../../dashboardEvents';

export function CreateOrg() {
  return (
    <div>
      <div style={{ alignItems: 'flex-start' }}>
        <h2>What's the name of your product or company?</h2>
        <p>
          This is the name your users and other admins will see. <br />
          <b>You can change this later.</b>
        </p>
        <div style={{ gap: '1rem' }}>
          <input
            placeholder="Ex. Acme or June Analytics"
            onChange={dashboardEvents.onCreateOrgInputChange}
            type="div/email"
          />
          <button onClick={dashboardEvents.onCreateOrgButtonClick}>Continue</button>
        </div>
      </div>
    </div>
  );
}
