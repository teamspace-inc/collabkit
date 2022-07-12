import React, { useState, useRef } from 'react';
import { Avatar } from './Avatar';
import { StyledMessage, StyledMessageTimestamp } from './comment/Message';
import { Name } from './profile/Name';
import { styled, themeIds, themes } from './UIKit';
import { motion } from 'framer-motion';
import { Thread } from './Thread';
import { useApp } from './App';
import { useSnapshot } from 'valtio';
import { useWorkspaceId } from './Workspace';
import { useWorkspace } from './WorkspaceLoader';
import { PinTarget } from '../constants';

const StyledPin = styled('div', {
  width: 'calc($sizes$pinSize + 2px)',
  height: 'calc($sizes$pinSize + 2px)',
  borderRadius: 'calc($sizes$pinSize + 2px)',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  userSelect: 'none',
  border: '2px solid $neutral1',
  cursor: 'pointer',

  variants: {
    isActive: {
      true: {
        background: '$neutral12',
      },
    },
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
  const { uiState, viewingId, profiles } = useSnapshot(store);
  const { workspaceId } = useWorkspaceId();
  const [showPreview, setShowPreview] = useState(false);
  const [showThread, setShowThread] = useState(false);
  const themeRef = useRef(() => themes[themeIds[Math.floor(Math.random() * themeIds.length)]]);
  const ref = useRef<HTMLDivElement | null>(null);

  const { workspace } = useWorkspace();
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

  const thread =
    uiState === 'viewing' &&
    viewingId?.threadId === props.pinId &&
    viewingId.workspaceId === workspaceId ? (
      <div style={{ display: 'flex', flexDirection: 'column', width: 280, height: 200 }}>
        <Thread threadId={props.pinId} />
      </div>
    ) : null;

  const preview =
    !showThread && showPreview && profile && firstEvent ? (
      <div style={{ position: 'absolute', left: 0, top: 0, width: 240 }}>
        <div style={{}}>
          <StyledMessage
            ui="freeform"
            style={{ display: 'flex', flexDirection: 'row', width: 240, gap: 8 }}
            onClick={() => {
              setShowThread(!showThread);
            }}
          >
            <StyledPin isActive={false}>
              <Avatar profile={profile} neutralBackground={showThread} />
            </StyledPin>
            <div style={{ display: 'flex', flexDirection: 'column', width: 240, gap: 0 }}>
              <Name>
                {profile.name} <StyledMessageTimestamp>10:00</StyledMessageTimestamp>
              </Name>
              <div>{firstEvent.body}</div>
            </div>
          </StyledMessage>
        </div>
      </div>
    ) : null;

  if (!profile) {
    console.warn('Pin has no profile');
  }

  return pin && profile ? (
    <div ref={ref}>
      <div
        style={{
          flexDirection: 'column',
          display: 'flex',
          // maxWidth: '280px',
          position: 'relative',
          filter:
            'drop-shadow(0px 4px 12px rgba(0,0,0,0.1)), drop-shadow(0px 1px 0px rgba(0,0,0,0.2))',
        }}
        onMouseOver={() => setShowPreview(true)}
        onMouseLeave={() => setShowPreview(false)}
      >
        <motion.div
          animate={{ scale: [0, 1.1, 1] }}
          transition={{ duration: 0.5 }}
          style={{
            padding: 10,
            margin: -10,
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
          }}
          className={themeRef.current.toString()}
        >
          <StyledPin
            isActive={showThread}
            onPointerDown={(e) => {
              e.stopPropagation();
              e.preventDefault();
              events.onPointerDown(e, { target });
            }}
            // onClick={() => {
            //   showThread && setShowThread(false);
            // }}
          >
            <Avatar profile={profile} neutralBackground={showThread} />
          </StyledPin>
        </motion.div>
        {thread}
        {pin.state === 'open' ? preview : null}
      </div>
    </div>
  ) : null;
}
