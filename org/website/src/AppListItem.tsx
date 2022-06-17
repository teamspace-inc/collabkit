import { events, App } from './App';
import { Switch, SwitchLabel, SwitchThumb } from './Switch';
import { HStack, Code } from './Dashboard';

export function AppListItem(props: { app: App }) {
  const { app } = props;
  return (
    <HStack style={{ padding: 10, gap: '10px' }}>
      <div>
        <label>
          <input
            type="text"
            onChange={(e) => events.onAppNameChange({ appId: app.appId, e })}
            value={app.name ?? ''}
            placeholder={'Unnamed'}
          />
        </label>
      </div>
      {app.name ?? 'Unnamed'} - {app.appId} - <Code>{JSON.stringify(app.keys)}</Code>
      <HStack align={'center'} style={{ gap: '6px' }}>
        <Switch checked={app.mode === 'SECURED'} id="s1">
          <SwitchThumb />
        </Switch>
        <SwitchLabel>{app.mode}</SwitchLabel>
      </HStack>
    </HStack>
  );
}
