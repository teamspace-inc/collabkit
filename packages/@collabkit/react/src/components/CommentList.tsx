import { useRef } from 'react';
import React from 'react';
import { Timeline } from '../constants';
import { styled } from '@stitches/react';
import equal from 'fast-deep-equal';
import { useTimeline } from '../hooks/useTimeline';
import { CommentGroup } from './CommentGroup';
import { commentListStyles } from '@collabkit/theme';

const StyledCommentList = styled('div', commentListStyles.list);

export const CommentList = React.memo(function CommentList(props: {
  isTyping?: { [endUserId: string]: boolean };
  timeline: Timeline;
  seenUntil?: string;
  workspaceId: string;
  userId: string;
  threadId: string;
  isPreview?: boolean;
  newIndicatorId?: string | null;
}) {
  const { threadId, workspaceId, timeline, newIndicatorId } = props;

  const rootRef = useRef<HTMLDivElement>(null);

  const { reactions, list } = useTimeline(timeline, props.seenUntil, props.userId);

  const groups = props.isPreview ? list.slice(0, 1) : list;

  if (!workspaceId) {
    return null;
  }

  return (
    <StyledCommentList>
      {groups.map((group, i) => {
        return (
          <CommentGroup
            key={i}
            newIndicatorId={newIndicatorId}
            group={group}
            userId={props.userId}
            reactions={reactions}
            workspaceId={workspaceId}
            threadId={threadId}
            rootRef={rootRef}
            isPreview={props.isPreview}
          />
        );
      })}
    </StyledCommentList>
  );
},
equal);
