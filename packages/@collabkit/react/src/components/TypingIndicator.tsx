import React from 'react';

import { composerStyles } from '@collabkit/theme';
import { styled } from '@stitches/react';
import { Typers } from './Typers';
import { useSnapshot } from 'valtio';
import { useApp } from '../hooks/useApp';

const StyledTypingOffset = styled('div', composerStyles.typingOffset);

export function TypingIndicator(props: { workspaceId: string | null; threadId: string }) {
  const { store } = useApp();
  const { userId } = useSnapshot(store);
  const workspace = props.workspaceId ? store.workspaces[props.workspaceId] : null;
  const isTyping = workspace?.composers[props.threadId]?.isTyping;
  return userId ? (
    <StyledTypingOffset>
      <Typers userId={userId} isTyping={isTyping} />
    </StyledTypingOffset>
  ) : null;
}
