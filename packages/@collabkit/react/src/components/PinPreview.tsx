import React from 'react';
import { StyledMessage, StyledMessageTimestamp } from './comment/Message';
import { Name } from './profile/Name';
import { useApp } from './useApp';
import { Event, PinTarget, Profile } from '../constants';
import { formatDistanceToNowStrict } from 'date-fns';

export function PinPreview(props: {
  target: PinTarget;
  avatar: React.ReactNode;
  profile: Profile;
  event: Event;
}) {
  const { events, theme } = useApp();
  const { target } = props;
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: theme.padding['0'].toString(),
        }}
      >
        <Name>
          {props.profile.name}{' '}
          <StyledMessageTimestamp>
            {formatDistanceToNowStrict(+props.event.createdAt, { roundingMethod: 'floor' })} ago
          </StyledMessageTimestamp>
        </Name>
        <div>{props.event.body}</div>
        <div
          style={{
            marginTop: theme.space['3'].toString(),
            color: theme.colors.secondaryText.toString(),
          }}
        >
          Reply
        </div>
      </div>
    </StyledMessage>
  );
}
