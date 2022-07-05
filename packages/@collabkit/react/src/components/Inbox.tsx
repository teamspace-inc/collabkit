import { useContext, useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { actions } from '../actions';
import { useApp } from './App';
import { styled } from './UIKit';
import { WorkspaceIDContext } from './Workspace';
import { WorkspaceContext, WorkspaceLoader } from './WorkspaceLoader';

const StyledInbox = styled('div', {
  borderRadius: 11,
  background: '$neutral1',
  maxWidth: '320px',
  border: '1px solid rgba(0,0,0,0.1)',
});

const StyledInboxItem = styled('div', {
  padding: '10px 20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
  borderBottom: '1px solid $neutral4',
  fontSize: 14,
  lineHeight: '20px',
  '&:last-of-type': {
    borderBottom: 0,
  },
});

const StyledThreadName = styled('div', {
  fontWeight: 500,
  fontSize: 14,
  lineHeight: '20px',
});

const StyledThreadMessagePreview = styled('div', {
  color: '$neutral12',
  overflow: 'hidden',
  wordBreak: 'none',
  characterBreak: 'none',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
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
      <StyledInbox style={{ width: '100%' }}>
        {inboxIds.map((threadId) => {
          const event = workspace?.inbox[threadId];
          const profile = profiles[event?.createdById || ''];
          return (
            <StyledInboxItem key={threadId}>
              <StyledThreadName>{event?.name || 'Unnamed'}</StyledThreadName>
              <StyledThreadMessagePreview>
                {profile?.name}: {event?.body}
              </StyledThreadMessagePreview>
            </StyledInboxItem>
          );
        })}
      </StyledInbox>
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
