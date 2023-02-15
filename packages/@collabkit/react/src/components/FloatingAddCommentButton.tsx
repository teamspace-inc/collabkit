import React, { ComponentPropsWithoutRef } from 'react';
import { useApp } from '../hooks/useApp';

function useAddCommentButtonProps() {
  const { events } = useApp();
  const target = { type: 'addCommentButton' } as const;
  return {
    onClick: (e: React.MouseEvent) => events.onClick(e, { target }),
  };
}

export function FloatingAddCommentButton(props: ComponentPropsWithoutRef<'button'>) {
  const { onClick } = useAddCommentButtonProps();
  return (
    <button
      style={{
        background: 'red',
        width: 60,
        height: 60,
        position: 'fixed',
        bottom: 20,
        right: 20,
        borderRadius: 60,
      }}
      onClick={onClick}
    >
      {props.children}
    </button>
  );
}
