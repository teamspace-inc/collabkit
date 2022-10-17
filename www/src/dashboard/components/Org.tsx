import { dashboardStore } from '../dashboardStore';
import { useSnapshot } from 'valtio';
import { AppListItem } from './AppListItem';

export function Org() {
  const { org, apps } = useSnapshot(dashboardStore);
  return (
    <div style={{ padding: 60 }}>
      <div>
        Logo
        <div>Projects</div>
        <div>
          <div>{org?.name}</div>
        </div>
      </div>

      <div>
        Project
        <h2>{org?.name}</h2>
      </div>

      <h5>API credentials</h5>

      {Object.values(apps).map((app) => {
        return <AppListItem app={app} />;
        // return <Text key={app.appId}>{app.name}</Text>;
      })}
    </div>
  );
}
