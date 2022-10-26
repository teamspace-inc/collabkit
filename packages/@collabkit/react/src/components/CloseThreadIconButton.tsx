import { X } from './icons';
import { IconButton } from './IconButton';
import React from 'react';
import { useCloseThread } from '../hooks/useCloseThread';

export const CloseThreadIconButton = (props: {}) => {
  const { close } = useCloseThread();

  return (
    <IconButton
      // TODO: tooltip hijacks focus when used within a modal popover
      // tooltip={isResolved ? 'Re-open' : 'Mark as Resolved and Hide'}
      onPointerDown={close}
    >
      <X size={16} weight={'regular'} />
    </IconButton>
  );
};
