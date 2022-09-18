import { buttonStyles } from '@collabkit/theme';
import { styled } from '@stitches/react';
import React from 'react';

const StyledButton = styled('div', buttonStyles.button);

export function Button(props: {
  type: 'primary' | 'secondary' | 'tertiary';
  icon?: React.ReactNode;
  text?: React.ReactNode;
  disabled?: boolean;
  style?: React.CSSProperties;
  onPointerDown: (e: React.PointerEvent) => void;
}) {
  return (
    <StyledButton
      onPointerDown={props.onPointerDown}
      type={props.type}
      hasIcon={!!props.icon}
      hasText={!!props.text}
      disabled={props.disabled}
      style={props.style}
      
    >
      {props.icon}
      {props.text}
    </StyledButton>
  );
}
