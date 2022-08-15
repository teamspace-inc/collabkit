import * as Tooltip from '../Tooltip';
import React from 'react';
import { ArrowUp } from 'phosphor-react';
import { useApp } from '../../hooks/useApp';
import { styled } from '@stitches/react';
import { sendButtonStyles } from '@collabkit/theme';

const StyledComposerSendButton = styled(Tooltip.Trigger, sendButtonStyles.button);

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
