import { styled } from '@stitches/react';
import React from 'react';

const StyledBadge = styled('div', {
  backgroundColor: '$colors$badgeColor',
  width: 6,
  height: 6,
  borderRadius: 8,
  position: 'absolute',
  border: '$sizes$pinBorderWidth solid $colors$pinBorderColor',
  top: 'calc(-$sizes$pinBorderWidth)',
  right: 'calc(-$sizes$pinBorderWidth)',
  textAlign: 'center',
  fontSize: '9px',
  fontWeight: '700',
  display: 'flex',
  lineHeight: '6px',
  justifyContent: 'center',
  color: 'white',
});

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
