import { styled } from '@stitches/react';
import React, { useMemo } from 'react';
import { messageHeaderStyles } from '@collabkit/theme';
import { CommentTimestamp } from './CommentTimestamp';
import { CommentCreatorName } from './CommentCreatorName';
import { useCommentContext } from '../../hooks/useCommentContext';

const StyledCommentCreatorName = styled(CommentCreatorName, messageHeaderStyles.name);
const StyledCommentTimestamp = styled(CommentTimestamp, messageHeaderStyles.timestamp);

const Root = styled('div', messageHeaderStyles.root);

export function CommentHeader() {
  const { showProfile } = useCommentContext();
  if (!showProfile) return null;

  return useMemo(
    () => (
      <Root>
        <StyledCommentCreatorName />
        <StyledCommentTimestamp />
      </Root>
    ),
    [showProfile]
  );
}
