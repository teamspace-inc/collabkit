import React from 'react';
import { useApp } from '../hooks/useApp';
import { ThreadResolveButtonTarget } from '@collabkit/core';
import { useThreadContext } from '../hooks/useThreadContext';
import { IconButton } from './IconButton';
import { CheckCircle } from './icons';
import { useWorkspaceContext } from '../hooks/useWorkspaceContext';
import { Tooltip } from './Tooltip';

export function ResolveThreadIconButton(props: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const { events } = useApp();
  const workspaceId = useWorkspaceContext();
  const threadId = useThreadContext();

  const target: ThreadResolveButtonTarget = {
    threadId,
    workspaceId,
    type: 'resolveThreadButton',
  };

  return (
    <Tooltip>
      <Tooltip.Trigger>
        <IconButton
          className={props.className}
          style={props.style}
          weight="regular"
          // TODO: tooltip hijacks focus when used within a modal popover
          // tooltip={isResolved ? 'Re-open' : 'Mark as Resolved and Hide'}
          onPointerDown={(e) =>
            events.onPointerDown(e, {
              target,
            })
          }
        >
          <CheckCircle size={16} weight="fill" />
        </IconButton>
      </Tooltip.Trigger>
      <Tooltip.Content>Resolve</Tooltip.Content>
    </Tooltip>
  );
}
