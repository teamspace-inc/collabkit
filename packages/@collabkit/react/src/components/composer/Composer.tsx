import React from 'react';

import { styled } from '@stitches/react';

import { composerStyles } from '@collabkit/theme';

const StyledComposerRoot = styled('div', composerStyles.root);

export function Composer(props: {
  workspaceId: string;
  threadId: string;
  userId: string;
  hideAvatar?: boolean;
  children: React.ReactNode;
}) {
  return <StyledComposerRoot>{props.children}</StyledComposerRoot>;
}
