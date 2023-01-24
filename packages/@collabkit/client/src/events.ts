import type React from 'react';
import { $getSelection } from 'lexical';
import type { LexicalEditor } from 'lexical';
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
import { nanoid } from 'nanoid';

export type Events = ReturnType<typeof createEvents>;

export function createEvents(store: Store) {
  return {
    onInsertText: (target: ThreadTarget, text: string) => {
      const editor =
        store.workspaces[target.workspaceId].composers[target.threadId]?.['default']?.editor;
      if (!editor) {
        return;
      }
      editor.update(() => {
        const selection = $getSelection();
        selection?.insertRawText(text);
      });
    },

    onComposerChange: (
      target: Target,
      editor: LexicalEditor,
      newBody: string,
      mentions: string[]
    ) => {
      if (target.type !== 'composer') {
        return;
      }

      // move this to composer mount
      const composer = actions.initComposer(store, target);
      composer.editor = markRaw(editor);

      const body = composer.$$body;
      composer.$$body = newBody;
      composer.mentions = mentions;

      if (newBody.length === 0) {
        actions.isTyping.cancel();
        actions.disableComposerCommentButton(store, { target });
        setTimeout(async () => {
          await actions.stopTyping(store, { target });
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
      actions.sendMessage(store, { workspaceId, threadId, eventId: 'default' });
    },

    onEdit: () => {
      actions.updateComment(store);
      actions.stopEditing(store);
    },

    onEmojiReactionPickerModalBackgroundClick: (e: React.MouseEvent) => {
      store.reactingId = null;
    },

    onFocus: (e: React.FocusEvent | FocusEvent, props: { target: Target }) => {
      actions.focus(store, props);
    },

    onClick: <T extends Target>(e: React.MouseEvent, props: { target: T }) => {
      const { target } = props;
      switch (target.type) {
        case 'composer':
          actions.focusComposer(store, target);
          return;
        case 'pinDeleteButton':
          actions.deletePin(store, target.pin);
          return;
        case 'commentDeleteButton':
          actions.deleteMessage(store, target.comment);
          return;
        case 'commentEditButton':
          actions.startEditing(store, target.comment);
          return;
        case 'reopenThreadButton': {
          actions.reopenThread(store, target);
          break;
        }
        case 'commentSaveButton': {
          actions.updateComment(store);
          actions.stopEditing(store);
          break;
        }
        case 'commentCancelButton': {
          actions.stopEditing(store);
          break;
        }
        case 'composerPinButton': {
          if (target.pendingPin) {
            actions.deletePin(store, target);
            return;
          }

          switch (store.uiState) {
            case 'selecting':
              actions.stopSelecting(store);
              break;
            case 'idle':
              actions.startSelecting(store, target);
              break;
          }

          break;
        }
        case 'composerMentionsButton': {
          actions.startMentioning(store, target);
          break;
        }
        case 'attachPin': {
          if (store.uiState === 'selecting') {
            e.stopPropagation();
            e.preventDefault();
            actions.attachPin(store, target);
            // for some reason this is needed to focus the composer
            // this is buggy need to debug events
            setTimeout(
              () => store.composerId && actions.focusComposer(store, store.composerId),
              32
            );
          }
        }
      }
    },

    onEmojiReactionClick: (e: React.MouseEvent, props: { target: CommentReactionTarget }) => {
      actions.toggleCommentReaction(store, props);
    },

    onEmojiReactPointerDown: (e: React.PointerEvent, props: { target: CommentTarget }) => {
      actions.toggleEmojiReactionPicker(store, props);
    },

    onBlur: (e: React.FocusEvent | FocusEvent | null, props: { target: Target }) => {
      actions.blur(store);
    },

    onMenuOpen: (props: { target: MenuTarget }) => {
      actions.openMenu(store, props);
    },

    onMenuClose: (props: { target: MenuTarget }) => {
      actions.closeMenu(store);
    },

    onKeyDown: (e: KeyboardEvent) => {
      if (store.uiState === 'selecting') {
        if (e.key === 'Escape') {
          actions.stopSelecting(store);
          e.stopPropagation();
          e.preventDefault();
          return;
        }
      }

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
            store.nextThreadId = nanoid();
            store.focusedId.threadId = store.nextThreadId;
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

      if (store.viewingId) {
        if (e.key === 'Escape') {
          actions.closeAll(store);
          e.stopPropagation();
          e.preventDefault();
        }
      }
    },

    onMouseOver: (e: React.MouseEvent, props: { target: Target }) => {},

    onMouseOut: (e: React.MouseEvent, props: { target: Target }) => {},

    onPointerDown: (e: React.PointerEvent, props: { target: Target }) => {
      if (e.button !== 0) {
        return;
      }
      switch (store.uiState) {
        case 'idle': {
          switch (props.target.type) {
            case 'showSidebarButton': {
              actions.showSidebar(store);
              break;
            }
            case 'hideSidebarButton': {
              actions.hideSidebar(store);
              break;
            }
            case 'closeThreadButton': {
              actions.closeAll(store);
              break;
            }
            case 'resolveThreadButton': {
              actions.resolveThread(store, props.target);
              break;
            }
            case 'reopenThreadButton': {
              actions.reopenThread(store, props.target);
              break;
            }
          }
          break;
        }
      }
    },

    onSeen: (props: { target: CommentTarget }) => {
      actions.seen(store, props);
    },

    onPopoverPreviewChange: (props: { target: ThreadTarget; open: boolean }) => {
      if (props.open) {
        actions.showPreview(store, props);
      } else {
        actions.closePreview(store, props);
      }
    },

    onPopoverThreadOpenChange: (props: { target: ThreadTarget; open: boolean }) => {
      if (props.open) {
        actions.viewThread(store, props);
      } else {
        actions.closeAll(store);
      }
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
          actions.closePreview(store, { target });
          actions.viewThread(store, { target });
          break;
        case 'preview':
          actions.closeThread(store, { target });
          actions.showPreview(store, { target });
          break;
        case 'closed':
          actions.closePreview(store, { target });
          actions.closeThread(store, { target });
          break;
        default:
          throw new Error(`invalid popover state: ${state}`);
      }
    },
  };
}
