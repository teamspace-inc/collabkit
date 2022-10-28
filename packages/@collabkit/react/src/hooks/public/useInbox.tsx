import { useEffect } from 'react';
import { actions } from '@collabkit/client';
import { useSnapshot } from 'valtio';
import { useApp } from '../../hooks/useApp';
import { timelineUtils, WithID } from '@collabkit/core';
import type { Event } from '@collabkit/core';

export function useInbox(props: { filter: 'all' | 'open' }) {
  const { store } = useApp();
  const { workspaceId, workspaces, userId } = useSnapshot(store);

  const workspace = workspaceId ? workspaces[workspaceId] : null;

  const inbox = workspace?.inbox;

  useEffect(() => {
    actions.subscribeInbox(store);
  }, [workspaceId]);

  if (!inbox) {
    return { items: [] };
  }

  if (!userId) {
    return { items: [] };
  }

  if (!workspaceId) {
    return { items: [] };
  }

  // todo this won't scale so we should add a view to load
  // inboxResolved and inboxOpen
  const _items = inbox
    ? // show threads with latest activity first
      Object.keys(inbox)
        .sort((a, b) => {
          const aTime = +inbox[a].createdAt ?? 0;
          const bTime = +inbox[b].createdAt ?? 0;
          return bTime - aTime;
        })
        // filter out resolved threads
        ?.filter((threadId) =>
          props.filter === 'open'
            ? !(
                workspace.timeline?.[threadId] &&
                timelineUtils.computeIsResolved(workspace.timeline?.[threadId])
              )
            : true
        )
        .filter(Boolean)
    : [];

  let items: { [threadId: string]: { latestComment: WithID<Event>; isResolved: boolean } } = {};

  _items.forEach((threadId) => {
    items[threadId] = {
      latestComment: inbox[threadId],
      isResolved:
        workspace.timeline?.[threadId] &&
        timelineUtils.computeIsResolved(workspace.timeline?.[threadId]),
    };
  });

  return { items };
}
