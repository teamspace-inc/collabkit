import React, { useRef } from 'react';
import { StyledMessage, StyledMessageTimestamp } from './comment/Message';
import { Name } from './profile/Name';
import { useApp } from './useApp';
import { PinTarget, Profile, Timeline } from '../constants';
import { formatDistanceToNowStrict } from 'date-fns';
import { useTimeline } from './useTimeline';
import { styled, HStack } from './UIKit';
import {
  TLBoundsCorner,
  TLBoundsEdge,
  useIntersectionObserver,
} from '../hooks/useIntersectionObserver';

const PinPreviewStyledMessage = styled(StyledMessage, {
  position: 'absolute',
  left: '$sizes$pinBorderWidth',
  top: '$sizes$pinBorderWidth',
  variants: {
    intersection: {
      [TLBoundsEdge.Right]: {
        opacity: 1,
        transform: `translateX(calc(-100%))`,
      },
      [TLBoundsEdge.Bottom]: {
        opacity: 1,
        transform: `translateY(200%)`,
      },
      [TLBoundsCorner.BottomRight]: {
        opacity: 1,
        transform: `translateY(200%)`,
      },
      other: { opacity: 1 },
      none: { opacity: 1 },
      pending: {
        opacity: 0,
      },
    },
  },
});

export function PinPreview(props: {
  target: PinTarget;
  avatar: React.ReactNode;
  profile: Profile;
  timeline: Timeline;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { events, theme } = useApp();
  const { target } = props;
  const { list } = useTimeline(props.timeline);
  const intersection = useIntersectionObserver({ ref, root: null }, []);

  return (
    <PinPreviewStyledMessage
      intersection={intersection}
      ref={ref}
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
