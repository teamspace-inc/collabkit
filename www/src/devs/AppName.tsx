import { useState } from 'react';
import { events } from './events';
import { App } from './types';

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
              onChange={(e) => events.onAppNameChange({ appId: props.app.appId, e })}
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
