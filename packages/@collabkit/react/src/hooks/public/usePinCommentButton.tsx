import { PinCommentButtonTarget } from '@collabkit/core';
import React from 'react';
import { useSnapshot } from 'valtio';
import { useStore } from '..';
import { useApp } from '../useApp';

export function usePinCommentButton() {
  const { events } = useApp();
  const { workspaceId } = useSnapshot(useStore());
  return {
    onClick: (e: React.MouseEvent) => {
      if (!workspaceId) return;
      const target: PinCommentButtonTarget = {
        type: 'pinCommentButton',
        workspaceId,
      } as const;
      events.onClick(e, { target });
    },
  };
}
