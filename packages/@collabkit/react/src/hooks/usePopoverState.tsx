import { useCallback, useMemo } from 'react';
import { useApp } from '../hooks/useApp';
import { useSnapshot } from 'valtio';
import { ThreadLocator, ThreadTarget } from '@collabkit/core';
import { useExistingThreadId } from './useExistingThreadId';

export type PopoverState = 'open' | 'preview' | 'closed';

export function usePopoverStateInternal(props: {
  threadId: string | null;
}): [PopoverState, (state: PopoverState) => void] {
  const { threadId } = props;
  const { store } = useApp();
  const { viewingId, previewingId, workspaceId } = useSnapshot(store);
  const threadOpen = viewingId?.type === 'thread' && viewingId.threadId === threadId;
  const previewOpen = previewingId?.type === 'thread' && previewingId.threadId === threadId;

  const target = useMemo<ThreadTarget | null>(
    () =>
      workspaceId && threadId
        ? {
            type: 'thread',
            threadId,
            workspaceId,
          }
        : null,
    [threadId, workspaceId]
  );

  const setPopoverState = useCallback(
    (state: PopoverState) => {
      console.log('setPopoverState', { state, target });
      if (target) {
        // events.onSetPopoverState({ target, state });
      }
    },
    [target]
  );

  const popoverState: PopoverState = threadOpen ? 'open' : previewOpen ? 'preview' : 'closed';

  console.log(threadOpen, previewOpen);

  return [popoverState, setPopoverState];
}

export function usePopoverState(props: ThreadLocator) {
  const threadId = useExistingThreadId(props);
  return usePopoverStateInternal({ threadId });
}
