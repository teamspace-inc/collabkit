import React from 'react';

import { Base } from './Base';

import { useMarkAsSeen } from '../hooks/useMarkAsSeen';
import { useOnMarkdownLinkClick } from '../hooks/useOnMarkdownLinkClick';
import { useThreadContext } from '../hooks/useThreadContext';
import { styled } from '@stitches/react';
import { commentStyles, messageHeaderStyles } from '@collabkit/theme';
import { Event, Profile } from '@collabkit/core';

export function Root(props: {
  children: React.ReactNode;
  className?: string;
  eventId: string;
  style?: React.CSSProperties;
}) {
  const { threadId, workspaceId, userId } = useThreadContext();

  const { eventId } = props;

  const { ref } = useMarkAsSeen({ threadId, workspaceId, eventId, type: 'comment' });

  const { onClick } = useOnMarkdownLinkClick({
    workspaceId,
    threadId,
    userId,
    eventId,
  });

  // todo nc bring this check back, or resolved messages will show up in the thread
  // if (event.type === 'system' || !event.hasProfile || typeof profile !== 'object') {
  //   return null;
  // }

  return (
    <div className={props.className} onClick={onClick} ref={ref} style={props.style}>
      {props.children}
    </div>
  );
}

export const Header = Base;
export const Body = Base;
export const CreatorName = Base;
export const Timestamp = Base;
export const Content = Base;

// Anatomy

const StyledCommentHeader = styled(Header, messageHeaderStyles.root);
const StyledCommentCreatorName = styled(CreatorName, messageHeaderStyles.name);
const StyledCommentTimestamp = styled(Timestamp, messageHeaderStyles.timestamp);
const StyledCommentRoot = styled(Root, commentStyles.root);
const StyledCommentContent = styled(Content, commentStyles.message);
const StyledCommentBody = styled(Body, commentStyles.body);

export default function Comment(props: { event: Event; profile: Profile }) {
  return (
    <StyledCommentRoot>
      <StyledCommentHeader>
        <StyledCommentCreatorName>
          {props.profile.name ?? props.profile.email ?? 'Anonymous'}{' '}
        </StyledCommentCreatorName>
        <StyledCommentTimestamp>{props.event.createdAt}</StyledCommentTimestamp>
      </StyledCommentHeader>
      <StyledCommentBody>
        <StyledCommentContent>{props.event.body}</StyledCommentContent>
      </StyledCommentBody>
    </StyledCommentRoot>
  );
}
