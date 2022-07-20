import React, { useContext, useEffect, useRef, useState } from 'react';
import { useSnapshot } from 'valtio';

import { CommentType, Event, Profile } from '../constants';
import { Avatar } from './Avatar';
import { HStack, styled, theme } from './UIKit';
import { TargetContext } from './Target';
import { isSameComment } from '../utils/isSameComment';
import { useApp } from '../hooks/useApp';
import { useIsIntersecting } from '../hooks/useIntersectionObserver';
import { StyledMessage } from './comment/MessageHeader';
// import { MessageToolbar } from './comment/MessageToolbar';
import { ReactionPicker } from './comment/ReactionPicker';
// import { SystemBody } from './comment/SystemBody';
import { MessageHeader } from './comment/MessageHeader';
// import { hasReactions, Reactions } from './comment/Reactions';
import reactStringReplace from 'react-string-replace';

const StyledCommentMessage = styled(StyledMessage, {
  variants: {
    // indents the comment
    // to account for a profile
    // image
    profileIndent: {
      true: {
        marginLeft: '$padding$4',
      },
      false: {},
    },
  },
});

export const StyledCommentContainer = styled('div', {
  display: 'flex',
  flex: 1,
  gap: '$space$2',
  position: 'relative',
  maxWidth: 'calc(100% - $padding$1)',
  padding: '4px $padding$2',
});

function isElementInViewport(el: Element) {
  var rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) /* or $(window).height() */ &&
    rect.right <=
      (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
  );
}

const StyledMessageFade = styled('span', {
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 100%)',
    opacity: 1,
  },
});

function hasOverflow(ref: React.RefObject<HTMLDivElement>, deps: any[]) {
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    setIsOverflowing(ref.current.offsetHeight < ref.current.scrollHeight);
  }, deps);

  return isOverflowing;
}

export function Comment(props: {
  id: string;
  reactions: { [createdById: string]: Event };
  timestamp: number | object;
  body: string;
  event: Event;
  profile: Profile;
  rootRef: React.RefObject<HTMLDivElement>;
  scrollRef?: React.RefObject<HTMLDivElement>;
  type: CommentType;
  isPreview?: boolean;
}) {
  const ref = useRef(null);
  const bodyRef = useRef(null);
  const { store, events, theme } = useApp();
  const { reactingId } = useSnapshot(store);
  const { target } = useContext(TargetContext);

  if (target == null || target.type !== 'comment') {
    return null;
  }

  // note this means a Comment which has been passed a scrollRef
  // or not, cannot have this changed as it will violate the
  // rules of hook
  const isIntersecting = props.scrollRef
    ? useIsIntersecting({ ref, root: props.scrollRef.current }, [])
    : false;

  useEffect(() => {
    ref.current && isElementInViewport(ref.current) && events.onSeen({ target });
  }, [isIntersecting]);

  const emojiReactionPicker = isSameComment(reactingId, target) ? (
    <ReactionPicker target={target} viewportRef={props.rootRef} />
  ) : null;

  const showProfile = props.type === 'default' || props.type === 'inline-start';

  const body = reactStringReplace(props.body, /\[([\w\d\s]*)\]\(\@[\w\d\s]*\)/g, (match, i) => {
    // todo check if it matches a profile before bolding
    return (
      <span key={i} style={{ fontWeight: 'bold' }}>
        {match}
      </span>
    );
  });

  // console.log(match);

  // const body = props.event.type === 'system' ? <SystemBody event={props.event} /> : rawBody;

  if (props.event.type === 'system') {
    return null;
  }

  const isOverflowing = hasOverflow(bodyRef, [props.body]);

  return props.profile ? (
    <StyledCommentContainer
      style={props.isPreview ? { overflow: 'hidden' } : {}}
      // onMouseOver={(e) => events.onMouseOver(e, { target })}
      // onMouseOut={(e) => events.onMouseOver(e, { target })}
      ref={ref}
    >
      {showProfile && <Avatar profile={props.profile} size={24} />}
      <HStack>
        <StyledCommentMessage profileIndent={!showProfile}>
          {showProfile && (
            <MessageHeader
              name={props.profile.name ?? props.profile.email ?? 'Anonymous'}
              createdAt={+props.timestamp}
            />
          )}
          <span
            ref={bodyRef}
            style={
              props.isPreview ? { position: 'relative', maxHeight: 54, display: 'inline-flex' } : {}
            }
          >
            {body}
            {isOverflowing ? (
              <span
                style={{
                  position: 'absolute',
                  right: '0ch',
                  bottom: 0,
                  background: theme.colors.neutral1.value.toString(),
                }}
              >
                {'...'}
              </span>
            ) : null}
          </span>
          {/* <Reactions reactions={props.reactions} /> */}
        </StyledCommentMessage>
        {/* <MessageToolbar isVisible={isHovering} /> */}
      </HStack>
      {emojiReactionPicker}
    </StyledCommentContainer>
  ) : null;
}
