import { DataSnapshot } from 'firebase/database';
import { nanoid } from 'nanoid';
import React from 'react';
import { actions } from './actions';
import { CommentReactionTarget, CommentTarget, Store, Target } from './constants';

export type Events = ReturnType<typeof createEvents>;

export function createEvents(store: Store) {
  return {
    onDestroy: () => {
      for (const unsubscribe of Object.values(store.subs)) {
        unsubscribe();
      }
      store.subs = {};
    },

    onConnectionStateChange: async (isConnected: boolean) => {
      store.isConnected = isConnected;

      await actions.authenticate(store);
      await actions.saveProfile(store);
      await actions.subscribeProfiles(store);
    },

    onTimelineEventAdded: (snapshot: DataSnapshot) => {
      const event = snapshot.val();
      const eventId = snapshot.key;
      const workspaceId = snapshot.ref.parent?.ref.parent?.key;
      const threadId = snapshot.ref.parent?.key;

      // todo validate data here
      //
      if (threadId && workspaceId && eventId) {
        store.workspaces[workspaceId].timeline[threadId] ||= {};
        store.workspaces[workspaceId].timeline[threadId][eventId] ||= event;
      }
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
      console.log('onPointerDown', props);
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
