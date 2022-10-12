import { ShowInboxButtonTarget } from '@collabkit/core';
import { useSnapshot } from 'valtio';
import { useApp } from '../useApp';

export function useInboxButton() {
  const { store, events } = useApp();
  const { workspaceId } = useSnapshot(store);

  return {
    onPointerDown: (e: React.PointerEvent) => {
      if (workspaceId) {
        const target: ShowInboxButtonTarget = {
          type: 'showInboxButton',
          workspaceId,
        };
        events.onPointerDown(e, { target });
      } else {
        console.error('[CollabKit] Workspace ID not found');
      }
    },
  };
}
