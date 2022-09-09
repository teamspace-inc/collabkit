import { DotsThree } from 'phosphor-react';
import { styled } from '@stitches/react';
import React, { useCallback } from 'react';
import { Menu, MenuItem } from './Menu';
import { useApp } from '../../hooks/useApp';
import { useCommentContext } from '../../hooks/useCommentContext';
import { useThreadContext } from '../../hooks/useThreadContext';
import { CommentTarget } from '@collabkit/core';

const StyledMenu = styled(Menu, {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 32,
  width: 32,
  cursor: 'pointer',
  pointerEvents: 'all',

  '&:hover': {
    cursor: 'pointer',
  },
});

const StyledMenuItem = styled(MenuItem, {
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  border: 'none',
  borderRadius: '$radii$0',
  fontSize: '$fontSize$1',
  textAlign: 'left',
  lineHeight: 1.8,
  minWidth: 110,
  margin: 0,
  outline: 0,
  color: '$colors$commentMenuItemText',
  background: '$colors$commentMenuItemBackground',

  '&:focus, &:not([disabled]):active': {
    color: '$colors$commentMenuItemHoverText',
    background: '$colors$commentMenuItemHoverBackground',
  },
});

export const CommentMenu = () => {
  const { events } = useApp();
  const { eventId } = useCommentContext();
  const { workspaceId, threadId } = useThreadContext();
  const onItemClick = useCallback(
    (e: React.MouseEvent, type: 'commentEditButton' | 'commentDeleteButton') => {
      const comment: CommentTarget = { type: 'comment', eventId, workspaceId, threadId };
      events.onClick(e, { target: { type, comment } });
    },
    [eventId, workspaceId, threadId]
  );

  return (
    <StyledMenu icon={<DotsThree size={18} />} onItemClick={onItemClick}>
      <StyledMenuItem label="Edit" targetType="commentEditButton" />
      <StyledMenuItem label="Delete" targetType="commentDeleteButton" />
    </StyledMenu>
  );
};
