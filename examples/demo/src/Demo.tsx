import { CollabKitProvider } from '@collabkit/react';
import { Route, Switch } from 'wouter';
import ReactFlowExample from './ReactFlowExample';
import { useTestParams } from './hooks/useTestParams';
import { DashboardExample } from './dashboard/DashboardExample';
import { DashboardStore, dashboardStore } from './dashboardStore';
import { Home } from './Home';
import { Logout } from './Logout';

type Props = {
  appId: string;
  token: string;
};

export function Demo(props: Props) {
  const test = useTestParams();
  return (
    <CollabKitProvider
      _test={test}
      appId={props.appId}
      token={props.token}
      theme="dark"
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
