import React from 'react';
import { Comment } from './Comment';
import { Event, CommentType, WithID } from '../constants';
import { Target } from './Target';
import equal from 'fast-deep-equal';
import { useSnapshot } from 'valtio';
import { useApp } from '../hooks/useApp';

export const CommentGroup = React.memo(function (props: {
  group: WithID<Event>[];
  reactions: { [parentId: string]: { [createdById: string]: Event } };
  workspaceId: string;
  threadId: string;
  rootRef: React.RefObject<HTMLDivElement>;
  isPreview?: boolean;
}) {
  const { store } = useApp();
  const { profiles } = useSnapshot(store);
  const { group, reactions, workspaceId, threadId } = props;
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
},
equal);

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
  // console.log('comment-type', type);
  return type;
}
