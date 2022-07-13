import React, { useRef } from 'react';
import { Avatar } from './Avatar';
import { StyledMessage, StyledMessageTimestamp } from './comment/Message';
import { Name } from './profile/Name';
import { styled, theme, themeIds, themes } from './UIKit';
import { motion } from 'framer-motion';
import { PopoverThread } from './PopoverThread';
import { useApp } from './App';
import { useSnapshot } from 'valtio';
import { useWorkspace } from '../hooks/useWorkspace';
import { PinTarget } from '../constants';

const StyledPin = styled('div', {
  width: '$sizes$pinSize',
  height: '$sizes$pinSize',
  borderRadius: '$sizes$pinSize',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  userSelect: 'none',
  border: '2px solid $neutral1',
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

export function Pin(props: { pinId: string }) {
  const { store, events } = useApp();
  const { uiState, viewingId, hoveringId, profiles } = useSnapshot(store);
  const themeRef = useRef(() => themes[themeIds[Math.floor(Math.random() * themeIds.length)]]);
  const ref = useRef<HTMLDivElement | null>(null);

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

  const showPreview = hoveringId?.type === 'pin' && hoveringId.pinId === props.pinId;

  const showThread = false;

  const thread =
    uiState === 'viewing' &&
    viewingId?.threadId === props.pinId &&
    viewingId.workspaceId === workspaceId ? (
      <div style={{ display: 'flex', flexDirection: 'column', width: 280 }}>
        <PopoverThread threadId={props.pinId} />
      </div>
    ) : null;

  const preview =
    !showThread && showPreview && profile && firstEvent ? (
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: theme.sizes.threadPreviewWidth.toString(),
        }}
      >
        <StyledMessage
          ui="preview"
          onPointerDown={(e) => {
            events.onPointerDown(e, { target });
          }}
        >
          <StyledPin style={{ border: 'none' }}>
            <Avatar profile={profile} style={{ flexShrink: 0 }} />
          </StyledPin>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: theme.padding['0'].toString(),
            }}
          >
            <Name>
              {profile.name} <StyledMessageTimestamp>10:00</StyledMessageTimestamp>
            </Name>
            <div>{firstEvent.body}</div>
            <b style={{ marginTop: theme.space['3'].toString() }}>Reply</b>
          </div>
        </StyledMessage>
      </div>
    ) : null;

  if (!profile) {
    console.warn('Pin has no profile');
  }

  return pin && profile ? (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
            padding: 6,
            margin: -10,
            marginTop: -8,
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
          }}
          className={themeRef.current.toString()}
        >
          <StyledPin
            onPointerDown={(e) => {
              e.stopPropagation();
              e.preventDefault();
              events.onPointerDown(e, { target });
            }}
            // onClick={() => {
            //   showThread && setShowThread(false);
            // }}
          >
            <Avatar profile={profile} size={28} />
          </StyledPin>
        </motion.div>
        {pin.state === 'open' ? preview : null}
      </div>
      {thread}
    </div>
  ) : null;
}
