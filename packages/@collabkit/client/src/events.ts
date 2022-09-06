import type React from 'react';
import { $getRoot, $getSelection } from 'lexical';
import type { EditorState, LexicalEditor } from 'lexical';
import { nanoid } from 'nanoid';
import type {
  CommentReactionTarget,
  CommentTarget,
  MentionWithColor,
  Store,
  Target,
  ThreadTarget,
} from '@collabkit/core';
import { actions } from './actions';
import { markRaw } from './store';

export type Events = ReturnType<typeof createEvents>;

export function createEvents(store: Store) {
  return {
    // @ville: what's the best way to expose this for clients to call
    // i want to enable it so Tella can populate a timestamp in the editor
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

    onComposerChange: (target: Target, editorState: EditorState, editor: LexicalEditor) => {
      if (target.type !== 'composer') {
        return;
      }

      store.workspaces[target.workspaceId].composers[target.threadId].editor = markRaw(editor);
      editorState.read(() => {
        let newBody = '';
        let newMentions: MentionWithColor[] = [];
        const nodes = $getRoot().getAllTextNodes();

        nodes.forEach((node) => {
          switch (node.__type) {
            case 'text':
              newBody += node.__text;
              break;
            case 'timestamp':
              newBody += `[${node.__text}](#T${node.__timestamp})`;
              break;
            case 'mention':
              newMentions.push(node.__mention);
              newBody += `[${node.__text}](#@${node.__mention.id})`;
              break;
          }
        });

        const body = store.workspaces[target.workspaceId].composers[target.threadId].$$body;
        store.workspaces[target.workspaceId].composers[target.threadId].$$body = newBody;

        store.workspaces[target.workspaceId].composers[target.threadId].$$mentions = newMentions;

        if (newBody.length === 0) {
          actions.isTyping.cancel();
          actions.disableSendButton(store, { target });
          setTimeout(() => {
            actions.stopTyping(store, { target });
          }, 100);
        } else if (newBody.length !== body.length) {
          actions.enableSendButton(store, { target });
          actions.isTyping(store, { target });
        }
      });
    },

    onDestroy: () => {
      for (const unsubscribe of Object.values(store.subs)) {
        unsubscribe();
      }
      store.subs = {};
    },

    onConnectionStateChange: async (isConnected: boolean) => {
      store.isConnected = isConnected;
      await actions.authenticate(store);
    },

    onSend: (workspaceId: string, threadId: string) => {
      actions.sendMessage(store, { workspaceId, threadId });
    },

    onEmojiReactionPickerModalBackgroundClick: (e: React.MouseEvent) => {
      store.reactingId = null;
    },

    onFocus: (e: React.FocusEvent | FocusEvent, props: { target: Target }) => {
      actions.focus(store, props.target);
    },

    onClick: (e: React.MouseEvent, props: { target: Target }) => {},

    onEmojiReactionClick: (e: React.MouseEvent, props: { target: CommentReactionTarget }) => {
      actions.toggleCommentReaction(store, props);
    },

    onEmojiReactPointerDown: (e: React.PointerEvent, props: { target: CommentTarget }) => {
      actions.toggleEmojiReactionPicker(store, props);
    },

    onBlur: (e: React.FocusEvent | FocusEvent, props: { target: Target }) => {
      actions.blur(store, props.target);
    },

    onKeyDown: (e: KeyboardEvent) => {
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

      if (store.focusedId?.type === 'composer') {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.stopPropagation();
          e.preventDefault();
          actions.sendMessage(store, { ...store.focusedId });
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
      switch (store.uiState) {
        case 'continuous': {
          switch (props.target.type) {
            case 'pin': {
              actions.viewThread(store, { ...props, isPreview: false });
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
            case 'commentable': {
              actions.startThread(store, { threadId: nanoid(), ...props.target });
            }
          }
        }
        case 'idle': {
          switch (props.target.type) {
            case 'floatingCommentButton': {
              actions.startSelecting(store);
              break;
            }
            case 'pin': {
              actions.viewThread(store, { ...props, isPreview: false });
              break;
            }
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
  };
}
