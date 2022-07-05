import { useContext, useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { actions } from '../actions';
import { useApp } from './App';
import { WorkspaceIDContext } from './Workspace';
import { WorkspaceContext, WorkspaceLoader } from './WorkspaceLoader';

function _Inbox() {
  const { store } = useApp();
  const { workspace } = useContext(WorkspaceContext);
  const timelines = workspace ? Object.keys(workspace.timeline) : null;
  if (store === null) {
    return null;
  }
  const { appState } = useSnapshot(store);

  useEffect(() => {
    if (!store) return;
    if (appState !== 'ready') return;
    actions.subscribeInbox(store);
  }, [appState]);

  return timelines ? (
    <div>
      <h5>Recent Threads</h5>
      {timelines.map((timeline) => {
        return <div key={timeline}>{timeline}</div>;
      })}
    </div>
  ) : (
    <div>No timelines</div>
  );
}

export function Inbox() {
  const { workspaceId } = useContext(WorkspaceIDContext);
  const { store } = useApp();
  const { workspaces } = useSnapshot(store!);

  if (workspaceId == null) {
    return null;
  }

  const workspace = workspaces[workspaceId];

  if (workspace == null) {
    return null;
  }

  return (
    <WorkspaceLoader>
      <_Inbox />
    </WorkspaceLoader>
  );
}
