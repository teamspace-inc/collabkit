import { events, App } from './App';
import { Switch, SwitchLabel, SwitchThumb } from './Switch';
import { HStack, Code } from './Dashboard';
import { useState } from 'react';

function Name(props: { app: App }) {
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

export function AppListItem(props: { app: App }) {
  const { app } = props;
  return (
    <HStack style={{ padding: '1rem', gap: '2rem', fontSize: '1rem' }}>
      <Name app={app} />
      {app.name ?? 'Unnamed'} - {app.appId} - <Code>{JSON.stringify(app.keys)}</Code>
      <HStack align={'center'} style={{ gap: '0.5rem' }}>
        <Switch checked={app.mode === 'SECURED'} id="s1">
          <SwitchThumb />
        </Switch>
        <SwitchLabel>{app.mode}</SwitchLabel>
      </HStack>
    </HStack>
  );
}
