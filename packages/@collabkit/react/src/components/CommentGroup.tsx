import React from 'react';
import { Comment } from './Comment';
import { Event, WithID } from '../constants';
import equal from 'fast-deep-equal';
import { useSnapshot } from 'valtio';
import { useApp } from '../hooks/useApp';
import { NewIndicator } from './NewIndicator';
import { getCommentType } from '../utils/getCommentType';

export const CommentGroup = React.memo(function (props: {
  group: WithID<Event>[];
  reactions: { [parentId: string]: { [createdById: string]: Event } };
  isPreview?: boolean;
  newIndicatorId?: string | null;
}) {
  const { group } = props;
  const { store } = useApp();
  const { profiles } = useSnapshot(store);

  const comments = props.isPreview ? group.slice(0, 1) : group;
  return (
    <>
      {comments.map((event, index) => {
        return (
          <div key={event.id}>
            {props.newIndicatorId === event.id ? <NewIndicator /> : null}
            <Comment
              id={event.id}
              event={event}
              type={getCommentType(group, index)}
              timestamp={event.createdAt}
              key={`event-${event.id}`}
              body={event.body}
              profile={profiles[event.createdById]}
              isPreview={props.isPreview}
              reactions={{}}
            />
          </div>
        );
      })}
    </>
  );
},
equal);
