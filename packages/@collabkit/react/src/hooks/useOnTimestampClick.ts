import React, { useCallback } from 'react';
import { useApp } from './useApp';

// we can evolve this to be more generic over time
export function useOnTimestampClick(props: {
  threadId: string;
  workspaceId: string;
  userId: string;
  createdById: string;
  eventId: string | null;
}) {
  const { store } = useApp();
  const triggerCallback = useCallback(
    (timestamp: string) => {
      store.callbacks?.onTimestampClick?.({
        timestamp,
        threadId: props.threadId,
        workspaceId: props.workspaceId,
        userId: props.userId,
        createdById: props.createdById,
        eventId: null,
      });
    },
    [props.threadId, props.workspaceId, props.userId, props.createdById]
  );

  const onClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target instanceof HTMLElement) {
        // from composer
        if (e.target.classList.contains('timestamp')) {
          e.stopPropagation();
          e.preventDefault();
          triggerCallback(e.target.innerText);

          // from comment
        } else if (e.target instanceof HTMLAnchorElement) {
          if (e.target.href.match(/#T(.*)/)) {
            triggerCallback(e.target.innerText);
          }
        }
      }
    },
    [store]
  );

  return { onClick };
}
