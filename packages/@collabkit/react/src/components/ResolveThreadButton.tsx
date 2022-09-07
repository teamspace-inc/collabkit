import React from 'react';
import { useApp } from '../hooks/useApp';
import { ThreadResolveButtonTarget } from '@collabkit/core';
import { useThreadContext } from '../hooks/useThreadContext';
import { Check } from './icons';
import { IconButton } from './IconButton';

export function ResolveThreadButton(props: { className?: string; style?: React.CSSProperties }) {
  const { theme, events } = useApp();
  const { threadId, workspaceId } = useThreadContext();

  const target: ThreadResolveButtonTarget = {
    threadId,
    workspaceId,
    type: 'resolveThreadButton',
  };

  return (
    <IconButton
      // TODO: tooltip hijacks focus when used within a modal popover
      // tooltip={isResolved ? 'Re-open' : 'Mark as Resolved and Hide'}
      onPointerDown={(e) =>
        events.onPointerDown(e, {
          target,
        })
      }
    >
      <Check size={19} weight={'regular'} color={theme.colors.neutral12.toString()} />
    </IconButton>
  );
}
