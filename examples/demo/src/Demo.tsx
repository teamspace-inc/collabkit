import { CollabKitProvider } from '@collabkit/react';
import { useSnapshot } from 'valtio';
import { Route, Switch } from 'wouter';
import ReactFlowExample from './ReactFlowExample';
import { useTestParams } from './hooks/useTestParams';
import { useAppParams } from './hooks/useAppParams';
import { DashboardExample } from './dashboard/DashboardExample';
import { store } from './store';
import { DashboardStore, dashboardStore } from './dashboardStore';
import { Home } from './Home';
import { Logout } from './Logout';

export function Demo() {
  const { user } = useSnapshot(store);
  const { apiKey, appId, workspaceId, workspaceName } = useAppParams();
  const test = useTestParams();
  return (
    <CollabKitProvider
      _test={test}
      apiKey={apiKey}
      appId={appId}
      workspace={{ id: workspaceId, name: workspaceName }}
      onPinHover={(props) => {}}
      onPinAttach={() => {
        return JSON.stringify({
          selectedKpi: dashboardStore.selectedKpi,
          selectedStatus: dashboardStore.selectedStatus,
          selectedNames: dashboardStore.selectedNames,
          selectedTab: dashboardStore.selectedTab,
        });
      }}
      onPinClick={(props) => {
        try {
          if (!props.meta) return;
          const meta = JSON.parse(props.meta) as DashboardStore | null;
          if (meta) {
            if (meta.selectedKpi) dashboardStore.selectedKpi = meta.selectedKpi;
            if (meta.selectedStatus) dashboardStore.selectedStatus = meta.selectedStatus;
            if (meta.selectedNames) dashboardStore.selectedNames = meta.selectedNames;
            if (meta.selectedTab) dashboardStore.selectedTab = meta.selectedTab;
          }
        } catch (e) {}
      }}
      onPinUnhover={(props) => {}}
      onPinDeselect={(props) => {}}
      // onInboxThreadClick: (data) => {
      //   // defining this overrides the default action for clicking an inbox item
      //   console.log('inbox thread, click', data);
      // },
      onTimestampClick={(data) => {
        console.log('timestamp, click', data);
      }}
      onThreadCreated={(data) => {
        console.log('thread, created', data);
      }}
      onAuthenticationRequired={() => {
        console.log('authRequired');
      }}
      // warning: this is a hack
      // this is the strangest thing, if we pass a snapshot into our product
      // it breaks our app, but if we stringify and then parse it, it works
      user={JSON.parse(JSON.stringify(user))}
      // theme="dark"
      // renderAvatar={CustomAvatar}
      // renderThreadContextPreview={() => {
      //   return (
      //     <div
      //       style={{
      //         width: '100%',
      //         height: 38,
      //         background: '#F5F8FA',
      //         borderRadius: 8,
      //       }}
      //     ></div>
      //   );
      // }}
      mentionableUsers="allWorkspace"
    >
      <Switch>
        <Route path="/reactflow" component={ReactFlowExample} />
        <Route path="/dashboard" component={DashboardExample} />
        <Route path="/" component={Home} />
        <Route path="/thread" component={Home} />
        <Route path="/logout" component={Logout} />
      </Switch>
    </CollabKitProvider>
  );
}
