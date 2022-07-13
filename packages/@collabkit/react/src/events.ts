import { DataSnapshot } from 'firebase/database';
import { nanoid } from 'nanoid';
import React from 'react';
import { actions } from './actions';
import { CommentReactionTarget, CommentTarget, Store, Target } from './constants';

export type Events = ReturnType<typeof createEvents>;

function onKeyDown(store: Store, e: KeyboardEvent) {
  if (store.uiState === 'selecting') {
    if (e.key === 'Escape') {
      console.log('escaping');
      actions.stopSelecting(store);
      e.stopPropagation();
      e.preventDefault();
      return;
    }
  } else if (store.viewingId) {
    if (e.key === 'Escape') {
      console.log('scaping2');
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
}

export function createEvents(store: Store) {
  document.addEventListener('keydown', (e) => onKeyDown(store, e));

  return {
    onConnectionStateChange: async (isConnected: boolean) => {
      store.isConnected = isConnected;

      if (!store.config.isSetup) {
        await actions.authenticate(store);
      }

      if (!store.config.hasIdentified) {
        await actions.saveProfile(store);
        await actions.subscribeProfiles(store);
      }
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

    onClick: (e: React.MouseEvent, props: { target: Target }) => {
      switch (props.target.type) {
        case 'commentButton': {
          break;
        }
        case 'closeThreadButton': {
          actions.closeThread(store);
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
    },

    onEmojiReactionClick: (e: React.MouseEvent, props: { target: CommentReactionTarget }) => {
      actions.toggleCommentReaction(store, props);
    },

    onEmojiReactPointerDown: (e: React.PointerEvent, props: { target: CommentTarget }) => {
      actions.toggleEmojiReactionPicker(store, props);
    },

    onBlur: (e: React.FocusEvent, props: { target: Target }) => {
      actions.blur(store, props.target);
    },

    onKeyDown,

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
          if (props.target.type === 'floatingCommentButton') {
            actions.startSelecting(store);
          } else if (props.target.type === 'pin') {
            actions.viewThread(store, props);
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
