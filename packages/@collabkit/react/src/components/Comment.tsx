import React, { useMemo, useCallback, useRef } from 'react';
import { useThreadContext } from '../hooks/useThreadContext';
import { Markdown } from './Markdown';
import { useSnapshot } from 'valtio';
import { CommentContext, useCommentContext } from '../hooks/useCommentContext';
import { Timestamp as RawTimestamp } from './Timestamp';
import { useId } from '../hooks/useId';
import { ProfileAvatar, ProfileName } from './Profile';
import { useWorkspaceStore } from '../hooks/useWorkspaceStore';
import { useApp } from '../hooks/useApp';
import { CommentTarget, Target, ThreadResolveButtonTarget } from '@collabkit/core';
import * as styles from '../theme/components/Comment.css';
import { ArrowBendDownRight, CheckCircle, DotsThree } from './icons';
import { Menu, MenuItem } from './Menu';
import { mergeRefs } from 'react-merge-refs';
import { ComposerButtons, ComposerEditor, ComposerInput, ComposerRoot } from './composer/Composer';
import { IconButton } from './IconButton';

import { Tooltip, TooltipContent, TooltipTrigger } from './Tooltip';
import { vars } from '../theme/theme/index.css';
import { EMOJI_U } from './EmojiPicker';
import { PopoverEmojiPicker } from './PopoverEmojiPicker';
import { Emoji } from './Emoji';
import { useWorkspaceContext } from '../hooks/useWorkspaceContext';
import { useUserContext } from '../hooks/useUserContext';
import { useCommentSnapshot } from '../hooks/useCommentSnapshot';
import { useMarkAsSeen } from '../hooks/useMarkAsSeen';
import { useOnMarkdownLinkClick } from '../hooks/useOnMarkdownLinkClick';
import { useStore } from '../hooks/useStore';
import { ProfileContext } from '../hooks/useProfile';
import { useStoreKeyMatches } from '../hooks/useSubscribeStoreKey';
import { CommentProps } from '../types';
import { useUnreadCommentsCount } from '../hooks/public/useUnreadCommentsCount';
import { TargetContext } from './Target';
import { useTarget } from '../hooks/useTarget';
import equals from 'fast-deep-equal';

type CommentRootProps = {
  commentId: string;
  indent?: boolean;
} & React.ComponentPropsWithRef<'div'>;

const EditingContext = React.createContext<boolean>(false);
function useEditingContext() {
  return React.useContext(EditingContext);
}

const TreeContext = React.createContext<string | null>(null);
function useTreeContext() {
  const treeId = React.useContext(TreeContext);
  if (!treeId) {
    throw new Error('useTreeContext: no treeId');
  }
  return treeId;
}

function CommentRoot({ commentId: eventId, indent = false, ...props }: CommentRootProps) {
  const threadId = useThreadContext();
  const workspaceId = useWorkspaceContext();
  const treeId = useId();
  const userId = useUserContext();
  const store = useStore();

  const target = useMemo<CommentTarget>(
    () => ({ type: 'comment', workspaceId, threadId, eventId, treeId }),
    [workspaceId, threadId, eventId, treeId]
  );

  const divRef = useRef<HTMLDivElement>(null);
  const { ref: seenRef } = useMarkAsSeen(target);

  const ref = mergeRefs([divRef, seenRef]);

  const { onClick } = useOnMarkdownLinkClick({
    workspaceId,
    threadId,
    userId,
    eventId,
  });

  const targetMatch = useCallback(
    (a: Target | null) => {
      return !!(
        a &&
        a.type === 'comment' &&
        a.eventId === target.eventId &&
        a.treeId === target.treeId
      );
    },
    [target]
  );

  const isEditing = useStoreKeyMatches(store, 'editingId', targetMatch);

  const event = useSnapshot(store.workspaces[workspaceId].computed)?.[threadId]?.canonicalEvents?.[
    eventId
  ];
  const createdById = event?.createdById ?? null;
  const { profiles } = useSnapshot(store);
  const profile = createdById ? profiles[createdById] : null ?? null;
  const hasProfile = !!profile;

  const { events } = useApp();

  return hasProfile && createdById ? (
    <TargetContext.Provider value={target}>
      <CommentContext.Provider value={eventId}>
        <TreeContext.Provider value={treeId}>
          <EditingContext.Provider value={isEditing}>
            <ProfileContext.Provider value={createdById}>
              <div
                data-testid="collabkit-comment-root"
                className={`${props.className ?? styles.root({ indent })}`}
                onMouseOver={(e) => events.onMouseEnter(e, { target })}
                onMouseEnter={(e) => events.onMouseEnter(e, { target })}
                onMouseLeave={(e) => events.onMouseLeave(e, { target })}
                onClick={onClick}
                ref={ref}
                style={props.style}
              >
                {props.children}
              </div>
            </ProfileContext.Provider>
          </EditingContext.Provider>
        </TreeContext.Provider>
      </CommentContext.Provider>
    </TargetContext.Provider>
  ) : null;
}

function CommentUnreadDot(props: React.ComponentPropsWithoutRef<'div'>) {
  const threadId = useThreadContext();
  const count = useUnreadCommentsCount({ threadId });
  return count > 0 ? <div className={styles.unreadDot} {...props} /> : null;
}

function CommentActionsReplyButton() {
  const { events } = useApp();
  const threadId = useThreadContext();
  const workspaceId = useWorkspaceContext();
  const eventId = useCommentContext();
  const target = {
    type: 'commentReplyButton',
    eventId,
    threadId,
    workspaceId,
  } as const;
  return (
    <Tooltip>
      <TooltipTrigger>
        <IconButton onClick={(e) => events.onClick(e, { target })}>
          <ArrowBendDownRight weight="regular" />
        </IconButton>
      </TooltipTrigger>
      <TooltipContent>Reply</TooltipContent>
    </Tooltip>
  );
}

function CommentSeeAllRepliesButton(props: React.ComponentPropsWithoutRef<'div'>) {
  const { events } = useApp();
  const threadId = useThreadContext();
  const workspaceId = useWorkspaceContext();
  const eventId = useCommentContext();
  const { computed } = useSnapshot(useWorkspaceStore());
  const numComments = Object.keys(computed[threadId].messageEvents).length;

  const target = {
    type: 'commentSeeAllRepliesButton',
    workspaceId,
    threadId,
    eventId,
  } as const;

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
        {numComments === 1 ? (
          <>Reply</>
        ) : (
          <>
            {numComments - 1} {numComments != 2 ? 'replies' : 'reply'}
          </>
        )}
      </span>
    </div>
  );
}

function CommentMarkdown() {
  const { body } = useCommentSnapshot();
  // move this to a computed property
  const { callbacks } = useSnapshot(useApp().store);
  const canClickLinks = !!callbacks?.onMentionClick || !!callbacks?.onTimestampClick;

  return (
    <Markdown
      className={canClickLinks ? styles.markdown : styles.markdownLinksNotClickable}
      body={body}
    />
  );
}

function CommentHideIfEditing({ children }: { children: React.ReactNode }) {
  return useEditingContext() ? null : <>{children}</>;
}

function CommentShowIfEditing({ children }: { children: React.ReactNode }) {
  return useEditingContext() ? <>{children}</> : null;
}

function CommentBody({ ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div data-testid="collabkit-comment-body" className={styles.body} {...props}>
      {props.children}
    </div>
  );
}

function EmojiCountButton({
  emojiU,
  count,
  userIds,
  disabled,
}: {
  emojiU: string;
  count: number;
  userIds: readonly string[];
  disabled?: boolean;
}) {
  const { events, store } = useApp();
  const { profiles } = useSnapshot(store);
  const names = userIds.map((id) => profiles[id]?.name).filter((name) => !!name);
  const workspaceId = useWorkspaceContext();
  const threadId = useThreadContext();
  const eventId = useCommentContext();
  const target = {
    type: 'emoji',
    emoji: EMOJI_U[emojiU],
    workspaceId,
    threadId,
    eventId,
  } as const;

  const emoji = EMOJI_U[emojiU];

  return emoji ? (
    <Tooltip placement="bottom-start">
      <TooltipTrigger>
        <div
          key={emojiU}
          className={styles.emojiCountButton({ disabled: !!disabled })}
          onClick={(e) => (!disabled ? events.onClick(e, { target }) : null)}
        >
          <Emoji className={styles.emojiCountIcon} emoji={EMOJI_U[emojiU]} />
          <span className={styles.emojiCountNumber}>{count}</span>
        </div>
      </TooltipTrigger>
      <TooltipContent className={styles.emojiCountTooltip}>
        {names.map((name, i) => (
          <span key={i}>{name}</span>
        ))}
      </TooltipContent>
    </Tooltip>
  ) : null;
}

function CommentReactionsList(
  props: React.ComponentPropsWithoutRef<'div'> & { disabled?: boolean }
) {
  const reactions = useCommentReactions();
  return reactions ? (
    <div data-testid="collabkit-comment-reactions" className={styles.reactions} {...props}>
      {reactions.map(({ emojiU, count, userIds }) => {
        return (
          <EmojiCountButton
            key={emojiU}
            emojiU={emojiU}
            count={count}
            userIds={userIds}
            disabled={props.disabled}
          />
        );
      })}
    </div>
  ) : null;
}

function useCommentReactions() {
  const threadId = useThreadContext();
  const eventId = useCommentContext();
  const reactions = useSnapshot(useWorkspaceStore()).computed[threadId].reactions?.[eventId];
  const emojiUs = Object.keys(reactions || {});
  return reactions && emojiUs.length > 0 && Object.values(reactions).find((reac) => reac.count > 0)
    ? emojiUs.map((emojiU) => ({ emojiU, ...reactions[emojiU as keyof typeof reactions] }))
    : [];
}

function CommentReactions(props: React.ComponentPropsWithoutRef<'div'>) {
  const reactions = useCommentReactions();
  return reactions.length > 0 ? (
    <div data-testid="collabkit-comment-reactions" className={styles.reactions} {...props}>
      {props.children ?? (
        <>
          <CommentReactionsList />
          <CommentReactionsListAddEmojiButton />
        </>
      )}
    </div>
  ) : null;
}

function CommentEditor(props: React.ComponentProps<'div'>) {
  const { body } = useCommentSnapshot();

  return (
    <ComposerRoot
      data-testid="collabkit-comment-composer-root"
      className={styles.editor}
      {...props}
    >
      <ComposerEditor>
        <ComposerInput autoFocus={true} initialBody={body} placeholder={<span />} />
        <ComposerButtons />
      </ComposerEditor>
    </ComposerRoot>
  );
}

function CommentTimestamp(
  props: React.ComponentProps<'time'> & { format?: (timestamp: number) => string }
) {
  const { createdAt } = useCommentSnapshot();
  return (
    <RawTimestamp
      data-testid="collabkit-comment-timestamp"
      {...props}
      className={props.className ?? styles.timestamp}
      timestamp={+createdAt}
    />
  );
}

const CommentCreatorAvatar = ProfileAvatar;
const CommentCreatorName = ProfileName;

type CommentMenuItemType = 'commentEditButton' | 'commentDeleteButton' | 'reopenThreadButton';

function CommentMenu(props: { className?: string }) {
  const { events } = useApp();
  const eventId = useCommentContext();
  const threadId = useThreadContext();
  const workspaceId = useWorkspaceContext();
  const userId = useUserContext();
  const { createdById } = useCommentSnapshot();
  const treeId = useTreeContext();

  const { isResolved } = useSnapshot(useWorkspaceStore().computed)[threadId];

  const onItemClick = useCallback(
    (e: React.MouseEvent, type: CommentMenuItemType) => {
      events.onClick(e, {
        target:
          type === 'reopenThreadButton'
            ? { type, threadId, workspaceId }
            : { type, eventId, threadId, workspaceId, treeId },
      });
    },
    [eventId, threadId, workspaceId]
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
      // todo @nc: rework this target/context system it's overly complex
      context={{ type: 'comment', workspaceId, threadId, eventId, treeId }}
      items={items}
    >
      <IconButton>
        <DotsThree size={16} />
      </IconButton>
    </Menu>
  );
}

function CommentActions(props: React.ComponentProps<'div'>) {
  const target = useTarget();
  const isHovering = useStoreKeyMatches(useStore(), 'hoveringId', (a) => equals(a, target));
  return isHovering ? <div className={styles.actions} {...props} /> : null;
}

function CommentReactionsListAddEmojiButton() {
  const eventId = useCommentContext();
  const threadId = useThreadContext();
  const workspaceId = useWorkspaceContext();
  const treeId = useId();
  const target = {
    type: 'commentReactionsListAddEmojiButton',
    eventId,
    threadId,
    workspaceId,
    treeId,
  } as const;
  return (
    <Tooltip>
      <TooltipTrigger>
        <PopoverEmojiPicker target={target} smallIconButton={true} placement="bottom" />
      </TooltipTrigger>
      <TooltipContent>React</TooltipContent>
    </Tooltip>
  );
}

function CommentActionsEmojiButton() {
  const eventId = useCommentContext();
  const threadId = useThreadContext();
  const workspaceId = useWorkspaceContext();
  const treeId = useId();
  const target = {
    type: 'commentActionsEmojiButton',
    eventId,
    threadId,
    workspaceId,
    treeId,
  } as const;
  return (
    <Tooltip>
      <TooltipTrigger>
        <PopoverEmojiPicker target={target} placement="top-end" />
      </TooltipTrigger>
      <TooltipContent>React</TooltipContent>
    </Tooltip>
  );
}

function CommentHeader(props: React.ComponentProps<'div'>) {
  return <div className={styles.header} {...props} />;
}

function CommentThreadResolveIconButton(props: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const { events } = useApp();
  const workspaceId = useWorkspaceContext();
  const threadId = useThreadContext();

  const target: ThreadResolveButtonTarget = {
    threadId,
    workspaceId,
    type: 'resolveThreadButton',
  };

  return (
    <Tooltip>
      <TooltipTrigger>
        <IconButton
          className={props.className}
          style={props.style}
          weight="regular"
          onPointerDown={(e) =>
            events.onClick(e, {
              target,
            })
          }
        >
          <CheckCircle size={16} weight="regular" />
        </IconButton>
      </TooltipTrigger>
      <TooltipContent>Resolve</TooltipContent>
    </Tooltip>
  );
}

function Comment(props: CommentProps) {
  return (
    <CommentRoot commentId={props.commentId}>
      <ProfileAvatar />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <CommentHideIfEditing>
          <CommentHeader>
            <CommentCreatorName />
            <CommentTimestamp />
          </CommentHeader>
          <CommentActions>
            <CommentActionsEmojiButton />
            <CommentMenu />
          </CommentActions>
          <CommentBody>
            <CommentMarkdown />
          </CommentBody>
          <CommentReactions />
        </CommentHideIfEditing>
        <CommentShowIfEditing>
          <CommentEditor />
        </CommentShowIfEditing>
      </div>
    </CommentRoot>
  );
}

export {
  Comment,
  CommentRoot,
  CommentHeader,
  CommentCreatorName,
  CommentCreatorAvatar,
  CommentTimestamp,
  CommentBody,
  CommentActions,
  CommentMenu,
  CommentEditor,
  CommentUnreadDot,
  CommentActionsReplyButton,
  CommentSeeAllRepliesButton,
  CommentActionsEmojiButton,
  CommentThreadResolveIconButton,
  CommentReactions,
  CommentReactionsList,
  CommentReactionsListAddEmojiButton,
  CommentMarkdown,
  CommentHideIfEditing,
  CommentShowIfEditing,
};

// Anatomy

// No customisation = Dom's design. You just import Thread and Inbox, and it looks like what we provide (oh and yes you can set dark/light mode),

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
