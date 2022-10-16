import { ShowInboxButtonTarget } from '@collabkit/core';
import { useSnapshot } from 'valtio';
import { useApp } from '../useApp';

export function useInboxButton(props: { onClick?: () => void }) {
  const { store, events } = useApp();
  const { workspaceId } = useSnapshot(store);

  return {
    onPointerDown: (e: React.PointerEvent) => {
      if (workspaceId) {
        const target: ShowInboxButtonTarget = {
          type: 'showInboxButton',
          workspaceId,
        };
        if (e.button === 0) {
          events.onPointerDown(e, { target });
          if (props.onClick) {
            props.onClick();
          }
        }
      } else {
        console.error('[CollabKit] Workspace ID not found');
      }
    },
  };
}
