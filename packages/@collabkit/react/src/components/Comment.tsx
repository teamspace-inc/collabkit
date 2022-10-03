import React, { useMemo, useCallback } from 'react';
import { css } from '@stitches/react';
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
import { ComposerContext } from './composer/Composer';
import { CommentTarget, CommentType, timelineUtils } from '@collabkit/core';
import * as styles from '../styles/Comment.css';
import { Check, DotsThree } from './icons';
import { Menu, MenuItem } from './Menu';
import { IconButton } from './IconButton';

const markdownStyle = css({
  p: {
    margin: 0,
  },

  a: {
    textDecoration: 'none',
    fontWeight: '$fontWeights$mention',
    color: '$colors$mentionText',
    background: '$colors$mentionTextBackground',

    // hack for cashboard, the variant doesn't work for
    // nested selectors
    cursor: 'default !important',
  },

  variants: {
    canClickLinks: {
      true: {
        a: {
          '&:hover': {
            cursor: 'pointer',
          },
        },
        false: {
          a: {
            '&:hover': {
              cursor: 'default',
            },
          },
        },
      },
    },
  },
});

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
  type?: CommentType; // why don't we just fetch this from the store?
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
          className={props.className ?? styles.root({ type: props.type })}
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
      <Markdown className={markdownStyle({ canClickLinks })} body={body} />
    </div>
  );
}

export const Editor = (props: React.ComponentProps<'div'>) => {
  const { store } = useApp();
  const { editingId } = useSnapshot(store);
  const comment = useCommentStore();
  const { eventId, treeId } = useCommentContext();
  const isEditing = editingId?.eventId === eventId && editingId.treeId == treeId;

  if (!isEditing) {
    return null;
  }
  return (
    <ComposerContext.Provider value={comment}>
      <div {...props} className={props.className ?? styles.editor} />
    </ComposerContext.Provider>
  );
};

export function Timestamp(
  props: React.ComponentProps<'time'> & { format?: (timestamp: number, now: number) => string }
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

type CommentMenuItemType = 'commentEditButton' | 'commentDeleteButton';

const CommentMenu = (props: { className?: string }) => {
  const { events, store } = useApp();
  const comment = useCommentContext();

  const { createdById } = useCommentStore();
  const { threadId, workspaceId, userId } = useThreadContext();

  const { workspaces } = useSnapshot(store);
  const workspace = workspaces[workspaceId];
  const timeline = workspace.timeline[threadId];
  const isFirstComment = Object.keys(timeline)[0] === comment.eventId;

  const isResolved = timelineUtils.computeIsResolved(timeline);

  const onItemClick = useCallback(
    (e: React.MouseEvent, type: CommentMenuItemType) => {
      events.onClick(e, { target: { type, comment } });
    },
    [comment]
  );

  return (
    <div className={styles.actions}>
      {isFirstComment && createdById === userId && (
        <IconButton
          // TODO: tooltip hijacks focus when used within a modal popover
          // tooltip={isResolved ? 'Re-open' : 'Mark as Resolved and Hide'}
          onPointerDown={(e) =>
            events.onPointerDown(e, {
              target: {
                threadId,
                workspaceId,
                type: 'reopenThreadButton',
              },
            })
          }
        >
          {!isResolved && <Check size={18} weight={'regular'} />}
        </IconButton>
      )}
      {createdById === userId && (
        <Menu<CommentMenuItemType>
          className={props.className ?? styles.menu}
          icon={<DotsThree size={18} />}
          onItemClick={onItemClick}
        >
          <MenuItem className={styles.menuItem} label="Edit" targetType="commentEditButton" />
          <MenuItem className={styles.menuItem} label="Delete" targetType="commentDeleteButton" />
        </Menu>
      )}
    </div>
  );
};

export { CommentMenu as Menu };

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
