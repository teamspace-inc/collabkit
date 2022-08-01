import { $getRoot, EditorState } from 'lexical';
import { nanoid } from 'nanoid';
import React from 'react';
import { actions } from './actions';
import { CommentReactionTarget, CommentTarget, Store, Target } from './constants';

export type Events = ReturnType<typeof createEvents>;

export function createEvents(store: Store) {
  return {
    onComposerChange: (target: Target, editorState: EditorState) => {
      if (target.type === 'composer') {
        editorState.read(() => {
          let newBody = '';
          const nodes = $getRoot().getAllTextNodes();

          nodes.forEach((node) => {
            switch (node.__type) {
              case 'text':
                newBody += node.__text;
                break;
              case 'mention':
                newBody += `[${node.__text}](@${node.__mention})`;
                break;
            }
          });

          const body = store.workspaces[target.workspaceId].composers[target.threadId].$$body;
          store.workspaces[target.workspaceId].composers[target.threadId].$$body = newBody;

          if (newBody.length === 0) {
            actions.isTyping.cancel();
            setTimeout(() => {
              actions.stopTyping(store, { target });
            }, 100);
          } else if (newBody.length !== body.length) {
            actions.isTyping(store, { target });
          }
        });
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
      await actions.authenticate(store);
    },

    onSend: (workspaceId: string, threadId: string) => {
      actions.sendMessage(store, { workspaceId, threadId });
    },

    onEmojiReactionPickerModalBackgroundClick: (e: React.MouseEvent) => {
      store.reactingId = null;
    },

    onFocus: (e: React.FocusEvent, props: { target: Target }) => {
      actions.focus(store, props.target);
    },

    onClick: (e: React.MouseEvent, props: { target: Target }) => {},

    onEmojiReactionClick: (e: React.MouseEvent, props: { target: CommentReactionTarget }) => {
      actions.toggleCommentReaction(store, props);
    },

    onEmojiReactPointerDown: (e: React.PointerEvent, props: { target: CommentTarget }) => {
      actions.toggleEmojiReactionPicker(store, props);
    },

    onBlur: (e: React.FocusEvent, props: { target: Target }) => {
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
          actions.sendMessage(store, { ...store.focusedId });
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
      switch (store.uiState) {
        case 'idle': {
          switch (props.target.type) {
            case 'floatingCommentButton': {
              actions.startSelecting(store);
              break;
            }
            case 'pin': {
              actions.viewThread(store, props);
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
              actions.resolve(store, props.target.workspaceId, props.target.threadId);
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
