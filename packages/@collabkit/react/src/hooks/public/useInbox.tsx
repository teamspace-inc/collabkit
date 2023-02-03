import { useEffect } from 'react';
import { actions } from '@collabkit/client';
import { useSnapshot } from 'valtio';
import { useApp } from '../../hooks/useApp';
import { timelineUtils } from '@collabkit/core';

export function useInbox(props: {
  filter: 'all' | 'open';
  threadIds?: string[];
  direction?: 'asc' | 'desc';
  latestFirst?: boolean;
}) {
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

  const threadIds = props.threadIds ?? Object.keys(inbox);
  const openThreadIds = threadIds
    // filter out resolved threads
    .filter(
      (threadId) =>
        threadId &&
        (props.filter === 'open'
          ? !(
              workspace.timeline?.[threadId] &&
              timelineUtils.computeIsResolved(workspace.timeline?.[threadId])
            )
          : true)
    );
  if (props.latestFirst) {
    // show threads with latest activity first
    openThreadIds.sort((a, b) => {
      const aTime = +inbox[a]?.createdAt ?? 0;
      const bTime = +inbox[b]?.createdAt ?? 0;
      return props.direction === 'asc' ? aTime - bTime : bTime - aTime;
    });
  }
  return openThreadIds;
}
