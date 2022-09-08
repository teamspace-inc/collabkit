import React from 'react';
import { useApp } from '../hooks/useApp';
import { MoreActionsThreadButtonTarget } from '@collabkit/core';
import { useThreadContext } from '../hooks/useThreadContext';
import { DotsThree } from './icons';
import { IconButton } from './IconButton';

export function MoreActionsThreadButton(props: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const { theme, events } = useApp();
  const { threadId, workspaceId } = useThreadContext();

  const target: MoreActionsThreadButtonTarget = {
    threadId,
    workspaceId,
    type: 'moreActionsThreadButton',
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
      <DotsThree size={19} weight={'regular'} color={theme.colors.neutral12.toString()} />
    </IconButton>
  );
}
