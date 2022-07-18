import React from 'react';
import { Avatar } from './Avatar';
import { HStack, styled, VStack } from './UIKit';
import { useApp } from '../hooks/useApp';
import { useSnapshot } from 'valtio';
import { useWorkspace } from '../hooks/useWorkspace';
import { PinTarget } from '../constants';
import { Badge } from './Badge';
import { PopoverThread } from './PopoverThread';
import { useHasUnread } from '../hooks/useHasUnread';

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
  // so the pin is centered
  marginTop: 'calc($sizes$pin / -2)',
  marginLeft: 'calc($sizes$pin / -2)',
});

export function Pin(props: { pinId: string }) {
  const { pinId } = props;
  const { store, events } = useApp();
  const { viewingId, hoveringId, profiles } = useSnapshot(store);

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

  const thread =
    (isViewing || isHovering) && profile && (pin.state === 'open' || pin.state === 'pending') ? (
      <div
        style={{ cursor: isHovering && !isViewing ? 'pointer' : 'default' }}
        onPointerDown={(e) => {
          if (isHovering && !isViewing) {
            e.stopPropagation();
            e.preventDefault();
            events.onPointerDown(e, { target });
          }
        }}
      >
        <PopoverThread threadId={props.pinId} isPreview={isHovering && !isViewing} />
      </div>
    ) : null;

  if (!profile) {
    console.warn('Pin has no profile');
  }

  return pin && profile ? (
    <VStack
      style={{ gap: 8 }}
      onMouseOver={(e) => !isViewing && events.onMouseOver(e, { target })}
      onMouseLeave={(e) => events.onMouseOut(e, { target })}
      data-collabkit-internal="true"
    >
      <StyledPinContainer>
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
