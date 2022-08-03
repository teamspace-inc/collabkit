import { Switch, SwitchLabel, SwitchThumb } from './Switch';
import { HStack } from '../UIKit';
import { App } from './devTypes';
import { AppName } from './AppName';

export function AppListItem(props: { app: App }) {
  const { app } = props;
  return (
    <HStack style={{ padding: '1rem', gap: '2rem', fontSize: '1rem' }}>
      <AppName app={app} />
      {app.name ?? 'Unnamed'} - {app.appId} - <code>{JSON.stringify(app.keys)}</code>
      <HStack style={{ alignItems: 'center', gap: '0.5rem' }}>
        <Switch checked={app.mode === 'SECURED'} id="s1">
          <SwitchThumb />
        </Switch>
        <SwitchLabel>{app.mode}</SwitchLabel>
      </HStack>
    </HStack>
  );
}
