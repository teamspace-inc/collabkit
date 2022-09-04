import React from 'react';
import { styled } from '@stitches/react';
import { composerStyles } from '@collabkit/theme';

const Root = styled('div', composerStyles.root);

export function Composer(props: { children: React.ReactNode }) {
  return <Root>{props.children}</Root>;
}
