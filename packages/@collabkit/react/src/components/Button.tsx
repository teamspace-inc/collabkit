import { gray, blue } from '@radix-ui/colors';
import { styled } from '@stitches/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { ChatCircle } from 'phosphor-react';
import { WorkspaceContext } from './Workspace';
import { Thread } from './Thread';

const StyledButton = styled('button', {
  padding: '0.5rem 0.75rem',
  border: 'none',
  background: 'white',
  color: gray.gray12,
  fontWeight: 600,
  fontSize: '1rem',
  borderRadius: 6,
  boxShadow: `0px 1px 0px ${gray.gray6}, 0px 1px 4px ${gray.gray4}`,
  cursor: 'pointer',

  variants: {
    isHovering: {
      true: {
        backgroundColor: gray.gray2,
      },
    },
  },
});

// Button states

// plain - no styles
// new comment badged
// new comment see preview

export function Button(props: {
  threadId: string;
  style?: React.CSSProperties;
  className?: string;
}) {
  const { threadId } = props;
  const [isHovering, setIsHovering] = useState(false);
  const [showThread, setShowThread] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    console.log(props.threadId);
  }, [props.threadId]);

  const { workspaceId } = useContext(WorkspaceContext);
  if (!workspaceId) {
    return null;
  }

  // const target: CommentButtonTarget = {
  //   type: 'commentButton',
  //   threadId,
  //   workspaceId,
  // };

  return (
    <>
      <StyledButton
        onMouseOver={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        isHovering={isHovering}
        style={props.style}
        className={props.className}
        onClick={() => setShowThread(!showThread)}
        ref={ref}
      >
        <div style={{ display: 'flex', flexDirection: 'row', gap: '0.25rem', fontWeight: '600' }}>
          <ChatCircle weight="fill" size={20} style={{ marginTop: -2, marginLeft: -2 }} />
          Comment
        </div>
      </StyledButton>
      {showThread ? <Thread threadId={threadId} type="popout"></Thread> : null}
    </>
  );
}
