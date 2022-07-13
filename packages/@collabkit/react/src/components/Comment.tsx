import React, { useContext, useEffect, useRef, useState } from 'react';
import { useSnapshot } from 'valtio';

import { CommentType, Event, Profile, ThreadType } from '../constants';
import { Avatar } from './Avatar';
import { styled, theme } from './UIKit';
import { TargetContext } from './Target';
import { timeDifference } from '../utils/timeDifference';
import { isSameComment } from '../utils/isSameComment';
import { useApp } from './App';
import { useIsIntersecting } from '../hooks/useIntersectionObserver';
import { MODAL_Z_INDEX } from './Thread';
import { Name } from './profile/Name';
import { StyledMessage, StyledMessageTimestamp } from './comment/Message';
import { MessageToolbar } from './comment/MessageToolbar';
import { ReactionPicker } from './comment/ReactionPicker';
import { SystemBody } from './comment/SystemBody';
import { hasReactions, Reactions } from './comment/Reactions';

export const StyledCommentContainer = styled('div', {
  display: 'flex',
  gap: '$space$2',
  position: 'relative',
  maxWidth: 'calc(100% - $padding$1)',
  variants: {
    ui: {
      bubbles: {
        '&:hover': {
          [`.${StyledMessage.className}`]: {
            background: '$colors$bubbleHoverBackground',
          },
        },
      },
      freeform: {
        padding: '$padding$1 $padding$2',
      },
    },
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
  threadType: ThreadType;
}) {
  const ref = useRef(null);
  const { store, events } = useApp();
  if (!store || !events) {
    return null;
  }
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

  const zStyles = { zIndex: MODAL_Z_INDEX + 1 };

  return props.profile ? (
    <StyledCommentContainer
      style={isSameComment(reactingId, target) ? zStyles : {}}
      ui="freeform"
      type={props.type}
      onMouseOver={(e) => events.onMouseOver(e, { target })}
      onMouseOut={(e) => events.onMouseOver(e, { target })}
      ref={ref}
    >
      {showProfile && (
        <Avatar
          profile={props.profile}
          size={+theme.sizes.avatarSize}
          style={{ position: 'relative' }}
        />
      )}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <StyledMessage
          ui="freeform"
          type={props.type}
          style={{
            marginLeft: showProfile ? 0 : theme.padding[4].toString(),
            // marginBottom: hasReactions(props.reactions) ? theme.padding[2].toString() : 0,
          }}
        >
          {showProfile && (
            <Name>
              {props.profile.name || props.profile.email}
              <StyledMessageTimestamp>
                {typeof props.timestamp === 'number'
                  ? timeDifference(+new Date(), props.timestamp)
                  : null}
              </StyledMessageTimestamp>
            </Name>
          )}
          {body}
          {/* <Reactions reactions={props.reactions} /> */}
        </StyledMessage>
        {/* <MessageToolbar isVisible={isHovering} /> */}
      </div>
      {emojiReactionPicker}
    </StyledCommentContainer>
  ) : null;
}
