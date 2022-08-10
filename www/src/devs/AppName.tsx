import { useState } from 'react';
import { devEvents } from './devEvents';
import { App } from './devTypes';

export function AppName(props: { app: App }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      <label>
        {isEditing ? (
          <span>
            <input
              style={{ fontSize: '1rem' }}
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
