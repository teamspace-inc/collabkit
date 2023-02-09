import type React from 'react';
import { $getSelection } from 'lexical';
import type { LexicalEditor } from 'lexical';
import type {
  CommentEmojiButtonTargets,
  CommentTarget,
  EmojiTarget,
  MenuTarget,
  Store,
  Target,
  ThreadTarget,
} from '@collabkit/core';
import { actions } from './actions';

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

    onComposerChange: (target: Target, editor: LexicalEditor) => {
      if (target.type !== 'composer') {
        return;
      }

      actions.updateComposer(store, { target, editor });
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

    onFocus: (e: React.FocusEvent | FocusEvent, props: { target: Target }) => {
      actions.focus(store, props);
    },

    onClick: <T extends Target>(e: React.MouseEvent, props: { target: T }) => {
      const { target } = props;
      switch (target.type) {
        case 'emoji': {
          actions.toggleEmoji(store, { target });
          break;
        }
        case 'pin':
          actions.select(store, { target });
          break;
        case 'composer':
          actions.focusComposer(store, target);
          break;
        case 'pinDeleteButton':
          actions.deletePin(store, target.pin);
          return;
        case 'commentDeleteButton':
          actions.deleteMessage(store, target);
          break;
        case 'commentEditButton':
          actions.startEditing(store, target);
          break;
        case 'reopenThreadButton': {
          actions.reopenThread(store, target);
          break;
        }
        case 'commentReplyCountButton': {
          actions.expandThread(store, target);
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
          if (target.objectId && target.pinId) {
            actions.deletePin(store, target.composer);
            return;
          }

          switch (store.uiState) {
            case 'selecting':
              actions.stopSelecting(store);
              break;
            case 'idle':
              actions.startSelecting(store, target.composer);
              break;
          }

          break;
        }
        case 'composerMentionsButton': {
          actions.startMentioning(store, target);
          break;
        }
      }
    },

    onReactionPick: (props: { target: EmojiTarget }) => {
      actions.toggleEmoji(store, props);
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

      if (store.reactingId) {
        if (e.key === 'Escape') {
          store.reactingId = null;
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
            if (store.focusedId.isNewThread) {
              store.nextThreadId = store.sync.nextThreadId({
                workspaceId: store.workspaceId!,
                appId: store.appId!,
              });
              store.focusedId.threadId = store.nextThreadId;
            }
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

    onMouseEnter: (e: React.MouseEvent, props: { target: Target }) => {
      const { target } = props;
      const { type } = target;
      switch (type) {
        case 'comment':
          actions.hover(store, { target });
          break;
      }
    },

    onMouseLeave: (e: React.MouseEvent, props: { target: Target }) => {
      const { target } = props;
      const { type } = target;
      switch (type) {
        case 'comment':
          actions.unhover(store, { target });
          break;
      }
    },

    onMouseOver: (e: React.MouseEvent, props: { target: Target }) => {},

    onMouseOut: (e: React.MouseEvent, props: { target: Target }) => {},

    onGlobalPointerDown: (e: PointerEvent) => {
      const el = e.target;
      if (el instanceof HTMLElement) {
        if (el.closest(`.collabkit`)) {
          return;
        }
      }
      actions.deselectAll(store);
    },

    onPointerDown: (e: React.PointerEvent, props: { target: Target }) => {
      const { target } = props;
      const { type } = target;
      if (e.button !== 0) {
        return;
      }
      switch (store.uiState) {
        case 'selecting': {
          switch (type) {
            case 'overlay': {
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
          break;
        }
        case 'idle': {
          switch (type) {
            case 'overlay': {
              actions.deselectAll(store);
              break;
            }
            case 'pin': {
              actions.select(store, props);
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
            case 'closeThreadButton': {
              actions.closeAll(store);
              break;
            }
            case 'resolveThreadButton': {
              actions.resolveThread(store, target);
              break;
            }
            case 'reopenThreadButton': {
              actions.reopenThread(store, target);
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

    onReactionPickerOpenChange: (props: { target: CommentEmojiButtonTargets; open: boolean }) => {
      actions.toggleEmojiPicker(store, props);
    },

    onPopoverPreviewChange: (props: { target: Target; open: boolean }) => {
      if (props.open) {
        actions.showPreview(store, props);
      } else {
        actions.closePreview(store, props);
      }
    },

    onPopoverContentChange: (props: { target: Target; open: boolean }) => {
      if (props.open) {
        actions.viewContent(store, props);
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
          actions.viewContent(store, { target });
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

    onReactFlowViewportChange: ({ state }: { state: 'start' | 'stop' | 'change' }) => {
      switch (state) {
        case 'start':
          actions.setPinVisibility({ store, visibility: false });
          break;
        case 'stop':
          actions.setPinVisibility({ store, visibility: true });
          break;
        case 'change':
          actions.setPinVisibility({ store, visibility: false });
          break;
      }
    },

    onReactFlowNodeDrag: ({
      state,
      pinObjectId,
    }: {
      state: 'start' | 'stop';
      pinObjectId: string;
    }) => {
      switch (state) {
        case 'start':
          actions.dragPin({ store, pinObjectId: pinObjectId, visibility: false });
          break;
        case 'stop':
          actions.dragPin({ store, pinObjectId: pinObjectId, visibility: true });
          break;
      }
    },
  };
}
