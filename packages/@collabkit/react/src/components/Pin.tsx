import React, { useRef, useState } from 'react';
import { Avatar } from './Avatar';
import { HStack, styled, VStack } from './UIKit';
import { useApp } from '../hooks/useApp';
import { useSnapshot } from 'valtio';
import { useWorkspace } from '../hooks/useWorkspace';
import { PinTarget } from '../constants';
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
  // so the pin is centered
  top: 'calc($sizes$pin / -2)',
  left: 'calc($sizes$pin / -2)',
});

const StyledFloatingThreadContainer = styled('div', {
  width: '$sizes$threadPreviewWidth',
});

export function Pin(props: { pinId: string }) {
  const { pinId } = props;
  const { store, events } = useApp();
  const { viewingId, hoveringId, profiles } = useSnapshot(store);
  const [maxAvailableSize, setMaxAvailableSize] = useState({ width: -1, height: -1 });

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

  const avatar = profile ? <Avatar profile={profile} size={28} /> : null;

  const open = !!(
    (isViewing || isHovering) &&
    profile &&
    (pin.state === 'open' || pin.state === 'pending')
  );

  const { x, y, reference, floating, strategy } = useFloating({
    whileElementsMounted: autoUpdate,
    open,
    middleware: [
      autoPlacement({ alignment: 'start', padding: 12 }),
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

  return pin && profile ? (
    <VStack
      style={{ gap: 8 }}
      onMouseOver={(e) => !open && events.onMouseOver(e, { target })}
      onMouseLeave={(e) => events.onMouseOut(e, { target })}
      data-collabkit-internal="true"
    >
      <StyledPinContainer ref={reference}>
        <HStack
          style={{
            position: 'relative',
            filter:
              'drop-shadow(0px 4px 12px rgba(0,0,0,0.1)), drop-shadow(0px 1px 0px rgba(0,0,0,0.2))',
          }}
        >
          <StyledPin
            onPointerDown={(e) => {
              e.stopPropagation();
              e.preventDefault();
              events.onPointerDown(e, { target });
            }}
          >
            {hasUnread ? <Badge size={6} /> : null}
            {avatar}
          </StyledPin>
        </HStack>
      </StyledPinContainer>
      <HStack style={{ width: isViewing || isHovering ? 248 : 'unset' }}>{thread}</HStack>
    </VStack>
  ) : null;
}
