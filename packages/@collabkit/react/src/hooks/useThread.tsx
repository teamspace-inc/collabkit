import { useEffect, useRef } from 'react';
import { useSnapshot } from 'valtio';
import { actions } from '../actions';
import { Store, Workspace } from '../constants';

export function useThread(props: {
  store: Store;
  threadId: string;
  workspaceId: string;
  workspace: Workspace;
}) {
  const { threadId, workspaceId, workspace, store } = props;
  const { profiles, appState, config, isConnected, reactingId } = useSnapshot(store);
  // const profile = userId ? profiles[userId] : null;
  const timeline = workspace ? workspace.timeline[threadId] : null;
  const isEmpty = timeline ? Object.keys(timeline).length === 0 : true;

  const ref = useRef<HTMLDivElement>(null);

  // const intersection = useIntersectionObserver(ref, [props.threadId, props.type]);
  useEffect(() => {
    if (workspace && workspaceId) {
      actions.subscribeThread(store, { workspaceId, threadId });
    }
  }, [workspaceId, threadId, appState]);

  if (!workspaceId) {
    throw new Error('no workspaceId while rendering thread');
  }

  const target = { type: 'thread', threadId, workspaceId } as const;

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

  return { profiles, timeline, isResolved, isEmpty, target, ref, isConnected, reactingId };
}
