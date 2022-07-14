import React, { useContext, useEffect, useRef } from 'react';
import { useSnapshot } from 'valtio';

import { CommentType, Event, Profile, ThreadType } from '../constants';
import { Avatar } from './Avatar';
import { HStack, styled } from './UIKit';
import { TargetContext } from './Target';
import { formatDistanceToNowStrict } from 'date-fns';
import { isSameComment } from '../utils/isSameComment';
import { useApp } from './useApp';
import { useIsIntersecting } from '../hooks/useIntersectionObserver';
import { Name } from './profile/Name';
import { StyledMessage, StyledMessageTimestamp } from './comment/Message';
// import { MessageToolbar } from './comment/MessageToolbar';
import { ReactionPicker } from './comment/ReactionPicker';
import { SystemBody } from './comment/SystemBody';
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
  gap: '$space$2',
  position: 'relative',
  maxWidth: 'calc(100% - $padding$1)',
  padding: '$padding$1 $padding$2',

  variants: {
    type: {
      default: {},
      'inline-start': {
        paddingBottom: 0,
      },
      inline: {
        paddingTop: 0,
        paddingBottom: 0,
      },
      'inline-end': {
        paddingTop: 0,
        paddingBottom: 0,
      },
      system: {},
    },
  },
});

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
    if (isIntersecting) events.onSeen({ target });
  }, [isIntersecting]);

  // if (props.event.type === 'system') {
  //   return <SystemMessage event={props.event} profile={props.profile} />;
  // }

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
      type={props.type}
      onMouseOver={(e) => events.onMouseOver(e, { target })}
      onMouseOut={(e) => events.onMouseOver(e, { target })}
      ref={ref}
    >
      {showProfile && <Avatar profile={props.profile} size={+theme.sizes.avatarSize} />}
      <HStack>
        <StyledCommentMessage ui="freeform" type={props.type} profileIndent={!showProfile}>
          {showProfile && (
            <Name>
              {props.profile.name || props.profile.email}
              <StyledMessageTimestamp>
                {typeof props.timestamp === 'number'
                  ? formatDistanceToNowStrict(props.timestamp, { roundingMethod: 'floor' })
                  : null}{' '}
                ago
              </StyledMessageTimestamp>
            </Name>
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
