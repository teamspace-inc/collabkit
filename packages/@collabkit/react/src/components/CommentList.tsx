import { useRef } from 'react';
import React from 'react';
import { Comment } from './Comment';
import { CommentType, Profile, ThreadType, Timeline } from '../constants';
import { styled } from './UIKit';
import { Target } from './Target';
import equal from 'fast-deep-equal';
import { CurrentlyTyping } from './comment/TypingIndicator';
import { useCommentList } from './useCommentList';

export const StyledCommentList = styled('div', {
  gap: 0,
  padding: '$padding$1 0 0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyItems: 'stretch',
  flex: 1,
});

export const CommentList = React.memo(function CommentList(props: {
  type?: ThreadType;
  isTyping?: { [endUserId: string]: boolean };
  profiles: { [profileId: string]: Profile };
  timeline: Timeline;
  workspaceId: string;
  userId: string;
  threadId: string;
}) {
  const { userId, threadId, workspaceId, profiles, timeline, isTyping } = props;

  const rootRef = useRef<HTMLDivElement>(null);

  const { reactions, list } = useCommentList(timeline);

  if (!workspaceId) {
    return null;
  }

  return (
    <StyledCommentList>
      {list.map((group, i) =>
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
                threadType={props.type ?? 'inline'}
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
      <CurrentlyTyping profiles={profiles} userId={userId} isTyping={isTyping} />
    </StyledCommentList>
  );
},
equal);
