import React, { useMemo, useCallback, useRef } from 'react';
import { useMarkAsSeen } from '../hooks/useMarkAsSeen';
import { useOnMarkdownLinkClick } from '../hooks/useOnMarkdownLinkClick';
import { useThreadContext } from '../hooks/useThreadContext';
import { Markdown } from './Markdown';
import { useSnapshot } from 'valtio';
import { useCommentStore } from '../hooks/useCommentStore';
import { CommentContext, useCommentContext } from '../hooks/useCommentContext';
import { Timestamp as RawTimestamp } from './Timestamp';
import { useId } from '../hooks/useId';
import Profile from './Profile';
import { useWorkspaceStore } from '../hooks/useWorkspaceStore';
import { useApp } from '../hooks/useApp';
import { CommentTarget, PinTarget, timelineUtils } from '@collabkit/core';
import * as styles from '../theme/components/Comment.css';
import { ArrowBendDownRight, ArrowBendUpRight, DotsThree, Smiley } from './icons';
import { Menu, MenuItem } from './Menu';
import { Thread } from './Thread';
import { useHovering } from '../hooks/useHovering';
import { mergeRefs } from 'react-merge-refs';
import Composer from './composer/Composer';
import { IconButton } from './IconButton';
import CommentPinSvg from './composer/comment-pin.svg';
import CommentPinSelectedSvg from './composer/comment-pin-hover.svg';
import { Tooltip } from './Tooltip';
import { useComments } from '../hooks/public/useComments';
import { useUnreadCount } from '..';
import { vars } from '../theme/theme/index.css';
import { useOptionalChannelContext } from '../hooks/useChannelContext';
import { Popover } from './Popover';
import { EMOJI_U, ReactionPicker } from './ReactionPicker';
import { Emoji } from './Emoji';

function useIsEditing() {
  const { store } = useApp();
  const { editingId } = useSnapshot(store);
  const { eventId, treeId } = useCommentContext();
  return editingId?.eventId === eventId && editingId.treeId == treeId;
}

// tidy up root and provider
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

  if (event.type === 'system') {
    return null;
  }

  return (
    <CommentContext.Provider value={target}>
      <Profile.Provider profileId={createdById}>{props.children}</Profile.Provider>
    </CommentContext.Provider>
  );
}

type CommentRootProps = {
  commentId: string;
  indent?: boolean;
} & React.ComponentPropsWithRef<'div'>;

function CommentRoot({ commentId: eventId, indent = false, ...props }: CommentRootProps) {
  const { threadId, workspaceId, userId } = useThreadContext();
  const treeId = useId();

  const target = useMemo<CommentTarget>(
    () => ({ type: 'comment', workspaceId, threadId, eventId, treeId }),
    [workspaceId, threadId, eventId, treeId]
  );

  const divRef = useRef(null);
  const { ref: seenRef } = useMarkAsSeen(target);

  const ref = mergeRefs([divRef, seenRef]);

  const { onClick } = useOnMarkdownLinkClick({
    workspaceId,
    threadId,
    userId,
    eventId,
  });

  const { store } = useApp();

  const { menuId, reactingId } = useSnapshot(store);

  const timeline = useSnapshot(useWorkspaceStore().timeline[threadId]);

  const { profiles } = useSnapshot(store);

  const event = timeline[eventId];

  const createdById = event.createdById;

  const isHovering =
    // hovering or the menu is open and the menu is for this comment
    useHovering(divRef) ||
    (menuId?.type === 'menu' &&
      menuId.context?.type === 'comment' &&
      menuId.context.eventId === event.id) ||
    (reactingId?.type === 'comment' && reactingId.eventId === eventId);

  if (!createdById) {
    console.warn('CommentRoot: no createdById', { eventId });
    return null;
  }

  if (event.type === 'system') {
    return null;
  }

  if (!profiles[event.createdById]) {
    return null;
  }

  return (
    <CommentContext.Provider value={target}>
      <Profile.Provider profileId={createdById}>
        <div
          data-testid="collabkit-comment-root"
          className={`${props.className ?? styles.root({ indent })} ${
            isHovering ? styles.hover : ''
          }`}
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

export function CommentUnreadDot(props: React.ComponentPropsWithoutRef<'div'>) {
  const { threadId } = useThreadContext();
  const count = useUnreadCount({ threadId });
  return count > 0 ? <div className={styles.unreadDot} {...props} /> : null;
}

export function CommentReplyButton() {
  const { events } = useApp();
  const { eventId, workspaceId, threadId } = useCommentContext();
  const target = {
    type: 'commentReplyButton',
    eventId,
    threadId,
    workspaceId,
  } as const;
  return (
    <IconButton onClick={(e) => events.onClick(e, { target })}>
      <ArrowBendUpRight weight="regular" />
    </IconButton>
  );
}

export function CommentReplyCountButton(props: React.ComponentPropsWithoutRef<'div'>) {
  const commentIds = useComments();
  const { store, events } = useApp();
  const { expandedThreadIds } = useSnapshot(store);
  const { threadId, workspaceId, eventId } = useCommentContext();
  const isEditing = useIsEditing();

  const target = {
    type: 'commentReplyCountButton',
    workspaceId,
    threadId,
    eventId,
  } as const;

  if (isEditing) {
    return null;
  }

  if (commentIds.length === 1) {
    return null;
  }

  if (expandedThreadIds.find((id) => id === threadId)) {
    return null;
  }

  return (
    <div
      className={styles.replyCountButton}
      onClick={(e) => events.onClick(e, { target })}
      {...props}
    >
      <ArrowBendDownRight
        weight="regular"
        className={styles.replyCountButtonIcon}
        color={vars.color.textDisabled}
      />
      <span className={styles.replyCountButtonText}>
        {commentIds.length - 1} {commentIds.length != 2 ? 'replies' : 'reply'}
      </span>
    </div>
  );
}

export function CommentBody({ ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const { body } = useSnapshot(useCommentStore());
  const { callbacks } = useSnapshot(useApp().store);
  const canClickLinks = !!callbacks?.onMentionClick || !!callbacks?.onTimestampClick;
  const isEditing = useIsEditing();

  if (isEditing) {
    return null;
  }

  return (
    <div data-testid="collabkit-comment-body" {...props} className={props.className ?? styles.body}>
      <Comment.Pin />
      <Markdown
        className={canClickLinks ? styles.markdown : styles.markdownLinksNotClickable}
        body={body}
      />
    </div>
  );
}

export function EmojiCount(props: { emojiU: string; count: number; userIds: readonly string[] }) {
  const { events, store } = useApp();
  const { profiles } = useSnapshot(store);
  const names = props.userIds.map((id) => profiles[id]?.name).filter((name) => !!name);
  const { workspaceId, threadId, eventId } = useCommentContext();
  const target = {
    type: 'emoji',
    emoji: EMOJI_U[props.emojiU],
    workspaceId,
    threadId,
    eventId,
  } as const;

  const emoji = EMOJI_U[props.emojiU];

  return emoji ? (
    <Tooltip>
      <Tooltip.Trigger>
        <div key={props.emojiU} className={styles.emojiCount}>
          <Emoji
            className={styles.emojiCountIcon}
            emoji={EMOJI_U[props.emojiU]}
            onClick={(e) => events.onClick(e, { target })}
          />
          <span className={styles.emojiCountNumber}>{props.count}</span>
        </div>
      </Tooltip.Trigger>
      <Tooltip.Content>{names}</Tooltip.Content>
    </Tooltip>
  ) : null;
}

export const CommentReactions = (props: React.ComponentPropsWithoutRef<'div'>) => {
  const { store } = useApp();
  const { threadId, eventId } = useCommentContext();
  const { reactions } = useSnapshot(store);
  const reaccs = reactions[threadId][eventId];

  return reaccs ? (
    <div data-testid="collabkit-comment-reactions" className={styles.reactions} {...props}>
      {Object.keys(reaccs).map((emojiU) => {
        const { count, userIds } = reaccs[emojiU as keyof typeof reaccs];
        return <EmojiCount key={emojiU} emojiU={emojiU} count={count} userIds={userIds} />;
      })}
    </div>
  ) : null;
};

export const CommentPin = (props: React.ComponentProps<'img'>) => {
  const { eventId, threadId, workspaceId } = useCommentContext();
  const { events, store } = useApp();
  const { selectedId } = useSnapshot(store);
  const workspace = useSnapshot(useWorkspaceStore());
  const pin = workspace.eventPins[eventId];
  const isSelected = selectedId?.type === 'pin' && selectedId.id === pin?.id;

  const target: PinTarget = useMemo(
    () => ({
      type: 'pin',
      threadId,
      eventId,
      workspaceId,
      objectId: pin?.objectId,
      id: pin?.id,
    }),
    [pin]
  );

  const onClick = useCallback(
    (e: React.MouseEvent) => {
      events.onClick(e, {
        target,
      });
    },
    [target]
  );

  if (!pin) {
    return null;
  }

  return (
    <span className={styles.pin} data-testid="collabkit-comment-pin" {...props} onClick={onClick}>
      <Tooltip>
        <Tooltip.Trigger>
          <img src={isSelected ? CommentPinSelectedSvg : CommentPinSvg} />
        </Tooltip.Trigger>
        <Tooltip.Content>See pin preview</Tooltip.Content>
      </Tooltip>
    </span>
  );
};

export const CommentEditor = (props: React.ComponentProps<'div'>) => {
  const isEditing = useIsEditing();
  const { body } = useCommentStore();

  if (!isEditing) {
    return null;
  }

  return (
    <Composer.Root
      data-testid="collabkit-comment-composer-root"
      className={props.className ?? styles.editor}
      autoFocus={true}
      initialBody={body}
    >
      <Composer.Editor placeholder={<span />}>
        <Composer.Buttons />
      </Composer.Editor>
    </Composer.Root>
  );
};

export function CommentTimestamp(
  props: React.ComponentProps<'time'> & { format?: (timestamp: number) => string }
) {
  const { createdAt } = useSnapshot(useCommentStore());
  return (
    <RawTimestamp
      data-testid="collabkit-comment-timestamp"
      {...props}
      className={props.className ?? styles.timestamp}
      timestamp={+createdAt}
    />
  );
}

export const CommentCreatorAvatar = Profile.Avatar;
export const CommentCreatorName = Profile.Name;

export const CommentNameAndTimestampWrapper = (props: React.ComponentProps<'div'>) => {
  const isEditing = useIsEditing();
  return isEditing ? null : (
    <div {...props} className={props.className ?? styles.nameAndTimestampWrapper} />
  );
};

type CommentMenuItemType = 'commentEditButton' | 'commentDeleteButton' | 'reopenThreadButton';

const CommentMenu = (props: { className?: string }) => {
  const { events, store } = useApp();
  const comment = useCommentContext();

  const { createdById } = useCommentStore();
  const { threadId, workspaceId, userId } = useThreadContext();

  // todo @nc: extract this into a hook
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

  if (createdById !== userId) {
    return null;
  }

  const items: React.ReactNode[] = useMemo(
    () => [
      <MenuItem
        label="Edit"
        targetType="commentEditButton"
        data-testid="collabkit-comment-menu-edit-button"
      />,
      <MenuItem
        label="Delete"
        targetType="commentDeleteButton"
        data-testid="collabkit-comment-menu-delete-button"
      />,
      isResolved && (
        <MenuItem
          label="Re-open"
          targetType="reopenThreadButton"
          data-testid="collabkit-comment-menu-re-open-button"
        />
      ),
    ],
    [isResolved]
  );

  return (
    <Menu<CommentMenuItemType>
      data-testid="collabkit-comment-menu"
      className={props.className}
      onItemClick={onItemClick}
      context={comment}
      items={items}
    >
      <IconButton>
        <DotsThree size={16} />
      </IconButton>
    </Menu>
  );
};

export { CommentMenu as Menu };

export const CommentActions = (props: React.ComponentProps<'div'>) => {
  const isEditing = useIsEditing();
  if (isEditing) {
    return null;
  }
  return <div className={props.className ?? styles.actions} {...props} />;
};

export const CommentReactionButton = () => {
  const { events, store } = useApp();
  const { reactingId } = useSnapshot(store);
  const target = useCommentContext();

  const open = reactingId?.type === 'comment' && reactingId.eventId === target.eventId;

  return (
    <Popover.Root
      contentVisible={open}
      previewVisible={false}
      onOpenChange={(open) => events.onReactionPickerOpenChange({ target, open })}
      onPreviewChange={() => {}}
      // advanced
      placement="left-start"
      dismissOnClickOutside={true}
      shouldFlipToKeepInView={false}
      defaultOpen={false}
    >
      <Popover.Trigger>
        <IconButton onClick={() => events.onReactionPickerOpenChange({ target, open: !open })}>
          <Smiley weight="regular" />
        </IconButton>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content>
          <ReactionPicker
            onClick={(e, emoji) => {
              events.onClick(e, {
                target: {
                  ...target,
                  type: 'emoji',
                  emoji,
                },
              });
              events.onReactionPickerOpenChange({ target, open: false });
            }}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export type CommentProps = {
  commentId: string;
  hideProfile?: boolean;
  isFirstComment?: boolean;
};

export default function Comment(props: CommentProps) {
  const hideProfile = props.hideProfile ?? false;
  const isFirstComment = props.isFirstComment ?? false;
  const isChannel = !!useOptionalChannelContext();
  return (
    <Comment.Root commentId={props.commentId} indent={isChannel && !isFirstComment}>
      {!hideProfile ? <Profile.Avatar /> : <div></div>}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {!hideProfile && (
          <Comment.NameAndTimestampWrapper>
            <Comment.CreatorName />
            <Comment.Timestamp />
          </Comment.NameAndTimestampWrapper>
        )}
        <Comment.Actions>
          <Comment.ReactionButton />
          {isChannel && isFirstComment && <Comment.ReplyButton />}
          {isChannel && isFirstComment && <Thread.ResolveIconButton />}
          <Comment.MoreMenu />
        </Comment.Actions>
        <Comment.Body />
        {/* <Comment.UnreadDot /> */}
        <Comment.Reactions />
        {isChannel && isFirstComment && <Comment.ReplyCountButton />}
        <Comment.Editor />
      </div>
    </Comment.Root>
  );
}

Comment.Provider = CommentProvider;
Comment.Root = CommentRoot;
Comment.NameAndTimestampWrapper = CommentNameAndTimestampWrapper;
Comment.CreatorName = CommentCreatorName;
Comment.CreatorAvatar = CommentCreatorAvatar;
Comment.Timestamp = CommentTimestamp;
Comment.Body = CommentBody;
Comment.Actions = CommentActions;
Comment.MoreMenu = CommentMenu;
Comment.Editor = CommentEditor;
Comment.Pin = CommentPin;
Comment.UnreadDot = CommentUnreadDot;
Comment.ReplyButton = CommentReplyButton;
Comment.ReplyCountButton = CommentReplyCountButton;
Comment.ReactionButton = CommentReactionButton;
Comment.Reactions = CommentReactions;

// Anatomy

// No customisation = Dom's design. You just import Thread and Inbox, and it looks like what we provide (oh and yes you can set dark/light mode);

// Set our theme props, and it customises our out of the box components for you to match your app. This will get you 95% of the way there.

// If you want to change the layout, add/remove things, and generally go further you can take our unstyled components and assemble your own commenting UI using it.

// Use the headless JS API and write whatever, use Angular or Ember or Backbone? You can do that too.

// export default function ExampleComment(props: { eventId: string }) {
//   return (
//     <Comment.Root eventId={props.eventId}>
//       <Comment.Header>
//         <Profile.Avatar />
//         <Comment.Timestamp />
//       </Comment.Header>
//       <Comment.Body />
//     </Comment.Root>
//   );
// }
