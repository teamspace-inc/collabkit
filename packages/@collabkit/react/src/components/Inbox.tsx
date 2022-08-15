import { inboxStyles } from '@collabkit/theme';
import { styled } from '@stitches/react';
import React, { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { actions } from '../actions';
import { useApp } from '../hooks/useApp';
import { useWorkspace } from '../hooks/useWorkspace';

const StyledInbox = styled('div', inboxStyles.inbox);
const StyledInboxItem = styled('div', inboxStyles.inboxItem);
const StyledThreadName = styled('div', inboxStyles.threadName);
const StyledThreadMessagePreview = styled('div', inboxStyles.threadMessagePreview);

export function Inbox() {
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
      <StyledInbox style={{ width: '100%', maxHeight: 500, overflow: 'scroll' }}>
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
