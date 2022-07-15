import React from 'react';
import { StyledMessage, StyledMessageTimestamp } from './comment/Message';
import { Name } from './profile/Name';
import { useApp } from './useApp';
import { PinTarget, Profile, Timeline } from '../constants';
import { formatDistanceToNowStrict } from 'date-fns';
import { useTimeline } from './useTimeline';
import { styled, HStack } from './UIKit';

const PinPreviewStyledMessage = styled(StyledMessage, {
  position: 'absolute',
  left: '$sizes$pinBorderWidth',
  top: '$sizes$pinBorderWidth',
});

export function PinPreview(props: {
  target: PinTarget;
  avatar: React.ReactNode;
  profile: Profile;
  timeline: Timeline;
}) {
  const { events, theme } = useApp();
  const { target } = props;
  const { list } = useTimeline(props.timeline);

  return (
    <PinPreviewStyledMessage
      style={{
        width: theme.sizes.threadPreviewWidth.toString(),
      }}
      ui="preview"
      onPointerDown={(e) => {
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
            return <div key={item.id}>{item.body}</div>;
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
    </PinPreviewStyledMessage>
  );
}
