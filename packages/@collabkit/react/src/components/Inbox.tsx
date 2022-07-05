import { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { actions } from '../actions';
import { useApp } from './App';
import { styled } from './UIKit';
import { useWorkspace, WorkspaceLoader } from './WorkspaceLoader';

const unreadStyle = {
  variants: {
    isUnread: {
      true: {
        fontWeight: '600',
        color: '$neutral12',
      },
    },
  },
};

const StyledInbox = styled('div', {
  borderRadius: 11,
  background: '$neutral1',
  maxWidth: '320px',
  border: '1px solid rgba(0,0,0,0.1)',
});

const StyledInboxItem = styled(
  'div',
  {
    cursor: 'pointer',
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
    '&:hover': {
      background: '$neutral3',
      '&:first-of-type': {
        borderTopLeftRadius: 11,
        borderTopRightRadius: 11,
      },
      '&:last-of-type': {
        borderBottomRightRadius: 11,
        borderBottomLeftRadius: 11,
      },
    },
  },
  unreadStyle
);

const StyledThreadName = styled(
  'div',
  {
    fontWeight: 500,
    fontSize: 14,
    lineHeight: '20px',
    color: '$neutral11',
  },
  unreadStyle
);

const StyledThreadMessagePreview = styled(
  'div',
  {
    color: '$neutral11',
    overflow: 'hidden',
    wordBreak: 'none',
    characterBreak: 'none',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  unreadStyle
);

function _Inbox() {
  const { store } = useApp();
  const { profiles, appState } = useSnapshot(store);
  const { workspace } = useWorkspace();

  const inboxIds = Object.keys(workspace.inbox);

  useEffect(() => {
    if (appState !== 'ready') return;
    actions.subscribeInbox(store);
  }, [appState]);

  return inboxIds ? (
    <div style={{ width: '100%' }}>
      <StyledInbox style={{ width: '100%' }}>
        {inboxIds
          .sort((a, b) => (workspace.inbox[a].createdAt <= workspace.inbox[b].createdAt ? 1 : -1))
          .map((threadId) => {
            const event = workspace.inbox[threadId];
            const profile = profiles[event?.createdById || ''];
            const seen = workspace.seen[threadId];
            const isUnread = seen < event.id;
            return (
              <StyledInboxItem key={threadId} isUnread={isUnread}>
                <StyledThreadName isUnread={isUnread}>{event?.name || 'Unnamed'}</StyledThreadName>
                <StyledThreadMessagePreview isUnread={isUnread}>
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
