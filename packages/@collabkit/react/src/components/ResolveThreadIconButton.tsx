import { Check } from './icons';
import { IconButton } from './IconButton';
import { useResolveThread } from '../hooks/useResolveThread';
import React from 'react';

export const ResolveThreadIconButton = (props: {}) => {
  const { canResolve, isResolved, resolve } = useResolveThread();

  return canResolve && !isResolved ? (
    <IconButton
      // TODO: tooltip hijacks focus when used within a modal popover
      // tooltip={isResolved ? 'Re-open' : 'Mark as Resolved and Hide'}
      onPointerDown={resolve}
    >
      <Check size={16} weight={'regular'} />
    </IconButton>
  ) : null;
};
