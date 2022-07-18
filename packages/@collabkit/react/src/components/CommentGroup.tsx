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
}) {
  const { group, profiles, reactions, workspaceId, threadId } = props;

  return (
    <div>
      {group.map((event, j) => {
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
              key={`event-${event.id}`}
              rootRef={props.rootRef}
              body={event.body}
              profile={profile}
            />
          </Target>
        );
      })}
    </div>
  );
}
