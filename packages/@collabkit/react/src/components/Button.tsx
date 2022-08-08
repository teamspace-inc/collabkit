import { VStack } from './UIKit';
import React, { useRef, useState } from 'react';
import { ChatCircle } from 'phosphor-react';
import { PopoverThread } from './PopoverThread';
import { useApp } from '../hooks/useApp';
import { styled } from '@stitches/react';

const StyledButton = styled('button', {
  padding: '9px 14px 9px 12px',
  border: '1px solid $neutral6',
  background: 'white',
  color: '$neutral12',
  fontWeight: 700,
  fontSize: '15px',
  lineHeight: '20px',
  borderRadius: 11,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',

  variants: {
    isHovering: {
      true: {
        backgroundColor: '$neutral3',
      },
    },
    isOpen: {
      true: {},
      false: {},
    },
  },
});

export function Button(props: {
  threadId: string;
  style?: React.CSSProperties;
  className?: string;
  defaultOpen?: boolean;
}) {
  const { theme } = useApp();
  const { threadId } = props;
  const [isHovering, setIsHovering] = useState(false);
  const [showThread, setShowThread] = useState(props.defaultOpen);
  const ref = useRef(null);

  return (
    <div
      data-collabkit-internal="true"
      style={{ display: 'flex', flexDirection: 'column', gap: 0 }}
    >
      <StyledButton
        isOpen={showThread}
        onMouseOver={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        isHovering={isHovering}
        style={props.style}
        className={props.className}
        onClick={() => setShowThread(!showThread)}
        ref={ref}
      >
        <VStack style={{ gap: '6px' }}>
          <ChatCircle weight="fill" size={20} color={theme.colors.neutral12.toString()} />
          Comment
        </VStack>
      </StyledButton>
      {showThread ? <PopoverThread threadId={threadId} /> : null}
    </div>
  );
}
