import React, { useMemo, useCallback, useRef, useLayoutEffect } from 'react';
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
import { useHovering } from '../hooks/useHovering';
import { ResolveThreadIconButton } from './ResolveThreadIconButton';
import { CommentEditor } from './CommentEditor';

export function CommentProvider(props: { children: React.ReactNode; eventId: string }) {
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

export function CommentRoot(props: {
  children: React.ReactNode;
  className?: string;
  commentId: string;
  style?: React.CSSProperties;
}) {
  const { threadId, workspaceId, userId } = useThreadContext();
  const { commentId: eventId } = props;
  const treeId = useId();
  const ref = useRef<HTMLDivElement>(null);

  const target = useMemo<CommentTarget>(
    () => ({ type: 'comment', workspaceId, threadId, eventId, treeId }),
    [workspaceId, threadId, eventId, treeId]
  );

  const { ref: setMarkAsSeenRef } = useMarkAsSeen(target);

  useHovering(ref, target);

  useLayoutEffect(() => {
    if (ref.current) {
      setMarkAsSeenRef(ref.current);
    }
  }, [ref]);

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

export function CommentBody({ ...props }: React.ComponentPropsWithoutRef<'div'>) {
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

export function CommentTimestamp(
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

export const CommentCreatorName = Profile.Name;
export const CommentHeader = (props: React.ComponentProps<'div'>) => (
  <div {...props} className={props.className ?? styles.header} />
);
export const CommentNameAndTimestampWrapper = (props: React.ComponentProps<'div'>) => (
  <div {...props} className={props.className ?? styles.nameAndTimestampWrapper} />
);
export const CommentContent = (props: React.ComponentProps<'div'>) => {
  const { ...forwardProps } = props;
  return <div {...forwardProps} className={props.className ?? styles.content} />;
};

export const CommentIndent = (props: React.ComponentProps<'div'>) => {
  const { ...forwardProps } = props;
  return <div {...forwardProps} className={props.className ?? styles.indent} />;
};

type CommentMenuItemType = 'commentEditButton' | 'commentDeleteButton' | 'reopenThreadButton';

export const CommentActions = (props: React.ComponentProps<'div'>) => {
  // const { store } = useApp();
  // const { hoveringId } = useSnapshot(store);
  // const { eventId } = useCommentContext();
  // if (hoveringId?.type === 'comment' && hoveringId.eventId === eventId) {
  return <div className={styles.actions}>{props.children}</div>;
  // } else {
  //   return null;
  // }
};

const CommentMenu = () => {
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

export default function Comment(props: {
  commentId: string;
  hideProfile?: boolean;
  showResolveThreadButton?: boolean;
}) {
  const hideProfile = props.hideProfile ?? false;
  const showResolveThreadButton = props.showResolveThreadButton ?? false;

  return (
    <Comment.Root commentId={props.commentId}>
      <Comment.Content>
        <Comment.Header>
          {!hideProfile && <Profile.Avatar />}
          {!hideProfile && (
            <Comment.NameAndTimestampWrapper>
              <Comment.CreatorName />
              <Comment.Timestamp />
            </Comment.NameAndTimestampWrapper>
          )}
          <Comment.Actions>
            {showResolveThreadButton && <ResolveThreadIconButton />}
            <Comment.MoreMenu />
          </Comment.Actions>
        </Comment.Header>
        <Comment.Indent>
          <Comment.Body />
        </Comment.Indent>
        <CommentEditor />
      </Comment.Content>
    </Comment.Root>
  );
}

Comment.Root = CommentRoot;
Comment.Content = CommentContent;
Comment.Header = CommentHeader;
Comment.NameAndTimestampWrapper = CommentNameAndTimestampWrapper;
Comment.CreatorName = CommentCreatorName;
Comment.Timestamp = CommentTimestamp;
Comment.Body = CommentBody;
Comment.Indent = CommentIndent;
Comment.Actions = CommentActions;
Comment.MoreMenu = CommentMenu;
Comment.Editor = Editor;

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
