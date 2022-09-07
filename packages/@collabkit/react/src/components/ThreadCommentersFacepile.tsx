import React from 'react';
import { useSnapshot } from 'valtio';
import { useApp } from '../hooks/useApp';
import { Avatar } from './Avatar';
import { useTimelineStore } from './useTimelineStore';
import { unique } from './Inbox';

export function ThreadCommentersFacepile(props: React.ComponentPropsWithoutRef<'div'>) {
  const timeline = useSnapshot(useTimelineStore());
  const { profiles } = useSnapshot(useApp().store);

  const eventIds = Object.keys(timeline);

  const commenterIds = eventIds.map((eventId) => timeline[eventId].createdById).filter(unique);

  const commenters = commenterIds.map((commenterId) => profiles[commenterId]);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '6px' }}>
      {commenters.map((commenter, index) => {
        return commenter ? (
          <Avatar
            key={`commenter-${commenter.id}`}
            profile={commenter}
            style={{
              width: '24px',
              height: '24px',
              lineHeight: '24px',
              border: '2px solid white',
              marginLeft: '-6px',
              zIndex: 999 - index,
            }}
          />
        ) : null;
      })}
    </div>
  );
}
