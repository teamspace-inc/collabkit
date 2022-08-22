import { useRef } from 'react';
import React from 'react';
import { Profile, Timeline } from '../constants';
import { styled } from '@stitches/react';
import equal from 'fast-deep-equal';
import { CurrentlyTyping } from './comment/CurrentlyTyping';
import { useTimeline } from '../hooks/useTimeline';
import { CommentGroup } from './CommentGroup';
import { commentListStyles } from '@collabkit/theme';

const StyledCommentList = styled('div', commentListStyles.list);
const SeeAllRepliesLink = styled('div', commentListStyles.seeAllRepliesLink);

export const CommentList = React.memo(function CommentList(props: {
  isTyping?: { [endUserId: string]: boolean };
  timeline: Timeline;
  workspaceId: string;
  userId: string;
  threadId: string;
  isPreview?: boolean;
}) {
  const { userId, threadId, workspaceId, timeline, isTyping } = props;

  const rootRef = useRef<HTMLDivElement>(null);

  const { reactions, list } = useTimeline(timeline);
  const groups = props.isPreview ? list.slice(0, 1) : list;

  if (!workspaceId) {
    return null;
  }

  return (
    <StyledCommentList>
      {groups.map((group, i) => (
        <CommentGroup
          key={i}
          group={group}
          reactions={reactions}
          workspaceId={workspaceId}
          threadId={threadId}
          rootRef={rootRef}
          isPreview={props.isPreview}
        />
      ))}
      {props.isPreview ? null : <CurrentlyTyping userId={userId} isTyping={isTyping} />}
      {props.isPreview ? (
        <SeeAllRepliesLink>
          {list.length > 1
            ? `See ${list.length - 1} ${list.length - 1 === 1 ? 'reply' : 'replies'}`
            : 'Reply'}
        </SeeAllRepliesLink>
      ) : null}
    </StyledCommentList>
  );
},
equal);
