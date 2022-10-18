import { App } from '../dashboardTypes';
import { useState } from 'react';
import { dashboardEvents } from '../dashboardEvents';
import {
  appName,
  dashboardApp,
  dashboardAppItem,
  dashboardAppItemKey,
} from '../../styles/Dashboard.css';

function AppName(props: { app: App }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(props.app.name ?? '');

  return (
    <div>
      <label>
        {isEditing ? (
          <span>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={props.app.name ?? ''}
              placeholder="Unnamed"
            />
            <button
              onClick={(e) => {
                setIsEditing(false);
                dashboardEvents.onAppNameChange({ appId: props.app.appId, name });
              }}
            >
              Done
            </button>
          </span>
        ) : (
          <h1 className={appName} onClick={() => setIsEditing(true)}>
            {props.app.name}
          </h1>
        )}
      </label>
    </div>
  );
}

function Keys(props: { keys: { [key: string]: boolean } }) {
  const keys = Object.keys(props.keys)
    // only active keys
    .filter((key) => props.keys[key]);

  // only 1 key should be active
  if (keys.length > 1) {
    console.warn('[collabkit] More than 1 key active at a time');
  }

  return (
    <div>
      <input type="password" value={keys[0] ?? ''} />
      <a>Show</a>
      <a>Copy</a>
    </div>
  );
}

export function DashboardApp(props: { app: App }) {
  const { app } = props;
  return (
    <div className={dashboardApp}>
      <div style={{ marginTop: '12px', marginBottom: '24px' }}>
        <AppName app={app} />
      </div>
      <div className={dashboardAppItem}>
        <div className={dashboardAppItemKey}>App ID</div>
        <code>{props.app.appId}</code>
      </div>
      <div className={dashboardAppItem}>
        <div className={dashboardAppItemKey}>API Key</div>
        <Keys keys={app.keys} />
        <a>Regenerate</a>
      </div>
      <div className={dashboardAppItem}>
        <div className={dashboardAppItemKey}>Secure Mode</div>
        <div>{app.mode === 'SECURED' ? 'ON' : 'OFF'}</div>
        <a>Turn ON secure mode</a>
      </div>
      <div className={dashboardAppItem}>
        <div className={dashboardAppItemKey}>Notification Emails</div>
        <div>{app.isEmailDisabled ? 'OFF' : 'ON'}</div>
        <a>Turn ON notification emails</a>
      </div>
    </div>
  );
}
