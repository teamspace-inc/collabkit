import { styled, theme } from './UIKit';
import { useRef, useState } from 'react';
import { ChatCircle } from 'phosphor-react';
import { Thread } from './Thread';
import { WorkspaceLoader } from './WorkspaceLoader';

const StyledButton = styled('button', {
  padding: '9px 14px 9px 12px',
  border: '1px solid $neutral6',
  background: 'white',
  color: '$neutral12',
  fontWeight: 600,
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
  const { threadId } = props;
  const [isHovering, setIsHovering] = useState(false);
  const [showThread, setShowThread] = useState(props.defaultOpen);
  const ref = useRef(null);

  return (
    <WorkspaceLoader>
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
        <div style={{ display: 'flex', flexDirection: 'row', gap: '6px' }}>
          <ChatCircle weight="fill" size={20} color={theme.colors.neutral12.toString()} />
          Comment
        </div>
      </StyledButton>
      {showThread ? (
        <Thread threadId={threadId} type="popout" onCloseButtonClick={() => setShowThread(false)} />
      ) : null}
    </WorkspaceLoader>
  );
}
