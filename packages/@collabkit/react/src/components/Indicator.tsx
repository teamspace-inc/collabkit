import { useState, useRef } from 'react';
import { Avatar } from './Avatar';
import { StyledMessage, StyledMessageTimestamp } from './comment/Message';
import { Name } from './profile/Name';
import { styled, themeIds, themes } from './UIKit';
import { motion } from 'framer-motion';
import { Profile } from '../constants';
import { Thread } from './Thread';
import { useApp } from './App';
import { useSnapshot } from 'valtio';
import { useWorkspaceId } from './Workspace';

const StyledIndicator = styled('div', {
  width: 25,
  height: 25,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  background: '$accent10',
  padding: '2px',
  borderRadius: 25,
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

export function Indicator(props: { threadId: string }) {
  const { store } = useApp();
  const { uiState, viewingId } = useSnapshot(store);
  const { workspaceId } = useWorkspaceId();
  const [showPreview, setShowPreview] = useState(false);
  const [showThread, setShowThread] = useState(false);
  const themeRef = useRef(() => themes[themeIds[Math.floor(Math.random() * themeIds.length)]]);

  const profile: Profile = { name: 'Namit' };
  const event = {
    createdAt: new Date(),
    body: 'This number looks off? Did we import the right data?',
  };

  const thread =
    uiState === 'viewing' &&
    viewingId?.threadId === props.threadId &&
    viewingId.workspaceId === workspaceId ? (
      <div style={{ display: 'flex', flexDirection: 'column', width: 280, height: 200 }}>
        <Thread threadId={props.threadId} />
      </div>
    ) : null;

  const preview =
    !showThread && showPreview ? (
      <div style={{ position: 'absolute', left: -10, top: -10, width: 240 }}>
        <div style={{}}>
          <StyledMessage
            ui="preview"
            style={{ display: 'flex', flexDirection: 'row', width: 240, gap: 10 }}
            onClick={() => {
              setShowThread(!showThread);
            }}
          >
            <StyledIndicator isActive={false}>
              <Avatar profile={profile} neutralBackground={showThread} />
            </StyledIndicator>
            <div style={{ display: 'flex', flexDirection: 'column', width: 240, gap: 0 }}>
              <Name>
                {profile.name} <StyledMessageTimestamp>10:00</StyledMessageTimestamp>
              </Name>
              <div>{event.body}</div>
            </div>
          </StyledMessage>
        </div>
      </div>
    ) : null;

  return (
    <div
      style={{
        display: 'flex',
        maxWidth: '280px',
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
        <StyledIndicator
          isActive={showThread}
          onClick={() => {
            showThread && setShowThread(false);
          }}
        >
          <Avatar profile={profile} neutralBackground={showThread} />
        </StyledIndicator>
      </motion.div>
      {thread}
      {preview}
    </div>
  );
}
