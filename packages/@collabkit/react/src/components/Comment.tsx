import React, { useMemo, useCallback } from 'react';
import { useMarkAsSeen } from '../hooks/useMarkAsSeen';
import { useOnMarkdownLinkClick } from '../hooks/useOnMarkdownLinkClick';
import { useThreadContext } from '../hooks/useThreadContext';
import { Markdown } from './Markdown';
import { useSnapshot } from 'valtio';
import { useCommentStore } from '../hooks/useCommentStore';
import { CommentContext, useCommentContext } from '../hooks/useCommentContext';
import { Timestamp as RawTimestamp } from './Timestamp';
import { useId } from '../hooks/useId';
import * as Profile from './Profile';
import { useWorkspaceStore } from '../hooks/useWorkspaceStore';
import { useApp } from '../hooks/useApp';
import { CommentTarget, timelineUtils } from '@collabkit/core';
import * as styles from '../styles/components/Comment.css';
import { DotsThree } from './icons';
import { Menu, MenuItem } from './Menu';

export function Provider(props: { children: React.ReactNode; eventId: string }) {
  const { threadId, workspaceId } = useThreadContext();
  const { eventId } = props;
  const treeId = useId();

  const target = useMemo<CommentTarget>(
    () => ({ type: 'comment', workspaceId, threadId, eventId, treeId }),
    [workspaceId, threadId, eventId, treeId]
  );

  const timeline = useSnapshot(useWorkspaceStore().timeline[threadId]);
  const event = timeline?.[eventId];
  const createdById = event?.createdById;

  if (!createdById) {
    return null;
  }

  if (event.type === 'system' || !event.hasProfile) {
    return null;
  }

  return (
    <CommentContext.Provider value={target}>
      <Profile.Provider profileId={createdById}>{props.children}</Profile.Provider>
    </CommentContext.Provider>
  );
}

export function Root(props: {
  children: React.ReactNode;
  className?: string;
  eventId: string;
  style?: React.CSSProperties;
}) {
  const { threadId, workspaceId, userId } = useThreadContext();
  const { eventId } = props;
  const treeId = useId();

  const target = useMemo<CommentTarget>(
    () => ({ type: 'comment', workspaceId, threadId, eventId, treeId }),
    [workspaceId, threadId, eventId, treeId]
  );

  const { ref } = useMarkAsSeen(target);

  const { onClick } = useOnMarkdownLinkClick({
    workspaceId,
    threadId,
    userId,
    eventId,
  });

  const timeline = useSnapshot(useWorkspaceStore().timeline[threadId]);
  const event = timeline?.[eventId];
  const createdById = event?.createdById;

  if (!createdById) {
    return null;
  }

  if (event.type === 'system' || !event.hasProfile) {
    return null;
  }

  return (
    <CommentContext.Provider value={target}>
      <Profile.Provider profileId={createdById}>
        <div
          className={props.className ?? styles.root}
          onClick={onClick}
          ref={ref}
          style={props.style}
        >
          {props.children}
        </div>
      </Profile.Provider>
    </CommentContext.Provider>
  );
}

export function Body({ ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const { body } = useSnapshot(useCommentStore());
  const { store } = useApp();

  const { callbacks, editingId } = useSnapshot(store);
  const { eventId, treeId } = useCommentContext();
  const isEditing = editingId?.eventId === eventId && editingId.treeId == treeId;

  const canClickLinks = !!callbacks?.onMentionClick || !!callbacks?.onTimestampClick;

  if (isEditing) {
    return null;
  }

  return (
    <div {...props} className={props.className ?? styles.body}>
      <Markdown
        className={canClickLinks ? styles.markdown : styles.markdownLinksNotClickable}
        body={body}
      />
    </div>
  );
}

export const Editor = (props: React.ComponentProps<'div'>) => {
  const { store } = useApp();
  const { editingId } = useSnapshot(store);
  const { eventId, treeId } = useCommentContext();
  const isEditing = editingId?.eventId === eventId && editingId.treeId == treeId;

  if (!isEditing) {
    return null;
  }

  return <div {...props} className={props.className ?? styles.editor} />;
};

export function Timestamp(
  props: React.ComponentProps<'time'> & { format?: (timestamp: number) => string }
) {
  const { createdAt } = useSnapshot(useCommentStore());
  return (
    <RawTimestamp
      {...props}
      className={props.className ?? styles.timestamp}
      timestamp={+createdAt}
    />
  );
}

export const CreatorName = Profile.Name;
export const Header = (props: React.ComponentProps<'div'>) => (
  <div {...props} className={props.className ?? styles.header} />
);
export const NameAndTimestampWrapper = (props: React.ComponentProps<'div'>) => (
  <div {...props} className={props.className ?? styles.nameAndTimestampWrapper} />
);
export const Content = (props: { profileIndent?: boolean } & React.ComponentProps<'div'>) => {
  const { profileIndent, ...forwardProps } = props;
  return <div {...forwardProps} className={props.className ?? styles.content({ profileIndent })} />;
};

type CommentMenuItemType = 'commentEditButton' | 'commentDeleteButton' | 'reopenThreadButton';

export const Actions = (props: React.ComponentProps<'div'>) => {
  return <div className={styles.actions}>{props.children}</div>;
};

const CommentMenu = (props: { className?: string }) => {
  const { events, store } = useApp();
  const comment = useCommentContext();

  const { threadId, workspaceId } = useThreadContext();

  const { workspaces } = useSnapshot(store);
  const workspace = workspaces[workspaceId];
  const timeline = workspace.timeline[threadId];

  const isResolved = timelineUtils.computeIsResolved(timeline);

  const onItemClick = useCallback(
    (e: React.MouseEvent, type: CommentMenuItemType) => {
      events.onClick(e, {
        target: type === 'reopenThreadButton' ? { type, threadId, workspaceId } : { type, comment },
      });
    },
    [comment, threadId, workspaceId]
  );

  return (
    <Menu<CommentMenuItemType>
      icon={<DotsThree size={16} weight={'light'} />}
      onItemClick={onItemClick}
    >
      <MenuItem label="Edit" targetType="commentEditButton" />
      <MenuItem label="Delete" targetType="commentDeleteButton" />
      {isResolved && <MenuItem label="Re-open" targetType="reopenThreadButton" />}
    </Menu>
  );
};

export { CommentMenu as MoreMenu };

// Anatomy

// No customisation = Dom's design. You just import Thread and Inbox, and it looks like what we provide (oh and yes you can set dark/light mode);

// Set our theme props, and it customises our out of the box components for you to match your app. This will get you 95% of the way there.

// If you want to change the layout, add/remove things, and generally go further you can take our unstyled components and assemble your own commenting UI using it.

// Use the headless JS API and write whatever, use Angular or Ember or Backbone? You can do that too.

// export default function ExampleComment(props: { eventId: string }) {
//   return (
//     <Comment.Root eventId={props.eventId}>
//       <Comment.Content>
//         <Comment.Header>
//           <Profile.Avatar />
//           <Comment.Timestamp />
//         </Comment.Header>
//         <Comment.Body />
//       </Comment.Content>
//     </Comment.Root>
//   );
// }
