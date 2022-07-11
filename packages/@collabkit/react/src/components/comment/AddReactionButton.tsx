import React, { useContext } from 'react';
import { styled } from '@stitches/react';
import { Smiley } from 'phosphor-react';
import { useApp } from '../App';
import { TargetContext } from '../Target';
import { theme } from '../UIKit';

const StyledMessageButton = styled('button', {
  padding: 0,
  width: '22px',
  height: '22px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  borderRadius: '22px',
  alignItems: 'center',
  border: 'none',
  cursor: 'pointer',
  background: '$neutral1',
  '&:hover': {
    background: '$neutral4',
  },
});

export function AddReactionButton() {
  const { events } = useApp();
  if (!events) {
    return null;
  }
  const { target } = useContext(TargetContext);
  if (target == null || target.type !== 'comment') {
    return null;
  }
  return target ? (
    <>
      <StyledMessageButton onPointerDown={(e) => events.onEmojiReactPointerDown(e, { target })}>
        <Smiley weight="regular" size={18} color={theme.colors.neutral9.toString()} />
      </StyledMessageButton>
    </>
  ) : null;
}
