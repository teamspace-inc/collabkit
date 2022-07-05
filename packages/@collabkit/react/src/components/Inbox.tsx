import { useContext, useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { actions } from '../actions';
import { useApp } from './App';
import { styled } from './UIKit';
import { WorkspaceIDContext } from './Workspace';
import { WorkspaceContext, WorkspaceLoader } from './WorkspaceLoader';

const StyledInboxItem = styled('div', {
  background: '$neutral1',
  padding: '10px 10px',
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  borderBottom: '1px solid $neutral4',
});

const StyledThreadName = styled('div', {
  fontWeight: 600,
});

function _Inbox() {
  const { store } = useApp();
  const { profiles } = useSnapshot(store!);
  const { workspace } = useContext(WorkspaceContext);
  const inboxIds = workspace ? Object.keys(workspace.inbox) : null;
  if (store === null) {
    return null;
  }
  const { appState } = useSnapshot(store);

  useEffect(() => {
    if (!store) return;
    if (appState !== 'ready') return;
    actions.subscribeInbox(store);
  }, [appState]);

  return inboxIds ? (
    <div style={{ width: '100%' }}>
      <h5>Recent Threads</h5>
      {inboxIds.map((threadId) => {
        const event = workspace?.inbox[threadId];
        const profile = profiles[event?.createdById || ''];
        return (
          <StyledInboxItem key={threadId}>
            <StyledThreadName>{event?.name || 'Unnamed'}</StyledThreadName>
            {profile?.name}: {event?.body}
          </StyledInboxItem>
        );
      })}
    </div>
  ) : (
    <div>No inbox</div>
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
