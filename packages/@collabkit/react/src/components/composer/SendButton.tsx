import { styled } from '../UIKit';
import * as Tooltip from '../Tooltip';
import React from 'react';
import { ArrowUp } from 'phosphor-react';
import { useApp } from '../useApp';

export function SendButton(props: { bodyLength: number; workspaceId: string; threadId: string }) {
  const { events, theme } = useApp();
  const { bodyLength, workspaceId, threadId } = props;
  return (
    <Tooltip.Root>
      <StyledComposerSendButton
        disabled={bodyLength === 0}
        onClick={(e) => {
          if (bodyLength > 0) {
            events.onSend(workspaceId, threadId);
          }
        }}
      >
        <ArrowUp
          size={13}
          color={theme.colors.composerButtonIconColor.toString()}
          weight={'bold'}
          style={{ position: 'relative', cursor: 'pointer' }}
        />
      </StyledComposerSendButton>
      <Tooltip.Content>
        Post
        <Tooltip.Arrow />
      </Tooltip.Content>
    </Tooltip.Root>
  );
}

const StyledComposerSendButton = styled(Tooltip.Trigger, {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  width: '$sizes$sendButton',
  height: '$sizes$sendButton',
  position: 'absolute',
  right: '$space$2',
  top: '10px',
  borderRadius: '$sizes$sendButton',
  border: 'none',

  variants: {
    disabled: {
      true: {
        opacity: 0,
      },
      false: {
        backgroundColor: '$colors$composerButtonBackground',
      },
    },
  },
});
