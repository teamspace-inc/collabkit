import { useSnapshot } from 'valtio';
import { AppListItem } from './AppListItem';
import { Preview } from './Preview';
import { store } from './store';
import { events } from './events';
import { Button } from './UIKit';

export function AppList() {
  const { apps } = useSnapshot(store);
  const appList = (
    <ol>
      {Object.keys(apps).map((id) => (
        <li key={id}>
          <AppListItem app={apps[id]} />
        </li>
      ))}
    </ol>
  );
  const selectedAppId = Object.keys(apps)?.[0];

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Apps</h1>
      {appList}
      <Button type="cta" onClick={events.onCreateAppButtonClick}>
        Create new app
      </Button>
      {/* <textarea value={idToken ?? ''} /> */}
      {selectedAppId ? (
        <Preview
          appId={selectedAppId}
          apiKey={Object.keys(apps[selectedAppId].keys)[0]}
          mode={apps[selectedAppId].mode}
        />
      ) : null}
    </div>
  );
}
