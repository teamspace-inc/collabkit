import React from 'react';
import * as Tooltip from './Tooltip';
import { styled } from '@stitches/react';
import { iconButtonStyles } from '@collabkit/theme';

const StyledIconButton = styled('div', iconButtonStyles.button);

export function IconButton(props: {
  children: React.ReactNode;
  tooltip: string;
  onPointerDown?: (e: React.PointerEvent) => void;
}) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger>
        <StyledIconButton onPointerDown={(e) => props.onPointerDown?.(e)}>
          {props.children}
        </StyledIconButton>
      </Tooltip.Trigger>
      <Tooltip.Content>
        {props.tooltip}
        <Tooltip.Arrow />
      </Tooltip.Content>
    </Tooltip.Root>
  );
}
