import { sendButtonStyles } from '@collabkit/theme';
import { styled } from '@stitches/react';
import React from 'react';
import { useSnapshot } from 'valtio';
import { useApp } from '../../hooks/useApp';
import { useThreadContext } from '../../hooks/useThreadContext';
import { Button } from '../Button';
import { ArrowUp } from '../icons';

const StyledComposerSendButtonIcon = styled(ArrowUp, sendButtonStyles.icon);

export function ComposerSendButton() {
  const { store, events, theme } = useApp();
  const { threadId } = useThreadContext();
  const { workspaceId, workspaces } = useSnapshot(store);

  if (!workspaceId) {
    return null;
  }
  const workspace = workspaces[workspaceId];

  const composer = workspace ? workspace.composers[threadId] : null;

  const bodyLength = composer?.$$body.trim().length ?? 0;

  return (
    <Button
      onPointerDown={(e) => {
        events.onSend(workspaceId, threadId);
      }}
      type="primary"
      icon={
        <StyledComposerSendButtonIcon
          size={13}
          color={theme.colors.composerButtonIconColor.toString()}
          weight="bold"
        />
      }
      disabled={bodyLength === 0}
    />
  );
}
