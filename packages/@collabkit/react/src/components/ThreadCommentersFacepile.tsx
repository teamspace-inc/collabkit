import React from 'react';
import { useSnapshot } from 'valtio';
import { useApp } from '../hooks/useApp';
import { Avatar } from './Avatar';
import { useTimelineStore } from '../hooks/useTimelineStore';
import { unique } from './Inbox';

export function ThreadCommentersFacepile(props: React.ComponentPropsWithoutRef<'div'>) {
  const timeline = useSnapshot(useTimelineStore());
  const { profiles } = useSnapshot(useApp().store);

  const eventIds = Object.keys(timeline);

  const commenterIds = eventIds.map((eventId) => timeline[eventId].createdById).filter(unique);

  const commenters = commenterIds.map((commenterId) => profiles[commenterId]);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '4px' }}>
      {commenters.map((commenter, index) => {
        return commenter ? (
          <div
            key={commenter.id}
            style={{
              border: '2px solid white',
              marginLeft: '-6px',
              zIndex: 999 - index,
              borderRadius: '50%',
            }}
            key={commenter.id}
          >
            <Avatar profile={commenter} size={24} />
          </div>
        ) : null;
      })}
    </div>
  );
}
