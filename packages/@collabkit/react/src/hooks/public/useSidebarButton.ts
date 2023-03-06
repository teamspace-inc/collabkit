import { ToggleSidebarButtonTarget } from '@collabkit/core';
import { useApp } from '../useApp';

export function useSidebarButton() {
  const { events } = useApp();

  return {
    onClick: (e: React.MouseEvent) => {
      const target: ToggleSidebarButtonTarget = {
        type: 'toggleSidebarButton',
      };
      if (e.button === 0) {
        events.onClick(e, { target });
      } else {
        console.error('[CollabKit] Workspace ID not found');
      }
    },
  };
}
