import { buttonStyles } from '@collabkit/theme';
import { styled } from '@stitches/react';
import React from 'react';

const StyledButton = styled('div', buttonStyles.button);

export function Button(props: {
  type: 'primary' | 'secondary';
  icon?: React.ReactNode;
  text?: React.ReactNode;
  disabled?: boolean;
  onPointerDown: (e: React.PointerEvent) => void;
}) {
  return (
    <StyledButton
      onPointerDown={props.onPointerDown}
      type={props.type}
      hasIcon={!!props.icon}
      hasText={!!props.text}
      disabled={props.disabled}
    >
      {props.icon}
      {props.text}
    </StyledButton>
  );
}
