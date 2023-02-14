import { CollabKitProvider, CustomTheme } from '@collabkit/react';
import * as themes from '@collabkit/custom-themes';
import { useSnapshot } from 'valtio';
import { Route, Switch, useLocation } from 'wouter';
import ReactFlowExample from './ReactFlowExample';
import { useTestParams } from './hooks/useTestParams';
import { useAppParams } from './hooks/useAppParams';
import { DashboardExample } from './dashboard/DashboardExample';
import { store } from './App';
import { DashboardStore, dashboardStore } from './dashboardStore';
import { Home } from './Home';
import { Logout } from './Logout';

export function Demo() {
  const { user } = useSnapshot(store);
  const { apiKey, appId, workspaceId, workspaceName } = useAppParams();
  const test = useTestParams();
  const [pathname] = useLocation();
  const name = pathname.slice(1);
  const theme: CustomTheme | undefined =
    name in themes ? themes[name as keyof typeof themes] : undefined;
  return (
    <CollabKitProvider
      _test={test}
      apiKey={apiKey}
      appId={appId}
      workspace={{ id: workspaceId, name: workspaceName }}
      callbacks={{
        onPinHover: (props) => {
          const state = props.state as DashboardStore;
          if (state) {
            if (state.selectedKpi) dashboardStore.selectedKpi = state.selectedKpi;
            if (state.selectedStatus) dashboardStore.selectedStatus = state.selectedStatus;
            if (state.selectedNames) dashboardStore.selectedNames = state.selectedNames;
            if (state.selectedTab) dashboardStore.selectedTab = state.selectedTab;
          }
        },
        onPinAttach: () => {
          return {
            selectedKpi: dashboardStore.selectedKpi,
            selectedStatus: dashboardStore.selectedStatus,
            selectedNames: dashboardStore.selectedNames,
            selectedTab: dashboardStore.selectedTab,
          };
        },
        onPinClick: (props) => {
          const state = props.state as DashboardStore;
          if (state) {
            if (state.selectedKpi) dashboardStore.selectedKpi = state.selectedKpi;
            if (state.selectedStatus) dashboardStore.selectedStatus = state.selectedStatus;
            if (state.selectedNames) dashboardStore.selectedNames = state.selectedNames;
            if (state.selectedTab) dashboardStore.selectedTab = state.selectedTab;
          }
        },
        onPinUnhover: (props) => {},
        onPinDeselect: (props) => {},
        // onInboxThreadClick: (data) => {
        //   // defining this overrides the default action for clicking an inbox item
        //   console.log('inbox thread, click', data);
        // },
        onTimestampClick: (data) => {
          console.log('timestamp, click', data);
        },
        onThreadCreated: (data) => {
          console.log('thread, created', data);
        },
        // onCommentSend: (data) => {
        //   console.log(data);
        // },
        // onMentionClick: (data) => {
        //   console.log('mention, click', data);
        // },
        // onInboxCloseButtonClick: (data) => {
        //   console.log('inbox close button, click', data);
        // },
        // onThreadResolve: (data) => console.log('resolve', data),
        // onThreadReopen: (data) => console.log('reopen', data),
      }}
      onAuthenticationRequired={() => {
        console.log('authRequired');
      }}
      // warning: this is a hack
      // this is the strangest thing, if we pass a snapshot into our product
      // it breaks our app, but if we stringify and then parse it, it works
      user={JSON.parse(JSON.stringify(user))}
      theme={theme}
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
      mentionableUsers={'allWorkspace'}
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
