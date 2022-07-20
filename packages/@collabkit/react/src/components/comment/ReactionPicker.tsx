import React, { RefObject, useContext, useRef } from 'react';
import { CommentTarget } from '../../constants';
import { Target } from '../Target';
import { Corner, Edge } from '../../hooks/useIntersectionObserver';
import { useApp } from '../../hooks/useApp';
import { TargetContext } from '../Target';
import { styled } from '../UIKit';

const emojiReacts = ['👍', '❤️', '😂', '😮', '😢', '🙏'];

const StyledReactionPicker = styled(
  'div',
  {
    padding: '5px 5px',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: '30px',
    boxShadow: '0px 5px 20px rgba(0,0,0,0.1), 0px 1px 0px rgba(0,0,0,0.05)',
    position: 'absolute',
    top: '-45px',
    left: '30px',
    background: 'white',
    fontSize: '24px',
    zIndex: 999,
  },
  {
    variants: {
      intersection: {
        [Edge.Right]: {
          opacity: 1,
          transform: `translateX(calc(-100% + 1em))`,
        },
        [Edge.Bottom]: {
          opacity: 1,
          transform: `translateY(calc(100% + 50px))`,
        },
        [Corner.BottomRight]: {
          opacity: 1,
          transform: `translateY(calc(-100% + 50px))`,
        },
        none: {
          opacity: 1,
        },
        pending: {
          opacity: 1,
        },
      },
    },
  }
);

const StyledEmojiReaction = styled('div', {
  width: '35px',
  height: '35px',
  display: 'flex',
  borderRadius: '35px',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',

  '&:hover': {
    background: '$neutral3',
  },
});

function EmojiReaction(props: { emoji: string }) {
  const { events } = useApp();
  if (!events) {
    return null;
  }
  const { target } = useContext(TargetContext);
  if (target == null || target.type !== 'commentReaction') {
    return null;
  }

  return (
    <StyledEmojiReaction onClick={(e) => events.onEmojiReactionClick(e, { target })}>
      {props.emoji}
    </StyledEmojiReaction>
  );
}

export function ReactionPicker(props: {
  target: CommentTarget;
  viewportRef: RefObject<HTMLDivElement>;
}) {
  const ref = useRef(null);
  const root = props.viewportRef.current;
  // const intersection = useIntersectionObserver({ ref, root }, [props.target]);
  return (
    <StyledReactionPicker ref={ref}>
      {emojiReacts.map((emoji) => (
        <Target
          key={emoji}
          target={{ type: 'commentReaction', comment: props.target, emoji } as const}
        >
          <EmojiReaction emoji={emoji} />
        </Target>
      ))}
    </StyledReactionPicker>
  );
}
