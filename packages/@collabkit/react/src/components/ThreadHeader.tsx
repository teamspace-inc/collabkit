import { styled } from '@stitches/react';
import React from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { threadHeaderStyles } from '@collabkit/theme';

const Root = styled('div', threadHeaderStyles.root);
const Left = styled('div', threadHeaderStyles.left);
const Right = styled('div', threadHeaderStyles.right);

export function ThreadHeader(props: {
  renderLeft?: () => React.ReactNode;
  renderRight?: () => React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <Root>
      <Tooltip.Provider delayDuration={0}>
        <Left>{props.renderLeft?.()}</Left>
        {props.children}
        <Right>{props.renderRight?.()}</Right>
      </Tooltip.Provider>
    </Root>
  );
}
