import React from 'react';
import { styled } from './UIKit';

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
  fontSize: '11px',
  fontWeight: '700',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '$colors$primaryText',
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
              ...props.style,
            }
          : props.style
      }
    >
      {props.number}
    </StyledBadge>
  );
}
