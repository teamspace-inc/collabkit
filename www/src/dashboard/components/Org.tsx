import { dashboardStore } from '../dashboardActions';
import { useSnapshot } from 'valtio';
import { DashboardApp } from './DashboardApp';

export function Org() {
  const { apps } = useSnapshot(dashboardStore);
  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          borderBottom: '1px solid #333',
          marginBottom: '20px',
        }}
      >
        <h1>Your Apps</h1>
        <div style={{ flex: 1 }} />
        {/* <button>Create New App</button> */}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {Object.values(apps).map((app) => {
          return <DashboardApp app={app} />;
        })}
      </div>
    </div>
  );
}
