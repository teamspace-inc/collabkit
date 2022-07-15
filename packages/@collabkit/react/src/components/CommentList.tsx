import { useRef } from 'react';
import React from 'react';
import { Comment } from './Comment';
import { CommentType, Profile, Timeline } from '../constants';
import { styled } from './UIKit';
import { Target } from './Target';
import equal from 'fast-deep-equal';
import { CurrentlyTyping } from './comment/TypingIndicator';
import { useTimeline } from './useTimeline';

export const StyledCommentList = styled('div', {
  gap: 0,
  padding: '$padding$1 0 0',
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
});

const SeeAllRepliesLink = styled('div', {
  fontSize: '13px',
  display: 'flex',
  marginTop: '0px',
  paddingBottom: '28px',
  marginLeft: 'calc(16px + 24px + 8px)',
  color: '$colors$secondaryText',
});

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
      {(props.isPreview ? list.slice(0, 1) : list).map((group, i) =>
        group.map((event, j) => {
          let type: CommentType = 'default';

          if (group.length > 1) {
            type = 'inline';

            if (j === 0) {
              type = 'inline-start';
            }

            if (j === group.length - 1) {
              type = 'inline-end';
            }
          }

          const profile = profiles[event.createdById];

          return (
            <Target
              key={event.id}
              target={{ type: 'comment', eventId: event.id, workspaceId, threadId }}
            >
              <Comment
                id={event.id}
                event={event}
                reactions={reactions[event.id]}
                type={type}
                timestamp={event.createdAt}
                key={`event-${i}-${j}`}
                rootRef={rootRef}
                body={event.body}
                profile={profile}
              />
            </Target>
          );
        })
      )}
      {props.isPreview ? (
        <SeeAllRepliesLink>
          {list.length > 1
            ? `See ${list.length - 1} ${list.length - 1 === 1 ? 'reply' : 'replies'}`
            : 'Reply'}
        </SeeAllRepliesLink>
      ) : null}
      <CurrentlyTyping profiles={profiles} userId={userId} isTyping={isTyping} />
    </StyledCommentList>
  );
},
equal);
