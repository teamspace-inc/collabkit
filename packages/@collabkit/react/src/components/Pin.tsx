import React, { useCallback, useState } from 'react';
import { Avatar } from './Avatar';
import { HStack, VStack } from './UIKit';
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
import { styled } from '@stitches/react';
import debounce from 'lodash.debounce';
import { pinStyles } from '@collabkit/theme';
import { useUnreadCount } from '../hooks/public/useUnreadCount';

const StyledPin = styled('div', pinStyles.pin);
const StyledPinContainer = styled('div', pinStyles.pinContainer);
const StyledFloatingThreadContainer = styled('div', pinStyles.floatingThreadContainer);
// const TypingDot = styled('div', pinStyles.typingDot);
// const TypingDots = styled('div', pinStyles.typingDots);

export function PurePin(props: {
  hasUnread: boolean;
  profile: Profile;
  onPointerDown?: (event: React.PointerEvent) => void;
  isTyping?: { [userId: string]: boolean };
  userId: string;
}) {
  const isSomeoneTyping = props.isTyping
    ? Object.keys(props.isTyping)
        .filter((key) => key !== props.userId)
        .find((key) => props.isTyping?.[key])
    : null;
  return (
    <StyledPin onPointerDown={props.onPointerDown}>
      {props.hasUnread ? <Badge size={6} /> : null}
      <Avatar profile={props.profile} size={28} />
      {/* {isSomeoneTyping ? (
          <TypingDots>
            <TypingDot />
            <TypingDot />
            <TypingDot />
          </TypingDots>
        ) : undefined}
      </Avatar> */}
    </StyledPin>
  );
}

export function Pin(props: { pinId: string }) {
  const { pinId } = props;
  const { store, events } = useApp();
  const { viewingId, hoveringId, profiles, isDemo, userId, workspaceId, workspaces } =
    useSnapshot(store);
  const [maxAvailableSize, setMaxAvailableSize] = useState({ width: -1, height: -1 });

  const workspace = workspaceId ? workspaces[workspaceId] : null;

  const pin = workspace ? workspace.pins[props.pinId] : null;
  const profile = pin ? profiles[pin.createdById] : null;

  const hasUnread = useUnreadCount({ threadId: pinId });

  const target = workspaceId
    ? ({
        type: 'pin',
        pinId,
        workspaceId,
      } as const)
    : null;

  const isViewing = viewingId?.type === 'pin' && viewingId.pinId === props.pinId;

  const isHovering = hoveringId?.type === 'pin' && hoveringId.pinId === props.pinId;

  const open = pin
    ? !!((isViewing || isHovering) && profile && (pin.state === 'open' || pin.state === 'pending'))
    : false;

  const { x, y, reference, floating, strategy } = useFloating({
    whileElementsMounted: autoUpdate,
    strategy: 'fixed',
    placement: isDemo ? 'bottom-start' : undefined,
    open,
    middleware: isDemo
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
          if (target) {
            events.onPointerDown(e, { target });
          }
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

  if (!userId) {
    return null;
  }

  const handleMouseLeave = debounce(
    useCallback(
      (e: React.MouseEvent) => {
        if (target) {
          events.onMouseOut(e, { target });
        }
      },
      [target]
    ),
    // how long to wait before dismissing the tooltip
    150,
    { trailing: true }
  );

  const handleMouseOver = useCallback(
    (e: React.MouseEvent) => {
      handleMouseLeave.cancel();

      !open && target && events.onMouseOver(e, { target });
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
            userId={userId}
            profile={profile}
            hasUnread={hasUnread > 0}
            isTyping={workspace ? workspace.composers[props.pinId]?.isTyping : {}}
            onPointerDown={(e) => {
              e.stopPropagation();
              e.preventDefault();
              if (target) {
                events.onPointerDown(e, { target });
              }
            }}
          />
        </HStack>
      </StyledPinContainer>
      <HStack style={{ width: isViewing || isHovering ? 248 : 'unset' }}>{thread}</HStack>
    </VStack>
  ) : null;
}
