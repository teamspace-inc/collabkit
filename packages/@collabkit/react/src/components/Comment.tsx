import React, { useContext, useEffect, useRef } from 'react';
import { useSnapshot } from 'valtio';

import { CommentType, Event, Profile } from '../constants';
import { Avatar } from './Avatar';
import { HStack, styled } from './UIKit';
import { TargetContext } from './Target';
import { isSameComment } from '../utils/isSameComment';
import { useApp } from '../hooks/useApp';
import { useIsIntersecting } from '../hooks/useIntersectionObserver';
import { StyledMessage } from './comment/MessageHeader';
// import { MessageToolbar } from './comment/MessageToolbar';
import { ReactionPicker } from './comment/ReactionPicker';
import { SystemBody } from './comment/SystemBody';
import { MessageHeader } from './comment/MessageHeader';
// import { hasReactions, Reactions } from './comment/Reactions';

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
  // variants: {
  //   type: {
  //     default: {},
  //     'inline-start': {
  //       paddingBottom: 0,
  //     },
  //     inline: {
  //       paddingTop: 0,
  //       paddingBottom: 0,
  //     },
  //     'inline-end': {
  //       paddingTop: 0,
  //       paddingBottom: 0,
  //     },
  //     system: {},
  //   },
  // },
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
}) {
  const ref = useRef(null);
  const { store, events } = useApp();
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

  const body = props.event.type === 'system' ? <SystemBody event={props.event} /> : props.body;

  if (props.event.type === 'system') {
    return null;
  }

  return props.profile ? (
    <StyledCommentContainer
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
          {body}
          {/* <Reactions reactions={props.reactions} /> */}
        </StyledCommentMessage>
        {/* <MessageToolbar isVisible={isHovering} /> */}
      </HStack>
      {emojiReactionPicker}
    </StyledCommentContainer>
  ) : null;
}
