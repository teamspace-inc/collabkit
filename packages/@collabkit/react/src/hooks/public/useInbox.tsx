import { useEffect } from 'react';
import { actions } from '@collabkit/client';
import { useSnapshot } from 'valtio';
import { useApp } from '../../hooks/useApp';
import { timelineUtils } from '@collabkit/core';

export function useInbox(props: { filter: 'all' | 'open' }) {
  const { store } = useApp();
  const { workspaceId, workspaces, userId } = useSnapshot(store);

  const workspace = workspaceId ? workspaces[workspaceId] : null;

  const inbox = workspace?.inbox;

  useEffect(() => {
    actions.subscribeInbox(store);
  }, [workspaceId]);

  if (!inbox) {
    return [];
  }

  if (!userId) {
    return [];
  }

  if (!workspaceId) {
    return [];
  }

  // todo this won't scale so we should add a view to load
  // inboxResolved and inboxOpen
  const threadIds = inbox
    ? // show threads with latest activity first
    Object.keys(inbox)
      // filter out resolved threads
      ?.filter((threadId) =>
        ((props.filter === 'open')
          ? !(
            workspace.timeline?.[threadId] &&
            timelineUtils.computeIsResolved(workspace.timeline?.[threadId])
          )
          : true) && !inbox[threadId].parentId
      )
    : [];

  return threadIds;
}
