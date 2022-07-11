import React, { useContext, useEffect, useRef, useState } from 'react';
import { useSnapshot } from 'valtio';

import { Event, Profile } from '../constants';
import { Avatar } from './Avatar';
import { styled } from './UIKit';
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
  gap: '5px',
  position: 'relative',
  // enough space for the react button
  // with bubbles on
  maxWidth: 'calc(100% - 10px)',
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

export function Comment(props: {
  id: string;
  reactions: { [createdById: string]: Event };
  timestamp: number | object;
  body: string;
  event: Event;
  profile: Profile;
  rootRef: React.RefObject<HTMLDivElement>;
  scrollRef: React.RefObject<HTMLDivElement>;
  type: 'default' | 'inline' | 'inline-start' | 'inline-end';
  threadType: 'inline' | 'popout';
}) {
  const ref = useRef(null);
  const { store, events } = useApp();
  if (!store || !events) {
    return null;
  }
  const [isHovering, setIsHovering] = useState(false);
  const { reactingId } = useSnapshot(store);
  const { target } = useContext(TargetContext);

  if (target == null || target.type !== 'comment') {
    return null;
  }

  const isIntersecting = useIsIntersecting({ ref, root: props.scrollRef.current }, []);

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
      ui="bubbles"
      type={props.type}
      threadType={props.threadType}
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
      ref={ref}
    >
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
          <Reactions reactions={props.reactions} />
        </StyledMessage>
        <MessageToolbar isVisible={isHovering} />
      </div>
      {emojiReactionPicker}
    </StyledCommentContainer>
  ) : null;
}
