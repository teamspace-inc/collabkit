import { DotsThree } from '../icons';
import { styled } from '@stitches/react';
import React, { useCallback } from 'react';
import { Menu, MenuItem } from './Menu';
import { useApp } from '../../hooks/useApp';
import { useCommentContext } from '../../hooks/useCommentContext';

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
  const comment = useCommentContext();
  const onItemClick = useCallback(
    (e: React.MouseEvent, type: 'commentEditButton' | 'commentDeleteButton') => {
      events.onClick(e, { target: { type, comment } });
    },
    [comment]
  );

  return (
    <StyledMenu icon={<DotsThree size={18} />} onItemClick={onItemClick}>
      <StyledMenuItem label="Edit" targetType="commentEditButton" />
      <StyledMenuItem label="Delete" targetType="commentDeleteButton" />
    </StyledMenu>
  );
};
