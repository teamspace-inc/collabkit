import React from 'react';
import { Timeline } from '../constants';
import { styled } from '@stitches/react';
import equal from 'fast-deep-equal';
import { useTimeline } from '../hooks/useTimeline';
import { CommentGroup } from './CommentGroup';
import { commentListStyles } from '@collabkit/theme';

const StyledCommentList = styled('div', commentListStyles.list);

export const CommentList = React.memo(function CommentList(props: {
  timeline: Timeline;
  seenUntil?: string;
  isPreview?: boolean;
  newIndicatorId?: string | null;
}) {
  const { timeline, newIndicatorId } = props;

  const { reactions, list } = useTimeline(timeline, props.seenUntil);

  const groups = props.isPreview ? list.slice(0, 1) : list;

  return (
    <StyledCommentList>
      {groups.map((group, i) => {
        return (
          <CommentGroup
            key={i}
            group={group}
            reactions={reactions}
            isPreview={props.isPreview}
            newIndicatorId={newIndicatorId}
          />
        );
      })}
    </StyledCommentList>
  );
},
equal);
