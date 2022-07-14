import React, { useState } from 'react';
import { Avatar } from './Avatar';
import { styled, themeIds, themes } from './UIKit';
import { motion } from 'framer-motion';
import { useApp } from './useApp';
import { useSnapshot } from 'valtio';
import { useWorkspace } from '../hooks/useWorkspace';
import { PinTarget } from '../constants';
import { PinPreview } from './PinPreview';

const StyledPin = styled('div', {
  width: '$sizes$pinSize',
  height: '$sizes$pinSize',
  borderRadius: '$radii$pin',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  userSelect: 'none',
  border: '2px solid $colors$pinBorderColor',
  cursor: 'pointer',

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
  marginTop: -12,
  marginLeft: -12,
});

export function Pin(props: { pinId: string }) {
  const { store, events, theme } = useApp();
  const { viewingId, hoveringId, profiles } = useSnapshot(store);
  const [currentTheme] = useState(
    () => themes[themeIds[Math.floor(Math.random() * themeIds.length)]]
  );

  const { workspace, workspaceId } = useWorkspace();
  const pin = workspace.pins[props.pinId];
  const profile = pin ? profiles[pin.createdById] : null;

  const firstEventId = workspace.timeline[props.pinId]
    ? Object.keys(workspace.timeline[props.pinId])[0]
    : null;
  const firstEvent = firstEventId ? workspace.timeline[props.pinId][firstEventId] : null;

  const target: PinTarget = {
    type: 'pin',
    pinId: props.pinId,
    workspaceId,
  };

  const showThread = viewingId?.type === 'pin' && viewingId.pinId === props.pinId;

  const showPreview = hoveringId?.type === 'pin' && hoveringId.pinId === props.pinId;

  const avatar = profile ? (
    <Avatar profile={profile} size={+theme.sizes.pinSize.toString()} />
  ) : null;

  const preview =
    !showThread && showPreview && profile && firstEvent ? (
      <PinPreview target={target} avatar={avatar} profile={profile} event={firstEvent} />
    ) : null;

  if (!profile) {
    console.warn('Pin has no profile');
  }

  return pin && profile ? (
    <StyledPinContainer>
      <div
        style={{
          flexDirection: 'column',
          display: 'flex',
          position: 'relative',
          filter:
            'drop-shadow(0px 4px 12px rgba(0,0,0,0.1)), drop-shadow(0px 1px 0px rgba(0,0,0,0.2))',
        }}
        onMouseOver={(e) => events.onMouseOver(e, { target })}
        onMouseLeave={(e) => events.onMouseOut(e, { target })}
      >
        <motion.div
          animate={{ scale: [0.9, 1.1, 1] }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
          }}
          className={currentTheme.className}
        >
          <StyledPin
            onPointerDown={(e) => {
              e.stopPropagation();
              e.preventDefault();
              events.onPointerDown(e, { target });
            }}
          >
            {avatar}
          </StyledPin>
        </motion.div>
        {pin.state === 'open' ? preview : null}
      </div>
    </StyledPinContainer>
  ) : null;
}
