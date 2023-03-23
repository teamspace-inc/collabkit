import { useEffect } from 'react';
import { actions } from '@collabkit/client';
import { useSnapshot } from 'valtio';
import { useStore } from '../useStore';
import { useIsAuthenticated } from '../useIsAuthenticated';

export function useInbox(props: {
  filter?: 'all' | 'open';
  threadIds?: string[] | null;
  commentFilter?: (body: string) => boolean;
  direction?: 'asc' | 'desc';
}) {
  const filter = props.filter ?? 'open';
  const store = useStore();
  const { workspaceId, workspaces } = useSnapshot(store);

  const workspace = workspaceId ? workspaces[workspaceId] : null;

  const inbox = workspace?.inbox;

  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated) actions.subscribeInbox(store);
  }, [isAuthenticated]);

  if (!inbox || !isAuthenticated) {
    return [];
  }

  // todo this won't scale so we should add a view to load
  // inboxResolved and inboxOpen

  // todo move this to the store

  const threadIds = props.threadIds ?? Object.keys(inbox);
  const openThreadIds = threadIds
    // filter out resolved threads
    .filter((threadId) => {
      if (!threadId) return false;
      if (filter === 'open' && !workspace.isOpen[threadId]) return false;
      if (props.commentFilter) {
        const body = inbox[threadId]?.body;
        if (!props.commentFilter(body)) {
          return false;
        }
      }
      return true;
    });
  openThreadIds.sort((a, b) => {
    const aTime = +inbox[a]?.createdAt ?? 0;
    const bTime = +inbox[b]?.createdAt ?? 0;
    return props.direction === 'asc' ? aTime - bTime : bTime - aTime;
  });
  return openThreadIds;
}
