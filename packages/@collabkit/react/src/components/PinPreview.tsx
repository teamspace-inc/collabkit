import React from 'react';
import { StyledMessage, StyledMessageTimestamp } from './comment/Message';
import { Name } from './profile/Name';
import { useApp } from './useApp';
import { PinTarget, Profile, Timeline } from '../constants';
import { formatDistanceToNowStrict } from 'date-fns';
import { useTimeline } from './useTimeline';
import { HStack } from './UIKit';

export function PinPreview(props: {
  target: PinTarget;
  avatar: React.ReactNode;
  profile: Profile;
  timeline: Timeline;
}) {
  const { events, theme } = useApp();
  const { target } = props;
  const { list, messageEvents } = useTimeline(props.timeline);

  return (
    <StyledMessage
      style={{
        position: 'absolute',
        left: 2,
        top: 2,
        width: theme.sizes.threadPreviewWidth.toString(),
      }}
      ui="preview"
      onPointerDown={(e) => {
        console.log('pin preview pointer down');
        events.onPointerDown(e, { target });
      }}
    >
      {props.avatar}
      <HStack
        style={{
          width: '100%',
          gap: theme.padding['0'].toString(),
        }}
      >
        <Name>
          {props.profile.name}{' '}
          <StyledMessageTimestamp>
            {formatDistanceToNowStrict(+list[0][0].createdAt, { roundingMethod: 'floor' })} ago
          </StyledMessageTimestamp>
        </Name>
        <HStack style={{ gap: '6px' }}>
          {list[0].map((item) => {
            return <div>{item.body}</div>;
          })}
        </HStack>
        <div
          style={{
            marginTop: theme.space['3'].toString(),
            color: theme.colors.secondaryText.toString(),
          }}
        >
          {list.length > 1
            ? `${list.length - 1} ${list.length - 1 === 1 ? 'comment' : 'comments'}`
            : 'Reply'}
        </div>
      </HStack>
    </StyledMessage>
  );
}
