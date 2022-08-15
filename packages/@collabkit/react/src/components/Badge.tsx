import { styled } from '@stitches/react';
import React from 'react';
import { badgeStyles } from '@collabkit/theme';

const StyledBadge = styled('div', badgeStyles.badge);

export function Badge(props: { size: number; number?: number; style?: React.CSSProperties }) {
  return (
    <StyledBadge
      style={
        props.size
          ? {
              width: props.size,
              height: props.size,
              borderRadius: props.size,
              lineHeight: `${props.size}px`,
              ...props.style,
            }
          : props.style
      }
    >
      {props.number}
    </StyledBadge>
  );
}
