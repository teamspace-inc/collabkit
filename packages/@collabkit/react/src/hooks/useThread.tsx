import { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { actions } from '@collabkit/client';
import { ThreadInfo, timelineUtils } from '@collabkit/core';
import { Store } from '../constants';
import { useComposer } from './useComposer';
import { useApp } from './useApp';

export function useThreadSubscription(props: {
  store: Store;
  threadId: string;
  workspaceId?: string | null;
}) {
  const { store, threadId, workspaceId } = props;
  const { isSignedIn } = useSnapshot(store);
  useEffect(() => {
    if (workspaceId && isSignedIn) {
      actions.subscribeThread(store, {
        workspaceId,
        threadId,
      });
    }
  }, [workspaceId, threadId, isSignedIn]);
}

export function useThread(props: {
  threadId: string;
  workspaceId?: string | null;
  info?: ThreadInfo;
  meta?: unknown;
}) {
  const { store } = useApp();
  const { threadId, workspaceId, info } = props;
  const { isSignedIn, workspaces } = useSnapshot(store);
  const workspace = workspaceId ? workspaces[workspaceId] : null;
  const timeline = workspace ? workspace.timeline[threadId] : null;

  const isEmpty = timeline
    ? timelineUtils.countMessages(timeline) === 0
    : workspace?.likelyFetchedAllProfiles;

  useThreadSubscription({ store, threadId, workspaceId });

  const seenUntil = workspace?.seen[threadId];

  const target = workspaceId ? ({ type: 'thread', threadId, workspaceId } as const) : null;

  const isResolved = timeline ? timelineUtils.computeIsResolved(timeline) : false;

  useEffect(() => {
    if (workspaceId && isSignedIn && !isEmpty) {
      // only make this delete info if null is explicitly
      // provided as a value, undefined should be a noop
      actions.saveThreadInfo(store, {
        workspaceId,
        threadId,
        isOpen: !isEmpty && !isResolved,

        info: {
          url: info?.url ?? window.location.href.toString(),
          ...(info?.name ? { name: info.name } : null),
          ...(info?.meta ? { meta: info.meta } : null),
        },
      });
    }
  }, [workspaceId, threadId, isSignedIn, info, info?.name, isEmpty, isResolved]);

  const groupedTimeline = timeline ? timelineUtils.groupedTimeline(timeline) : null;

  return {
    timeline,
    seenUntil,
    isResolved,
    isEmpty,
    target,
    ...groupedTimeline,
  };
}
