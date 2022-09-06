import { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { actions } from '@collabkit/client';
import { ThreadInfo, timelineUtils } from '@collabkit/core';
import { Store } from '../constants';

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
  store: Store;
  threadId: string;
  workspaceId?: string | null;
  info?: ThreadInfo;
  meta?: unknown;
}) {
  const { threadId, workspaceId, store, info } = props;
  const { isSignedIn, workspaces } = useSnapshot(store);
  const workspace = workspaceId ? workspaces[workspaceId] : null;
  const timeline = workspace ? workspace.timeline[threadId] : null;

  const isEmpty = timeline
    ? Object.keys(timeline).length === 0
    : workspace?.likelyFetchedAllProfiles;

  useThreadSubscription({ store, threadId, workspaceId });

  const seenUntil = workspace?.seen[threadId];

  const target = workspaceId ? ({ type: 'thread', threadId, workspaceId } as const) : null;

  const systemEventIds = timeline
    ? Object.keys(timeline).filter(
        (eventId) =>
          (timeline[eventId].type === 'system' && timeline[eventId].system === 'resolve') ||
          timeline[eventId].system === 'reopen'
      )
    : [];

  // todo use data from view instead of calculating this from
  // retreived eventsc
  const isResolved = !!(
    timeline &&
    systemEventIds.length > 0 &&
    timeline[systemEventIds[systemEventIds.length - 1]].system === 'resolve'
  );

  const disabled =
    workspaceId && threadId
      ? workspaces[workspaceId]?.composers[threadId]?.sendButtonDisabled
      : true;

  useEffect(() => {
    if (workspaceId && isSignedIn && !isEmpty) {
      actions.saveThreadInfo(store, {
        workspaceId,
        threadId,
        isOpen: !isEmpty && !isResolved,
        // todo only make this delete info if null is explicitly
        // provided as a value, undefined should be a noop
        info: {
          url: info?.url ?? window.location.href.toString(),
          name: info?.name || null,
          meta: info?.meta || null,
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
    disabled,
    ...groupedTimeline,
  };
}
