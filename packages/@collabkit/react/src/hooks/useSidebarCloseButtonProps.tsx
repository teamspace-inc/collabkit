import { HideSidebarButtonTarget } from '@collabkit/core';
import React, { useCallback } from 'react';
import { useApp } from '../hooks/useApp';
import { useOptionalUserContext } from '../hooks/useOptionalUserContext';
import { useOptionalWorkspaceContext } from '../hooks/useWorkspaceContext';

export function useSidebarCloseButtonProps() {
  const { store, events } = useApp();
  const userId = useOptionalUserContext();
  const workspaceId = useOptionalWorkspaceContext();

  const onClick = useCallback(
    (e: React.MouseEvent) => {
      if (!userId) return;
      if (!workspaceId) return;
      store.callbacks?.onInboxCloseButtonClick?.({ userId, workspaceId });

      const target: HideSidebarButtonTarget = {
        type: 'hideSidebarButton',
        workspaceId,
      };

      events.onClick(e, { target });
    },
    [userId, workspaceId]
  );

  return { onClick };
}
