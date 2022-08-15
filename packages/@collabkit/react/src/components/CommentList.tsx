import { useRef } from 'react';
import React from 'react';
import { Profile, Timeline } from '../constants';
import { styled } from '@stitches/react';
import equal from 'fast-deep-equal';
import { CurrentlyTyping } from './comment/TypingIndicator';
import { useTimeline } from '../hooks/useTimeline';
import { CommentGroup } from './CommentGroup';
import { commentListStyles } from '@collabkit/theme';

const StyledCommentList = styled('div', commentListStyles.list);
const SeeAllRepliesLink = styled('div', commentListStyles.seeAllRepliesLink);

export const CommentList = React.memo(function CommentList(props: {
  isTyping?: { [endUserId: string]: boolean };
  profiles: { [profileId: string]: Profile };
  timeline: Timeline;
  workspaceId: string;
  userId: string;
  threadId: string;
  isPreview?: boolean;
}) {
  const { userId, threadId, workspaceId, profiles, timeline, isTyping } = props;

  const rootRef = useRef<HTMLDivElement>(null);

  const { reactions, list } = useTimeline(timeline);

  if (!workspaceId) {
    return null;
  }

  return (
    <StyledCommentList>
      {(props.isPreview ? list.slice(0, 1) : list).map((group, i) => (
        <CommentGroup
          key={i}
          group={group}
          profiles={profiles}
          reactions={reactions}
          workspaceId={workspaceId}
          threadId={threadId}
          rootRef={rootRef}
          isPreview={props.isPreview}
        />
      ))}
      {props.isPreview ? null : (
        <CurrentlyTyping profiles={profiles} userId={userId} isTyping={isTyping} />
      )}
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
