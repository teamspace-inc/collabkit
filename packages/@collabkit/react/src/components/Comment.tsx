import React from 'react';

import { Base } from './Base';

import { useMarkAsSeen } from '../hooks/useMarkAsSeen';
import { useOnMarkdownLinkClick } from '../hooks/useOnMarkdownLinkClick';
import { useThreadContext } from '../hooks/useThreadContext';
import { styled } from '@stitches/react';
import { avatarStyles, commentStyles, messageHeaderStyles } from '@collabkit/theme';
import { Markdown } from './Markdown';
import { useSnapshot } from 'valtio';
import { useCommentStore } from './useCommentStore';
import { CommentContext } from '../hooks/useCommentContext';
import { Timestamp as RawTimestamp } from './Timestamp';

import * as Profile from './Profile';
import { useWorkspaceStore } from './useWorkspaceStore';

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

  const timeline = useSnapshot(useWorkspaceStore().timeline[threadId]);
  const event = timeline?.[eventId];
  const createdById = event.createdById;

  if (!createdById) {
    return null;
  }

  if (event.type === 'system' || !event.hasProfile) {
    return null;
  }

  return (
    <CommentContext.Provider value={{ eventId }}>
      <Profile.Provider profileId={createdById}>
        <div className={props.className} onClick={onClick} ref={ref} style={props.style}>
          {props.children}
        </div>
      </Profile.Provider>
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

export const CreatorName = Profile.Name;
export const Header = Base;
export const Content = Base;

// Anatomy

const StyledCommentHeader = styled(Header, messageHeaderStyles.root);
const StyledCommentCreatorName = styled(CreatorName, messageHeaderStyles.name);
const StyledCommentTimestamp = styled(Timestamp, messageHeaderStyles.timestamp);
const StyledCommentRoot = styled(Root, commentStyles.root);
const StyledCommentContent = styled(Content, commentStyles.message);
const StyledCommentBody = styled(Body, commentStyles.body);
const StyledCommentCreatorAvatar = styled(Profile.Avatar, avatarStyles.avatar);

// No customisation = Dom's design. You just import Thread and Inbox, and it looks like what we provide (oh and yes you can set dark/light mode);

// Set our theme props, and it customises our out of the box components for you to match your app. This will get you 95% of the way there.

// If you want to change the layout, add/remove things, and generally go further you can take our unstyled components and assemble your own commenting UI using it.

// Use the headless JS API and write whatever, use Angular or Ember or Backbone? You can do that too.

export default function Comment(props: { eventId: string }) {
  return (
    <StyledCommentRoot eventId={props.eventId}>
      <StyledCommentContent>
        <StyledCommentHeader>
          <StyledCommentCreatorAvatar />
          <StyledCommentCreatorName />
          <StyledCommentTimestamp />
        </StyledCommentHeader>
        <StyledCommentBody />
      </StyledCommentContent>
    </StyledCommentRoot>
  );
}
