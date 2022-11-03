import { useCallback, useMemo } from 'react';
import { useApp } from '../hooks/useApp';
import { useSnapshot } from 'valtio';
import { ThreadLocator, ThreadTarget } from '@collabkit/core';
import { useExistingOrNewThreadId } from '../hooks/useExistingOrNewThreadId';

type PopoverThreadState = 'open' | 'preview' | 'closed';

export function usePopoverState(
  props: ThreadLocator
): [PopoverThreadState | 'preview', (state: PopoverThreadState) => void] {
  const { store, events } = useApp();
  const { viewingId, previewingId, workspaceId } = useSnapshot(store);
  const threadId = useExistingOrNewThreadId(props);

  const threadOpen = viewingId?.type === 'thread' && viewingId.threadId === threadId;
  const previewOpen = previewingId?.type === 'thread' && previewingId.threadId === threadId;

  const target = useMemo<ThreadTarget | null>(
    () =>
      workspaceId
        ? {
            type: 'thread',
            threadId,
            workspaceId,
          }
        : null,
    [threadId, workspaceId]
  );

  const setPopoverState = useCallback(
    (state: PopoverThreadState) => {
      if (target) {
        events.onSetPopoverState({ target, state });
      }
    },
    [target]
  );

  const popoverState: PopoverThreadState = threadOpen ? 'open' : previewOpen ? 'preview' : 'closed';

  return [popoverState, setPopoverState];
}
