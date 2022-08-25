import React from 'react';
import { Comment } from './Comment';
import { Event, CommentType, WithID } from '../constants';
import { Target } from './Target';
import equal from 'fast-deep-equal';
import { useSnapshot } from 'valtio';
import { useApp } from '../hooks/useApp';
import { NewIndicator } from './NewIndicator';

export const CommentGroup = React.memo(function (props: {
  group: WithID<Event>[];
  reactions: { [parentId: string]: { [createdById: string]: Event } };
  workspaceId: string;
  threadId: string;
  userId: string;
  isPreview?: boolean;
  newIndicatorId?: string | null;
}) {
  const { group, reactions, workspaceId, threadId } = props;
  const { store } = useApp();
  const { profiles } = useSnapshot(store);

  const comments = props.isPreview ? group.slice(0, 1) : group;
  return (
    <>
      {comments.map((event, index) => {
        return (
          <div key={event.id}>
            {props.newIndicatorId === event.id ? <NewIndicator /> : null}
            <Target target={{ type: 'comment', eventId: event.id, workspaceId, threadId }}>
              <Comment
                id={event.id}
                event={event}
                reactions={reactions[event.id]}
                type={getCommentType(group, index)}
                timestamp={event.createdAt}
                key={`event-${event.id}`}
                body={event.body}
                profile={profiles[event.createdById]}
                isPreview={props.isPreview}
              />
            </Target>
          </div>
        );
      })}
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
