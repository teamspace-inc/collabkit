import { ShowSidebarButtonTarget } from '@collabkit/core';
import { useSnapshot } from 'valtio';
import { useApp } from '../useApp';
import { useIsAuthenticated } from '../useIsAuthenticated';

export function useSidebarButton() {
  const { store, events } = useApp();
  const isAuthenticated = useIsAuthenticated();
  const { workspaceId } = useSnapshot(store);

  return isAuthenticated
    ? {
        onClick: (e: React.MouseEvent) => {
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
      }
    : {
        onClick: (e: React.MouseEvent) => {
          console.warn('CollabKit: cant show sidebar while user is not authenticated');
        },
      };
}
