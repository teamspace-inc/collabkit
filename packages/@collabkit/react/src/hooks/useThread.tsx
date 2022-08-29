import { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { actions } from '@collabkit/client';
import type { ThreadInfo } from '@collabkit/core';
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
}) {
  const { threadId, workspaceId, store, info } = props;
  const { isSignedIn, workspaces } = useSnapshot(store);
  const workspace = workspaceId ? workspaces[workspaceId] : null;
  const timeline = workspace ? workspace.timeline[threadId] : null;
  const isEmpty = timeline ? Object.keys(timeline).length === 0 : true;

  useThreadSubscription({ store, threadId, workspaceId });

  useEffect(() => {
    if (workspaceId && isSignedIn) {
      actions.saveThreadInfo(store, {
        workspaceId,
        threadId,
        info: {
          url: info?.url ?? window.location.href.toString(),
          name: info?.name || null,
        },
      });
    }
  }, [workspaceId, threadId, isSignedIn, info, info?.name]);

  const seenUntil = workspace?.seen[threadId];

  const target = workspaceId ? ({ type: 'thread', threadId, workspaceId } as const) : null;

  const systemEventIds = timeline
    ? Object.keys(timeline).filter(
        (eventId) =>
          (timeline[eventId].type === 'system' && timeline[eventId].system === 'resolve') ||
          timeline[eventId].system === 'reopen'
      )
    : [];

  const isResolved = !!(
    timeline &&
    systemEventIds.length > 0 &&
    timeline[systemEventIds[systemEventIds.length - 1]].system === 'resolve'
  );

  return {
    timeline,
    seenUntil,
    isResolved,
    isEmpty,
    target,
  };
}

// Reads thread resolved status without saving a thread
export function useThreadStatus({
  store,
  threadId,
  workspaceId,
}: {
  store: Store;
  threadId: string;
  workspaceId: string | null;
}) {
  const { workspaces } = useSnapshot(store);
  const workspace = workspaceId ? workspaces[workspaceId] : null;
  const timeline = workspace ? workspace.timeline[threadId] : null;

  useThreadSubscription({ store, threadId, workspaceId });

  const isEmpty = Object.keys(timeline ?? {}).length === 0;

  const systemEventIds = timeline
    ? Object.keys(timeline).filter(
        (eventId) =>
          (timeline[eventId].type === 'system' && timeline[eventId].system === 'resolve') ||
          timeline[eventId].system === 'reopen'
      )
    : [];

  const isResolved = !!(
    timeline &&
    systemEventIds.length > 0 &&
    timeline[systemEventIds[systemEventIds.length - 1]].system === 'resolve'
  );
  return {
    isEmpty,
    isResolved,
  };
}
