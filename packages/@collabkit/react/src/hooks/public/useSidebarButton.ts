import { ShowSidebarButtonTarget } from '@collabkit/core';
import { useSnapshot } from 'valtio';
import { useApp } from '../useApp';

export function useSidebarButton() {
  const { store, events } = useApp();
  const { workspaceId } = useSnapshot(store);

  return {
    onPointerDown: (e: React.PointerEvent) => {
      if (workspaceId) {
        const target: ShowSidebarButtonTarget = {
          type: 'showSidebarButton',
          workspaceId,
        };
        if (e.button === 0) {
          events.onClick(e, { target });
        }
      } else {
        console.error('[CollabKit] Workspace ID not found');
      }
    },
  };
}
