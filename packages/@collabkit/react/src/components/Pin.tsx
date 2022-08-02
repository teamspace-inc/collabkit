import React, { useCallback, useState } from 'react';
import { Avatar } from './Avatar';
import { HStack, styled, VStack } from './UIKit';
import { useApp } from '../hooks/useApp';
import { useSnapshot } from 'valtio';
import { useWorkspace } from '../hooks/useWorkspace';
import { PinTarget, Profile } from '../constants';
import { Badge } from './Badge';
import { PopoverThread } from './PopoverThread';
import { useHasUnread } from '../hooks/useHasUnread';
import {
  autoPlacement,
  offset,
  useFloating,
  size,
  autoUpdate,
} from '@floating-ui/react-dom-interactions';
import { keyframes } from '@stitches/react';
import debounce from 'lodash.debounce';

const StyledPin = styled('div', {
  width: '$sizes$pin',
  height: '$sizes$pin',
  borderRadius: '$radii$pin',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  userSelect: 'none',
  border: '$sizes$pinBorderWidth solid $colors$pinBorderColor',
  cursor: 'pointer',
  position: 'relative',

  variants: {
    effect: {
      flat: {},
      sticker: {
        filter:
          'drop-shadow(0 1px 0px rgba(0, 0, 0, 0.1))  drop-shadow(0 1px 2px rgba(0, 0, 0, 0.15))',
      },
    },
  },
});

const StyledPinContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  position: 'relative',
});

const StyledFloatingThreadContainer = styled('div', {
  width: '$sizes$threadPreviewWidth',
});

const loadingFade = keyframes({
  '0%': { opacity: 0, transform: 'scale(1)' },
  '50%': { opacity: 1, transform: 'scale(1.2)' },
  '100%': { opacity: 0, transform: 'scale(1)' },
});

const TypingDot = styled('div', {
  width: '5px',
  height: '5px',
  background: '$colors$neutral1',
  borderRadius: '5px',
  opacity: 0,
  animation: `${loadingFade} 1.5s infinite`,

  '&:nth-child(1)': {
    animationDelay: '0s',
  },
  '&:nth-child(2)': {
    animationDelay: '0.25s',
  },
  '&:nth-child(3)': {
    animationDelay: '0.5s',
  },
});

const TypingDots = styled('div', {
  width: '28px',
  height: '28px',
  display: 'flex',
  gap: '2px',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
});

export function PurePin(props: {
  hasUnread: boolean;
  profile: Profile;
  onPointerDown?: (event: React.PointerEvent) => void;
  isTyping?: { [userId: string]: boolean };
  currentUserId: string;
}) {
  const isSomeoneTyping = props.isTyping
    ? Object.keys(props.isTyping)
        .filter((key) => key !== props.currentUserId)
        .find((key) => props.isTyping?.[key])
    : null;
  return (
    <StyledPin onPointerDown={props.onPointerDown}>
      {props.hasUnread ? <Badge size={6} /> : null}
      <Avatar profile={props.profile} size={28}>
        {isSomeoneTyping ? (
          <TypingDots>
            <TypingDot />
            <TypingDot />
            <TypingDot />
          </TypingDots>
        ) : undefined}
      </Avatar>
    </StyledPin>
  );
}

export function Pin(props: { pinId: string }) {
  const { pinId } = props;
  const { store, events } = useApp();
  const { viewingId, hoveringId, profiles, mode, config } = useSnapshot(store);
  const [maxAvailableSize, setMaxAvailableSize] = useState({ width: -1, height: -1 });

  const currentUserId = config.identify?.userId;

  const { workspace, workspaceId } = useWorkspace();
  const pin = workspace.pins[props.pinId];
  const profile = pin ? profiles[pin.createdById] : null;

  const hasUnread = useHasUnread({ pinId, workspace });

  const target: PinTarget = {
    type: 'pin',
    pinId,
    workspaceId,
  };

  const isViewing = viewingId?.type === 'pin' && viewingId.pinId === props.pinId;

  const isHovering = hoveringId?.type === 'pin' && hoveringId.pinId === props.pinId;

  const open = !!(
    (isViewing || isHovering) &&
    profile &&
    (pin.state === 'open' || pin.state === 'pending')
  );

  const { x, y, reference, floating, strategy } = useFloating({
    whileElementsMounted: autoUpdate,
    strategy: 'fixed',
    placement: mode === 'demo' ? 'bottom-start' : undefined,
    open,
    middleware:
      mode === 'demo'
        ? [
            offset(() => {
              return {
                mainAxis: 6,
              };
            }),
          ]
        : [
            autoPlacement({ alignment: 'start', padding: 14 }),
            size({
              apply({ availableWidth, availableHeight, elements }) {
                // Do things with the data, e.g.
                setMaxAvailableSize({ width: availableWidth, height: availableHeight });
                Object.assign(elements.floating.style, {
                  maxWidth: `${availableWidth}px`,
                  maxHeight: `${availableHeight}px`,
                });
              },
            }),
            offset(() => {
              return {
                mainAxis: 6,
              };
            }),
          ],
  });

  const thread = open ? (
    <StyledFloatingThreadContainer
      ref={floating}
      style={{
        cursor: isHovering && !isViewing ? 'pointer' : 'default',
        position: strategy,
        top: y ?? 0,
        left: x ?? 0,
        height: 'auto',
      }}
      onPointerDown={(e) => {
        if (isHovering && !isViewing) {
          e.stopPropagation();
          e.preventDefault();
          events.onPointerDown(e, { target });
        }
      }}
    >
      <PopoverThread
        maxAvailableSize={maxAvailableSize}
        threadId={props.pinId}
        isPreview={isHovering && !isViewing}
      />
    </StyledFloatingThreadContainer>
  ) : null;

  if (!profile) {
    console.warn('Pin has no profile');
  }

  if (!currentUserId) {
    return null;
  }

  const handleMouseLeave = debounce(
    useCallback((e: React.MouseEvent) => {
      events.onMouseOut(e, { target });
    }, []),
    // how long to wait before dismissing the tooltip
    150,
    { trailing: true }
  );

  const handleMouseOver = useCallback(
    (e: React.MouseEvent) => {
      handleMouseLeave.cancel();
      !open && events.onMouseOver(e, { target });
    },
    [handleMouseLeave, open, events.onMouseOver, target]
  );

  return pin && profile ? (
    <VStack
      style={{ gap: 8 }}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      data-collabkit-internal="true"
      // {...getReferenceProps()}
      // {...getFloatingProps()}
    >
      <StyledPinContainer ref={reference}>
        <HStack
          style={{
            position: 'relative',
            filter:
              'drop-shadow(0px 4px 12px rgba(0,0,0,0.1)), drop-shadow(0px 1px 0px rgba(0,0,0,0.2))',
          }}
        >
          <PurePin
            currentUserId={currentUserId}
            profile={profile}
            hasUnread={hasUnread}
            isTyping={workspace.composers[props.pinId]?.isTyping}
            onPointerDown={(e) => {
              e.stopPropagation();
              e.preventDefault();
              events.onPointerDown(e, { target });
            }}
          />
        </HStack>
      </StyledPinContainer>
      <HStack style={{ width: isViewing || isHovering ? 248 : 'unset' }}>{thread}</HStack>
    </VStack>
  ) : null;
}
