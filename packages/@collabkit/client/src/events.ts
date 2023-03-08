import type React from 'react';
import { $getSelection } from 'lexical';
import type { LexicalEditor } from 'lexical';
import type {
  CommentEmojiButtonTargets,
  CommentTarget,
  ComposerTarget,
  EmojiTarget,
  MenuTarget,
  Store,
  Target,
  ThreadTarget,
} from '@collabkit/core';
import { actions } from './actions';
import { getConfig } from './actions/getConfig';

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
        $getSelection()?.insertRawText(text);
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

    onClick: <T extends Target>(e: React.MouseEvent | PointerEvent, props: { target: T }) => {
      const { target } = props;
      if (e.button !== 0) {
        return;
      }
      // we don't want to stop the event propogating as
      // otherwise it never reaches the overlay, which is
      // used to deselect pins
      if (target.type === 'pin') {
      } else {
        e.preventDefault();
        e.stopPropagation();
      }

      switch (store.uiState) {
        case 'selecting': {
          switch (target.type) {
            case 'overlay':
              e.stopPropagation();
              e.preventDefault();
              actions.attachComposerPin(store, target);
              break;
            case 'composerPinButton':
              actions.stopSelecting(store);
              break;
          }
          break;
        }
        case 'idle': {
          switch (target.type) {
            case 'pinThreadPreview':
              if (!store.isFigmaStyle) {
                actions.showSidebar(store);
              }
              actions.select(store, { target: { ...target, type: 'pin' } });
              break;
            case 'thread':
              actions.select(store, { target });
              break;
            case 'addCommentButton':
              actions.startSelecting(store);
              const threadId = store.nextThreadId;
              if (!threadId) return;
              const composerId: ComposerTarget = {
                ...target,
                type: 'composer',
                threadId,
                eventId: 'default',
              } as const;
              actions.initComposer(store, { ...target, threadId, eventId: 'default' });
              actions.setComposer(store, { target: composerId });
              break;
            case 'overlay':
              actions.deselectAll(store);
              break;
            case 'inboxItem':
              actions.openInboxItem(store, target);
              break;
            case 'pinThreadCloseIconButton':
              actions.deselectAll(store);
              actions.closeAllPopovers(store);
              break;
            case 'pinNextThreadIconButton':
              actions.select(store, { target });
              break;
            case 'pinPrevThreadIconButton':
              actions.select(store, { target });
              break;
            case 'pinThreadResolveIconButton':
              actions.resolveThread(store, target);
              actions.closeAllPopovers(store);
              actions.deselectAll(store);
              break;
            case 'toggleSidebarButton':
              actions.toggleSidebar(store);
              break;
            case 'showSidebarButton':
              actions.showSidebar(store);
              break;
            case 'hideSidebarButton':
              actions.hideSidebar(store);
              break;
            case 'channel':
              actions.select(store, { target });
              actions.focusComposer(store, { ...target, type: 'composer', eventId: 'default' });
              break;
            case 'emoji':
              actions.toggleEmoji(store, { target });
              break;
            case 'commentPin':
              actions.select(store, { target });
              break;
            case 'pin':
              actions.select(store, { target });
              if (store.isFigmaStyle) return;
              actions.showSidebar(store);
              break;
            case 'composer':
              actions.setComposer(store, { target });
              actions.focusComposer(store, target);
              break;
            case 'pinDeleteButton':
              actions.deletePin(store, target);
              return;
            case 'commentDeleteButton':
              actions.deleteMessage(store, target);
              break;
            case 'commentEditButton':
              actions.startEditing(store, target);
              break;
            case 'reopenThreadButton':
              actions.reopenThread(store, target);
              break;
            case 'commentReplyButton':
            case 'commentSeeAllRepliesButton':
              e.preventDefault();
              e.stopPropagation();
              actions.select(store, { target: { ...target, type: 'thread' } });
              actions.expandThread(store, target);
              actions.focusComposer(store, {
                type: 'composer',
                workspaceId: target.workspaceId,
                threadId: target.threadId,
                eventId: 'default',
              });
              break;
            case 'commentSaveButton':
              actions.updateComment(store);
              actions.stopEditing(store);
              break;
            case 'commentCancelButton':
              actions.stopEditing(store, { target });
              break;
            case 'composerPin':
              actions.removeAttachment(store, { ...target, attachmentId: target.pinId });
              actions.stopSelecting(store);
              break;
            case 'composerPinButton':
              actions.setComposer(store, { target: { ...target, type: 'composer' } });
              actions.startSelecting(store);
              break;
            case 'composerMentionsButton':
              actions.startMentioning(store, target);
              break;
            case 'closeThreadButton':
              actions.closeAllPopovers(store);
              break;
            case 'resolveThreadButton':
              actions.resolveThread(store, target);
              break;
          }
          break;
        }
      }
    },

    onReactionPick: (props: { target: EmojiTarget }) => {
      actions.toggleEmoji(store, props);
    },

    onBlur: (e: React.FocusEvent | FocusEvent | null, props: { target: Target }) => {
      actions.blur(store, props);
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
              const { appId } = getConfig(store);
              store.nextThreadId = store.sync.nextThreadId({
                workspaceId: store.workspaceId!,
                appId,
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
          actions.closeAllPopovers(store);
          e.stopPropagation();
          e.preventDefault();
        }
      }
    },

    onMouseEnter: (e: React.MouseEvent, props: { target: Target }) => {
      const { target } = props;
      const { type } = target;
      switch (type) {
        case 'composerPinButton':
        case 'comment':
          actions.hover(store, { target });
          break;
      }
    },

    onMouseLeave: (e: React.MouseEvent, props: { target: Target }) => {
      const { target } = props;
      const { type } = target;
      switch (type) {
        case 'composerPinButton':
        case 'comment':
          actions.unhover(store, { target });
          break;
      }
    },

    onMouseOver: (e: React.MouseEvent, props: { target: Target }) => {},

    onMouseOut: (e: React.MouseEvent, props: { target: Target }) => {},

    onGlobalPointerDown: (e: PointerEvent) => {
      const el = e.target;
      if (el instanceof Element && el.closest('.collabkit')) {
        return;
      }
      actions.deselectAll(store);
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
        actions.closePopoverPreview(store, props);
      }
    },

    onPopoverContentChange: (props: { target: Target; open: boolean }) => {
      if (props.open) {
        actions.viewContent(store, props);
      } else {
        actions.closeAllPopovers(store);
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
          actions.closePopoverPreview(store, { target });
          actions.viewContent(store, { target });
          break;
        case 'preview':
          actions.closePopoverContent(store, { target });
          actions.showPreview(store, { target });
          break;
        case 'closed':
          actions.closePopoverPreview(store, { target });
          actions.closePopoverContent(store, { target });
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
