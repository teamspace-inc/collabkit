import { Event, Profile } from '../constants';
import { Avatar } from './Avatar';
import { styled, theme } from './UIKit';
import { Smiley } from 'phosphor-react';
import { useContext, useState } from 'react';
import { Target, TargetContext } from './Target';
import { useSnapshot } from 'valtio';
import { timeDifference } from '../utils/timeDifference';
import { targetEqual } from '../utils/targetEqual';
import { useApp } from './App';

export const StyledComment = styled('div', {
  display: 'flex',
  maxWidth: 'calc(100% - 46px)',
  variants: {
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
  padding: '5px 10px',
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  gap: 0,
  flex: 0,
  fontSize: 14,
  lineHeight: '20px',
  borderRadius: 11,
  color: '$neutral12',
  background: '$neutral2',
  wordBreak: 'break-word',
  variants: {
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
});

const StyledCommentContainer = styled('div', {
  display: 'flex',
  gap: '5px',
  overflowWrap: 'break-word',
  position: 'relative',
  '&:hover': {
    [`.${StyledMessage.className}`]: {
      background: '$neutral4',
    },
  },
});

const StyledName = styled('div', {
  fontSize: 14,
  fontWeight: '600',
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

const ReactionPicker = styled('div', {
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
});

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
  gap: 6,
  position: 'absolute',
  right: 5,
  bottom: -10,
  fontSize: 16,
  borderRadius: 62,
  width: 'auto',
  padding: '1px 5px',
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

export function Comment(props: {
  reactions: { [createdById: string]: Event };
  timestamp: number | object;
  body: string;
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

  const emojiReactionPicker = targetEqual(reactingId, target) ? (
    <ReactionPicker>
      {emojiReacts.map((emoji) => (
        <Target key={emoji} target={{ type: 'commentReaction', comment: target, emoji }}>
          <EmojiReaction emoji={emoji} />
        </Target>
      ))}
    </ReactionPicker>
  ) : null;

  const showProfile = props.type === 'default' || props.type === 'inline-start';

  return props.profile ? (
    <StyledComment
      type={props.type}
      threadType={props.threadType}
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
    >
      <StyledCommentContainer>
        {showProfile && <Avatar profile={props.profile} style={{ position: 'relative', top: 4 }} />}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <StyledMessage
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
            {props.body}
            <Reactions reactions={props.reactions} />
          </StyledMessage>
          <MessageToolbar isVisible={isHovering} />
        </div>
        {emojiReactionPicker}
      </StyledCommentContainer>
    </StyledComment>
  ) : null;
}
