import React from 'react';
import { Comment } from './Comment';
import { Event, CommentType, Profile, WithID } from '../constants';
import { Target } from './Target';

export function CommentGroup(props: {
  group: WithID<Event>[];
  profiles: { [profileId: string]: Profile };
  reactions: { [parentId: string]: { [createdById: string]: Event } };
  workspaceId: string;
  threadId: string;
  rootRef: React.RefObject<HTMLDivElement>;
  isPreview?: boolean;
}) {
  const { group, profiles, reactions, workspaceId, threadId } = props;
  const comments = props.isPreview ? group.slice(0, 1) : group;
  return (
    <>
      {comments.map((event, index) => (
        <Target
          key={event.id}
          target={{ type: 'comment', eventId: event.id, workspaceId, threadId }}
        >
          <Comment
            id={event.id}
            event={event}
            reactions={reactions[event.id]}
            type={getCommentType(group, index)}
            timestamp={event.createdAt}
            key={`event-${event.id}`}
            rootRef={props.rootRef}
            body={event.body}
            profile={profiles[event.createdById]}
            isPreview={props.isPreview}
          />
        </Target>
      ))}
    </>
  );
}

function getCommentType(group: Event[], index: number): CommentType {
  let type: CommentType = 'default';

  if (group.length > 1) {
    type = 'inline';

    if (index === 0) {
      type = 'inline-start';
    }

    if (index === group.length - 1) {
      type = 'inline-end';
    }
  }
  return type;
}
