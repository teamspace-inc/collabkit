import { ToggleSidebarButtonTarget } from '@collabkit/core';
import { useSnapshot } from 'valtio';
import { useApp } from '../useApp';

export function useSidebarButton() {
  const { store, events } = useApp();
  const { workspaceId } = useSnapshot(store);

  return {
    onClick: (e: React.MouseEvent) => {
      if (workspaceId) {
        const target: ToggleSidebarButtonTarget = {
          type: 'toggleSidebarButton',
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
