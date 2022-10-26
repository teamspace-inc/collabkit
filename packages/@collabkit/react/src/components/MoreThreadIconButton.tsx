import { DotsThree, X } from './icons';
import { IconButton } from './IconButton';
import React, { useCallback } from 'react';
import { useCloseThread } from '../hooks/useCloseThread';
import { useThreadContext } from '../hooks/useThreadContext';
import { useApp } from '../hooks/useApp';
import { useSnapshot } from 'valtio';
import { timelineUtils } from '@collabkit/core';
import { MenuItem } from './Menu';

export const MoreThreadIconButton = (props: {}) => {
  const { close } = useCloseThread();

  return (
    <IconButton
      // TODO: tooltip hijacks focus when used within a modal popover
      // tooltip={isResolved ? 'Re-open' : 'Mark as Resolved and Hide'}
      onPointerDown={close}
    >
      <DotsThree size={16} weight={'bold'} />
    </IconButton>
  );
};

type ThreadMenuItemType = 'commentEditButton' | 'commentDeleteButton' | 'reopenThreadButton';

const CommentMenu = (props: { className?: string }) => {
  const { events, store } = useApp();

  const { threadId, workspaceId } = useThreadContext();

  const { workspaces } = useSnapshot(store);
  const workspace = workspaces[workspaceId];
  const timeline = workspace.timeline[threadId];

  const isResolved = timelineUtils.computeIsResolved(timeline);

  const onItemClick = useCallback(
    (e: React.MouseEvent, type: ThreadMenuItemType) => {
      events.onClick(e, {
        target: type === 'reopenThreadButton' ? { type, threadId, workspaceId } : { type, comment },
      });
    },
    [comment, threadId, workspaceId]
  );

  return (
    <Menu<ThreadMenuItemType>
      className={props.className ?? styles.menu}
      icon={<DotsThree size={16} />}
      onItemClick={onItemClick}
    >
      <MenuItem className={styles.menuItem} label="Edit" targetType="commentEditButton" />
      <MenuItem className={styles.menuItem} label="Delete" targetType="commentDeleteButton" />
      {isResolved && (
        <MenuItem className={styles.menuItem} label="Re-open" targetType="reopenThreadButton" />
      )}
    </Menu>
  );
};
