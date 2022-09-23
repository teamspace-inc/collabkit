import React, { useContext } from 'react';
import { styled } from '@stitches/react';
import { Smiley } from '../icons';
import { reactionButtonStyles } from '@collabkit/theme';
import { useApp } from '../../hooks/useApp';
import { TargetContext } from '../Target';

const StyledReactionButton = styled('button', reactionButtonStyles);

export function ReactionButton() {
  const { events, theme } = useApp();
  // todo create a hook that ensures a target is set
  const target = useContext(TargetContext);
  if (target == null || target.type !== 'comment') {
    return null;
  }
  return target ? (
    <>
      <StyledReactionButton
        onPointerDown={(e: React.PointerEvent) => events.onEmojiReactPointerDown(e, { target })}
      >
        <Smiley weight="regular" size={18} color={theme.colors.neutral9.toString()} />
      </StyledReactionButton>
    </>
  ) : null;
}
