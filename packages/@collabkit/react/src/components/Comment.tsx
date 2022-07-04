import { CommentTarget, Event, Profile } from '../constants';
import { Avatar } from './Avatar';
import { styled, theme } from './UIKit';
import { CheckCircle, Circle, RadioButton, Smiley } from 'phosphor-react';
import { useContext, useRef, useState } from 'react';
import { Target, TargetContext } from './Target';
import { useSnapshot } from 'valtio';
import { timeDifference } from '../utils/timeDifference';
import { isSameComment } from '../utils/isSameComment';
import { useApp } from './App';
import { keyframes } from '@stitches/react';
import {
  intersectionStyles,
  TLBoundsCorner,
  TLBoundsEdge,
  useIntersectionObserver,
} from '../hooks/useIntersectionObserver';

export const StyledComment = styled('div', {
  display: 'flex',
  maxWidth: 'calc(100% - 46px)',
  variants: {
    ui: {
      bubbles: {},
    },
    threadType: {
      inline: {},
      popout: {},
    },
    type: {
      default: {
        padding: '5px 10px 5px',
      },
      'inline-start': {
        padding: '5px 10px 1px',
      },
      inline: {
        padding: '1px 10px',
      },
      'inline-end': {
        padding: '1px 10px 5px',
      },
      system: {
        padding: '5px 10px 5px',
      },
    },
  },
});

const StyledMessageTimestamp = styled('span', {
  fontSize: 12,
  color: '$neutral9',
  textDecoration: 'none',
  fontWeight: '400',
});

export const StyledMessage = styled('div', {
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  gap: 0,
  flex: 0,
  fontSize: 14,
  lineHeight: '20px',
  color: '$neutral12',
  wordBreak: 'break-word',
  variants: {
    ui: {
      bubbles: {
        padding: '5px 10px',
        background: '$neutral2',
        borderRadius: 11,
      },
    },
    type: {
      default: {},
      'inline-start': {
        borderBottomLeftRadius: 3,
      },
      inline: {
        borderBottomLeftRadius: 3,
        borderTopLeftRadius: 3,
      },
      'inline-end': {
        borderTopLeftRadius: 3,
      },
    },
  },
  compoundVariants: [
    {
      ui: 'bubbles',
      type: 'inline-start',
      css: {
        borderRadius: 11,
        borderBottomLeftRadius: 3,
      },
    },
    {
      ui: 'bubbles',
      type: 'inline',
      css: {
        borderRadius: 11,
        borderBottomLeftRadius: 3,
        borderTopLeftRadius: 3,
      },
    },
    {
      ui: 'bubbles',
      type: 'inline-end',
      css: {
        borderRadius: 11,
        borderTopLeftRadius: 3,
      },
    },
  ],
});

const StyledCommentContainer = styled('div', {
  display: 'flex',
  gap: '5px',
  overflowWrap: 'break-word',
  position: 'relative',

  variants: {
    ui: {
      bubbles: {
        '&:hover': {
          [`.${StyledMessage.className}`]: {
            background: '$neutral4',
          },
        },
      },
    },
  },
});

export const StyledName = styled('div', {
  fontSize: 14,
  fontWeight: '500',
  lineHeight: '20px',
  display: 'flex',
  gap: 5,
});

const MessageButton = styled('button', {
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
        [TLBoundsEdge.Right]: {
          opacity: 1,
          transform: `translateX(calc(-100% + 1em))`,
        },
        [TLBoundsEdge.Bottom]: {
          opacity: 1,
          transform: `translateY(calc(100% + 50px))`,
        },
        [TLBoundsCorner.BottomRight]: {
          opacity: 1,
          transform: `translateY(calc(100% + 50px))`,
        },
        none: {
          opacity: 1,
        },
        pending: {
          opacity: 0,
        },
      },
    },
  }
);

const emojiReacts = ['👍', '❤️', '😂', '😮', '😢', '🙏'];

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

function ReactionPicker(props: { target: CommentTarget }) {
  const ref = useRef(null);
  const intersection = useIntersectionObserver(ref, [props.target]);
  console.log({ intersection });

  return (
    <StyledReactionPicker ref={ref} intersection={intersection}>
      {emojiReacts.map((emoji) => (
        <Target key={emoji} target={{ type: 'commentReaction', comment: props.target, emoji }}>
          <EmojiReaction emoji={emoji} />
        </Target>
      ))}
    </StyledReactionPicker>
  );
}

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

function AddReactionButton() {
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
      <MessageButton onPointerDown={(e) => events.onEmojiReactPointerDown(e, { target })}>
        <Smiley weight="regular" size={18} color={theme.colors.neutral9.toString()} />
      </MessageButton>
    </>
  ) : null;
}

const StyledMessageToolbar = styled('div', {
  position: 'absolute',
  display: 'flex',
  height: '100%',
  alignItems: 'flex-start',
  justifyContent: 'center',
  top: '4px',
  right: '-24px',
  variants: {
    isVisible: {
      true: {
        pointerEvents: 'all',
        opacity: 1,
      },
      false: {
        pointerEvent: 'none',
        opacity: 0,
      },
    },
  },
});

function MessageToolbar(props: { isVisible: boolean }) {
  return (
    <StyledMessageToolbar isVisible={props.isVisible}>
      <AddReactionButton />
    </StyledMessageToolbar>
  );
}

const StyledReactions = styled('div', {
  background: 'white',
  display: 'inline-flex',
  flex: 1,
  gap: 3,
  position: 'absolute',
  right: 5,
  bottom: -15,
  fontSize: 15,
  lineHeight: '15px',
  borderRadius: '15px',
  width: 'auto',
  padding: '2px 3px',
  boxShadow: `0px 1px 0px rgba(0,0,0,0.075), 0px 1px 3px rgba(0,0,0,0.05)`,
  cursor: 'pointer',
});

// const StyledReactionProfileName = styled('span', {
//   color: `$neutral11`,
//   fontSize: 12,
// });

function Reactions(props: { reactions: { [createdById: string]: Event } }) {
  const { store } = useApp();
  if (!store) {
    return null;
  }
  // const { profiles } = useSnapshot(store);

  return props.reactions ? (
    <StyledReactions>
      {Object.keys(props.reactions).map((createdById, i) =>
        props.reactions[createdById].body.length > 0 ? (
          <div key={i}>
            {props.reactions[createdById].body}
            {/* <StyledReactionProfileName>{profiles[createdById].name}</StyledReactionProfileName> */}
          </div>
        ) : null
      )}
    </StyledReactions>
  ) : null;
}

function hasReactions(reactions: { [createdById: string]: Event } | null | undefined) {
  return (
    reactions &&
    Object.keys(reactions).length > 0 &&
    Object.keys(reactions).filter((createdById) => reactions[createdById].body.length > 0).length >
      0
  );
}

const loadingFade = keyframes({
  '0%': { opacity: 0, transform: 'scale(1)' },
  '50%': { opacity: 0.8, transform: 'scale(1.2)' },
  '100%': { opacity: 0, transform: 'scale(1)' },
});

const TypingDot = styled('div', {
  width: 5,
  height: 5,
  background: '$neutral9',
  borderRadius: '50px',
  opacity: 0,
  animation: `${loadingFade} 1.5s infinite`,
});

const TypingDots = styled('div', {
  width: '28px',
  height: '20px',
  display: 'flex',
  gap: '5px',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
});

const SystemMessageText = styled('span', {
  display: 'flex',
  gap: '5px',
  padding: '0px 0 0px',
  color: '$neutral10',
  alignItems: 'center',
});

function SystemBody(props: { event: Event }) {
  return props.event.system === 'resolve' ? (
    <SystemMessageText>
      <CheckCircle size={19} weight="fill" color={theme.colors.accent10.toString()} />
      Marked as Resolved
    </SystemMessageText>
  ) : (
    <SystemMessageText>
      <RadioButton size={19} weight="regular" color={theme.colors.neutral6.toString()} />
      Reopened this thread
    </SystemMessageText>
  );
}

export function TypingIndicator(props: { profile: Profile }) {
  return (
    <StyledComment type={'default'} ui="bubbles">
      <Avatar profile={props.profile} style={{ position: 'relative', top: 4 }} />
      <StyledCommentContainer ui="bubbles" style={{ left: 5 }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <StyledMessage ui="bubbles">
            <TypingDots>
              <TypingDot style={{ animationDelay: '0s' }} />
              <TypingDot style={{ animationDelay: '0.2s' }} />
              <TypingDot style={{ animationDelay: '0.4s' }} />
            </TypingDots>
          </StyledMessage>
        </div>
      </StyledCommentContainer>
    </StyledComment>
  );
}

export function Comment(props: {
  reactions: { [createdById: string]: Event };
  timestamp: number | object;
  body: string;
  event: Event;
  profile: Profile;
  type: 'default' | 'inline' | 'inline-start' | 'inline-end';
  threadType: 'inline' | 'popout';
}) {
  const { store } = useApp();
  if (!store) {
    return null;
  }
  const [isHovering, setIsHovering] = useState(false);
  const { reactingId } = useSnapshot(store);
  const { target } = useContext(TargetContext);

  if (target == null || target.type !== 'comment') {
    return null;
  }

  // if (props.event.type === 'system') {
  //   return <SystemMessage event={props.event} profile={props.profile} />;
  // }

  const emojiReactionPicker = isSameComment(reactingId, target) ? (
    <ReactionPicker target={target} />
  ) : null;

  const showProfile = props.type === 'default' || props.type === 'inline-start';

  const body = props.event.type === 'system' ? <SystemBody event={props.event} /> : props.body;

  if (props.event.type === 'system') {
    return null;
  }

  return props.profile ? (
    <StyledComment
      ui="bubbles"
      type={props.type}
      threadType={props.threadType}
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
    >
      <StyledCommentContainer ui="bubbles">
        {showProfile && <Avatar profile={props.profile} style={{ position: 'relative', top: 4 }} />}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <StyledMessage
            ui="bubbles"
            type={props.type}
            style={{
              marginLeft: showProfile ? 0 : 30,
              marginBottom: hasReactions(props.reactions) ? 15 : 0,
            }}
          >
            {showProfile && (
              <StyledName>
                {props.profile.name || props.profile.email}
                <StyledMessageTimestamp>
                  {typeof props.timestamp === 'number'
                    ? timeDifference(+new Date(), props.timestamp)
                    : null}
                </StyledMessageTimestamp>
              </StyledName>
            )}
            {body}
            <Reactions reactions={props.reactions} />
          </StyledMessage>
          <MessageToolbar isVisible={isHovering} />
        </div>
        {emojiReactionPicker}
      </StyledCommentContainer>
    </StyledComment>
  ) : null;
}
