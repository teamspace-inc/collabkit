import { gray } from '@radix-ui/colors';
import { styled } from '@stitches/react';
import { useRef, useState } from 'react';
import { ChatCircle } from 'phosphor-react';
import { Thread } from './Thread';
import { WorkspaceLoader } from './WorkspaceLoader';

const StyledButton = styled('button', {
  padding: '8px 14px 8px 12px',
  border: '1px solid rgba(0,0,0,0.1)',
  background: 'white',
  color: gray.gray12,
  fontWeight: 600,
  fontSize: '15px',
  lineHeight: '20px',
  borderRadius: 6,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',

  variants: {
    isHovering: {
      true: {
        backgroundColor: gray.gray2,
      },
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
        onMouseOver={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        isHovering={isHovering}
        style={props.style}
        className={props.className}
        onClick={() => setShowThread(!showThread)}
        ref={ref}
      >
        <div style={{ display: 'flex', flexDirection: 'row', gap: '6px' }}>
          <ChatCircle weight="fill" size={18} color={'rgba(0,0,0,0.9)'} />
          Comment
        </div>
      </StyledButton>
      {showThread ? (
        <Thread threadId={threadId} type="popout" onCloseButtonClick={() => setShowThread(false)} />
      ) : null}
    </WorkspaceLoader>
  );
}
