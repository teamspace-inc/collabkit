import React, { useContext, useEffect, useRef, useState } from 'react';
import { useSnapshot } from 'valtio';

import { CommentType, Event, Profile } from '../constants';
import { Avatar } from './Avatar';
import { HStack } from './UIKit';
import { TargetContext } from './Target';
import { isSameComment } from '../utils/isSameComment';
import { useApp } from '../hooks/useApp';
// import { MessageToolbar } from './comment/MessageToolbar';
import { ReactionPicker } from './comment/ReactionPicker';
// import { SystemBody } from './comment/SystemBody';
import { MessageHeader } from './comment/MessageHeader';
// import { hasReactions, Reactions } from './comment/Reactions';
import reactStringReplace from 'react-string-replace';
import {
  StyledCommentContainer,
  StyledCommentMessage,
  StyledCommentBody,
  StyledCommentBodyEllipsis,
} from './comment/StyledComment';

import { useInView } from 'react-intersection-observer';
import { useWindowFocus } from '../hooks/useWindowFocus';
import { WithHasProfile } from '@collabkit/core';

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
  seen?: boolean;
  event: WithHasProfile<Event>;
  profile: Profile;
  rootRef: React.RefObject<HTMLDivElement>;
  type: CommentType;
  isPreview?: boolean;
}) {
  // const ref = useRef<HTMLDivElement | null>(null);
  const bodyRef = useRef(null);
  const { store, events } = useApp();
  const { reactingId } = useSnapshot(store);
  const { target } = useContext(TargetContext);

  if (target == null || target.type !== 'comment') {
    return null;
  }

  const isWindowFocused = useWindowFocus();
  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    const shouldMarkSeen = isWindowFocused && inView;
    if (shouldMarkSeen) {
      events.onSeen({ target });
    }
  }, [isWindowFocused, inView]);

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

  // const body = props.event.type === 'system' ? <SystemBody event={props.event} /> : rawBody;

  const isOverflowing = hasOverflow(bodyRef, [props.body]);

  if (props.event.type === 'system') {
    return null;
  }

  if (!props.event.hasProfile) {
    return null;
  }

  return typeof props.profile === 'object' ? (
    <StyledCommentContainer
      seen={props.seen}
      type={props.type ?? 'default'}
      isPreview={props.isPreview}
      // onMouseOver={(e) => events.onMouseOver(e, { target })}
      // onMouseOut={(e) => events.onMouseOver(e, { target })}
      ref={ref}
    >
      {showProfile && <Avatar profile={props.profile} />}
      <HStack>
        <StyledCommentMessage profileIndent={!showProfile}>
          {showProfile && (
            <MessageHeader
              name={props.profile.name ?? props.profile.email ?? 'Anonymous'}
              createdAt={+props.timestamp}
            />
          )}
          <StyledCommentBody ref={bodyRef} isPreview={props.isPreview}>
            {body}
            {isOverflowing ? <StyledCommentBodyEllipsis>{'...'}</StyledCommentBodyEllipsis> : null}
          </StyledCommentBody>
          {/* <Reactions reactions={props.reactions} /> */}
        </StyledCommentMessage>
        {/* <MessageToolbar isVisible={isHovering} /> */}
      </HStack>
      {emojiReactionPicker}
    </StyledCommentContainer>
  ) : null;
}
