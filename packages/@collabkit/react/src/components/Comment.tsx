import React from 'react';

import { Base } from './Base';

import { useMarkAsSeen } from '../hooks/useMarkAsSeen';
import { useOnMarkdownLinkClick } from '../hooks/useOnMarkdownLinkClick';
import { useThreadContext } from '../hooks/useThreadContext';
import { styled } from '@stitches/react';
import { commentStyles, messageHeaderStyles } from '@collabkit/theme';
import { Event, Profile } from '@collabkit/core';
import { Markdown } from './Markdown';
import { useSnapshot } from 'valtio';
import { useCommentStore } from './useCommentStore';
import { CommentContext } from '../hooks/useCommentContext';
import { Timestamp as RawTimestamp } from './Timestamp';

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
    <CommentContext.Provider value={{ eventId }}>
      <div className={props.className} onClick={onClick} ref={ref} style={props.style}>
        {props.children}
      </div>
    </CommentContext.Provider>
  );
}

export function Body(props: React.ComponentPropsWithoutRef<'div'>) {
  const { body } = useSnapshot(useCommentStore());

  return (
    <div {...props}>
      <Markdown body={body}></Markdown>
    </div>
  );
}

export function Timestamp(props: React.ComponentPropsWithoutRef<'span'>) {
  const { createdAt } = useSnapshot(useCommentStore());
  return <RawTimestamp timestamp={+createdAt} {...props} />;
}

export const Header = Base;
export const CreatorName = Base;
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
