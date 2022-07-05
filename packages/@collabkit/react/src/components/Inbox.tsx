import { useContext, useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { actions } from '../actions';
import { useApp } from './App';
import { styled } from './UIKit';
import { useWorkspaceId, WorkspaceIDContext } from './Workspace';
import { useWorkspace, WorkspaceContext, WorkspaceLoader } from './WorkspaceLoader';

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
  gap: '2px',
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
  const { workspace } = useWorkspace();
  const { appState } = useSnapshot(store);

  const inboxIds = workspace ? Object.keys(workspace.inbox) : null;

  useEffect(() => {
    if (appState !== 'ready') return;
    actions.subscribeInbox(store);
  }, [appState]);

  return inboxIds ? (
    <div style={{ width: '100%' }}>
      <StyledInbox style={{ width: '100%' }}>
        {inboxIds
          .sort((a, b) =>
            (workspace?.inbox[a].createdAt ?? 0) <= (workspace?.inbox[b].createdAt ?? 0) ? 1 : -1
          )
          .map((threadId) => {
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
  return (
    <WorkspaceLoader>
      <_Inbox />
    </WorkspaceLoader>
  );
}
