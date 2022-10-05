import { Switch, SwitchThumb } from './Switch';
import { H4 } from '../UIKit';
import { App } from './devTypes';
import { useState } from 'react';
import { devEvents } from './devEvents';
import { Trash } from 'phosphor-react';

function AppName(props: { app: App }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      <label>
        {isEditing ? (
          <span>
            <input
              style={{ fontSize: '1.25rem' }}
              type="text"
              onChange={(e) => devEvents.onAppNameChange({ appId: props.app.appId, e })}
              value={props.app.name ?? ''}
              placeholder={'Unnamed'}
            />
            <button onClick={() => setIsEditing(false)}>Done</button>
          </span>
        ) : (
          <span onClick={() => setIsEditing(true)} style={{ fontWeight: 'bold' }}>
            {props.app.name}
          </span>
        )}
      </label>
    </div>
  );
}

function Keys(props: { keys: { [key: string]: boolean } }) {
  return (
    <div>
      {Object.keys(props.keys).map((key) => {
        return <div>{key}</div>;
      })}
    </div>
  );
}

export function AppListItem(props: { app: App }) {
  const { app } = props;
  return (
    <div style={{ padding: '1rem 0', fontSize: '1.25rem' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 48px 48px',
          background: 'rgba(0,0,0,0.02)',
          padding: '4rem',
          borderRadius: '24px',
        }}
      >
        <AppName app={app} />
        <H4>AppId: {app.appId}</H4>
        <Keys keys={app.keys} />
        <div style={{ alignItems: 'center', gap: '0.5rem' }}>
          <Switch checked={app.mode === 'SECURED'} id="s1">
            <SwitchThumb />
          </Switch>
        </div>
        <button>
          <Trash />
        </button>
      </div>
    </div>
  );
}
