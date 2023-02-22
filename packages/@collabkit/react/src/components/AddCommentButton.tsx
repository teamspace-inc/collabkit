import React, { ComponentPropsWithoutRef } from 'react';
import { useSnapshot } from 'valtio';
import { useStore } from '../hooks';
import { useApp } from '../hooks/useApp';

function useAddCommentButton() {
  const { events } = useApp();
  const { workspaceId } = useSnapshot(useStore());
  return {
    onClick: (e: React.MouseEvent) => {
      if (!workspaceId) return;
      const target = {
        type: 'addCommentButton',
        workspaceId,
      } as const;
      events.onClick(e, { target });
    },
  };
}

export function AddCommentButton(props: ComponentPropsWithoutRef<'button'>) {
  const { onClick } = useAddCommentButton();
  return (
    <button {...props} onClick={onClick}>
      {props.children ?? 'Add Comment'}
    </button>
  );
}
