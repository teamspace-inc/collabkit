import React, { useContext, useRef } from 'react';
import { CommentTarget } from '../../constants';
import { TargetContext } from '../Target';
import { useApp } from '../../hooks/useApp';
import { styled } from '@stitches/react';
import { reactionPickerStyles } from '@collabkit/theme';

const emojiReacts = ['👍', '❤️', '😂', '😮', '😢', '🙏'];

const StyledReactionPicker = styled('div', reactionPickerStyles.picker);
const StyledEmojiReaction = styled('div', reactionPickerStyles.emojiReaction);

function EmojiReaction(props: { emoji: string }) {
  const { events } = useApp();
  if (!events) {
    return null;
  }
  const target = useContext(TargetContext);
  if (target == null || target.type !== 'commentReaction') {
    return null;
  }

  return (
    <StyledEmojiReaction
      onClick={(e: React.MouseEvent) => events.onEmojiReactionClick(e, { target })}
    >
      {props.emoji}
    </StyledEmojiReaction>
  );
}

export function ReactionPicker(props: { target: CommentTarget }) {
  const ref = useRef(null);
  return (
    <StyledReactionPicker ref={ref}>
      {emojiReacts.map((emoji) => (
        <TargetContext.Provider
          key={emoji}
          value={{ type: 'commentReaction', comment: props.target, emoji } as const}
        >
          <EmojiReaction emoji={emoji} />
        </TargetContext.Provider>
      ))}
    </StyledReactionPicker>
  );
}
