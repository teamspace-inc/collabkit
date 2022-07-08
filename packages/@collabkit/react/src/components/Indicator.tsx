import { useState, useRef } from 'react';
import { Avatar } from './Avatar';
import { StyledMessage, StyledMessageTimestamp } from './comment/Message';
import { Name } from './profile/Name';
import { styled, themeIds, themes } from './UIKit';
import { motion } from 'framer-motion';

const StyledIndicator = styled('div', {
  width: 25,
  height: 25,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  background: '$accent10',
  filter: 'drop-shadow(0 1px 0px rgba(0, 0, 0, 0.1))  drop-shadow(0 1px 2px rgba(0, 0, 0, 0.15))',
  padding: '2px',
  borderRadius: 25,
  userSelect: 'none',
  border: '2px solid $neutral12',
  cursor: 'pointer',

  variants: {
    isActive: {
      true: {
        background: '$neutral1',
      },
    },
  },
});

export function Indicator(props: { letter: string }) {
  const [showComment, setShowComment] = useState(false);
  const themeRef = useRef(() => themes[themeIds[Math.floor(Math.random() * themeIds.length)]]);

  const inner = showComment ? (
    <div className={themeRef.current.toString()}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <StyledMessage ui="indicator">
          <Name>
            Namit Chadha <StyledMessageTimestamp>10:00</StyledMessageTimestamp>
          </Name>
          <div>This number looks off? Did we import the right data?</div>
        </StyledMessage>
      </div>
    </div>
  ) : null;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        maxWidth: '320px',
        filter:
          'drop-shadow(0px 4px 12px rgba(0,0,0,0.1)), drop-shadow(0px 1px 0px rgba(0,0,0,0.2))',
      }}
      onClick={() => setShowComment(!showComment)}
    >
      <motion.div
        animate={{ scale: [0, 1.1, 1] }}
        transition={{ duration: 0.5 }}
        style={{ padding: 10, margin: -10 }}
      >
        <StyledIndicator isActive={showComment}>
          <Avatar profile={{ name: 'A' }} neutralBackground={showComment} />
        </StyledIndicator>
      </motion.div>
      {inner}
    </div>
  );
}
