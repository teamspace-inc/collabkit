import type React from 'react';
import { $getSelection } from 'lexical';
import type { LexicalEditor } from 'lexical';
import { nanoid } from 'nanoid';
import type {
  CommentReactionTarget,
  CommentTarget,
  MenuTarget,
  Store,
  Target,
  ThreadTarget,
} from '@collabkit/core';
import { actions } from './actions';
import { markRaw } from './store';

export type Events = ReturnType<typeof createEvents>;

export function createEvents(store: Store) {
  return {
    onInsertText: (target: ThreadTarget, text: string) => {
      const editor = store.workspaces[target.workspaceId].composers[target.threadId].editor;
      if (!editor) {
        return;
      }
      editor.update(() => {
        const selection = $getSelection();
        selection?.insertRawText(text);
      });
    },

    onComposerChange: (target: Target, editor: LexicalEditor, newBody: string) => {
      if (target.type !== 'composer') {
        return;
      }

      store.workspaces[target.workspaceId].composers[target.threadId].editor = markRaw(editor);

      const body = store.workspaces[target.workspaceId].composers[target.threadId].$$body;
      store.workspaces[target.workspaceId].composers[target.threadId].$$body = newBody;

      if (newBody.length === 0) {
        actions.isTyping.cancel();
        actions.disableComposerCommentButton(store, { target });
        setTimeout(() => {
          actions.stopTyping(store, { target });
        }, 100);
      } else if (newBody.length !== body.length) {
        actions.enableComposerCommentButton(store, { target });
        actions.isTyping(store, { target });
      }
    },

    onDestroy: () => {
      for (const unsubscribe of Object.values(store.subs)) {
        unsubscribe();
      }
      store.subs = {};
    },

    onConnectionStateChange: async (isConnected: boolean) => {
      store.isConnected = isConnected;
      try {
        await actions.authenticate(store);

        // todo make this server configurable
        actions.subscribeInbox(store);
      } catch (e) {
        console.error('[CollabKit] failed to authenticate', { e });
      }
    },

    // make this fetch workspaceId and threadId from store
    onSend: (workspaceId: string, threadId: string) => {
      actions.sendMessage(store, { workspaceId, threadId });
    },

    onEdit: () => {
      actions.updateComment(store);
      actions.stopEditing(store);
    },

    onEmojiReactionPickerModalBackgroundClick: (e: React.MouseEvent) => {
      store.reactingId = null;
    },

    onFocus: (e: React.FocusEvent | FocusEvent, props: { target: Target }) => {
      actions.focus(store, props.target);
    },

    onClick: <T extends Target>(e: React.MouseEvent, props: { target: T }) => {
      switch (props.target.type) {
        case 'commentDeleteButton':
          actions.deleteMessage(store, props.target.comment);
          return;
        case 'commentEditButton':
          actions.startEditing(store, props.target.comment);
          return;
        case 'reopenThreadButton': {
          actions.reopenThread(store, props.target.workspaceId, props.target.threadId);
          break;
        }
      }
    },

    onEmojiReactionClick: (e: React.MouseEvent, props: { target: CommentReactionTarget }) => {
      actions.toggleCommentReaction(store, props);
    },

    onEmojiReactPointerDown: (e: React.PointerEvent, props: { target: CommentTarget }) => {
      actions.toggleEmojiReactionPicker(store, props);
    },

    onBlur: (e: React.FocusEvent | FocusEvent, props: { target: Target }) => {
      actions.blur(store, props.target);
    },

    onMenuOpen: (props: { target: MenuTarget }) => {
      actions.openMenu(store, props);
    },

    onMenuClose: (props: { target: MenuTarget }) => {
      actions.closeMenu(store);
    },

    onKeyDown: (e: KeyboardEvent) => {
      if (store.editingId) {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.stopPropagation();
          e.preventDefault();
          actions.updateComment(store);
          actions.stopEditing(store);
        }

        if (e.key === 'Escape') {
          actions.stopEditing(store);
          e.stopPropagation();
          e.preventDefault();
          return;
        }
      } else if (store.focusedId?.type === 'composer') {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.stopPropagation();
          e.preventDefault();
          if (store.focusedId.eventId === 'default') {
            actions.sendMessage(store, { ...store.focusedId });
          }
        }
      }

      if (store.menuId) {
        if (e.key === 'Escape') {
          actions.closeMenu(store);
          e.stopPropagation();
          e.preventDefault();
          return;
        }
      }

      if (store.uiState === 'selecting') {
        if (e.key === 'Escape') {
          actions.stopSelecting(store);
          e.stopPropagation();
          e.preventDefault();
          return;
        }
      } else if (store.viewingId) {
        if (e.key === 'Escape') {
          actions.removePendingPins(store);
          actions.closeThread(store);
          e.stopPropagation();
          e.preventDefault();
        }
      }
    },

    onMouseOver: (e: React.MouseEvent, props: { target: Target }) => {
      actions.hover(store, props);
    },

    onMouseOut: (e: React.MouseEvent, props: { target: Target }) => {
      actions.unhover(store, props);
    },

    onPointerDown: (e: React.PointerEvent, props: { target: Target }) => {
      if (e.button !== 0) {
        return;
      }
      switch (store.uiState) {
        case 'continuous': {
          switch (props.target.type) {
            // case 'pin': {
            //   actions.viewThread(store, { ...props, isPreview: false });
            //   break;
            // }

            case 'closeThreadButton': {
              actions.closeThread(store);
              break;
            }
            case 'resolveThreadButton': {
              actions.resolveThread(store, props.target.workspaceId, props.target.threadId);
              break;
            }
            case 'reopenThreadButton': {
              actions.reopenThread(store, props.target.workspaceId, props.target.threadId);
              break;
            }
            case 'commentable': {
              actions.startThread(store, { threadId: nanoid(), ...props.target });
            }
          }
        }
        case 'idle': {
          switch (props.target.type) {
            case 'nextThreadButton': {
              console.log('next thread');
              actions.nextThread(store);
              break;
            }
            case 'previousThreadButton': {
              console.log('prev thread');
              actions.nextThread(store, -1);
              break;
            }
            case 'showSidebarButton': {
              actions.showSidebar(store);
              break;
            }
            case 'hideSidebarButton': {
              actions.hideSidebar(store);
              break;
            }
            case 'floatingCommentButton': {
              actions.startSelecting(store);
              break;
            }
            // case 'pin': {
            //   actions.viewThread(store, { ...props, isPreview: false });
            //   break;
            // }
            case 'commentButton': {
              break;
            }
            case 'closeThreadButton': {
              actions.closeThread(store);
              break;
            }
            case 'resolveThreadButton': {
              actions.resolveThread(store, props.target.workspaceId, props.target.threadId);
              break;
            }
            case 'reopenThreadButton': {
              actions.reopenThread(store, props.target.workspaceId, props.target.threadId);
              break;
            }
          }
          break;
        }
        case 'selecting': {
          if (props.target.type === 'commentable') {
            actions.startThread(store, {
              threadId: nanoid(),
              ...props.target,
            });
          } else if (props.target.type === 'floatingCommentButton') {
            actions.stopSelecting(store);
          }
          break;
        }
      }
    },

    onSeen: (props: { target: CommentTarget }) => {
      actions.seen(store, props.target);
    },

    onSetPopoverState: ({
      target,
      state,
    }: {
      target: ThreadTarget;
      state: 'open' | 'preview' | 'closed';
    }) => {
      switch (state) {
        case 'open':
          actions.closePreview(store);
          actions.viewThread(store, { target, isPreview: false });
          break;
        case 'preview':
          actions.closeThread(store);
          actions.viewThread(store, { target, isPreview: true });
          break;
        case 'closed':
          actions.closePreview(store);
          actions.closeThread(store);
          break;
        default:
          throw new Error(`invalid popover state: ${state}`);
      }
    },
  };
}
