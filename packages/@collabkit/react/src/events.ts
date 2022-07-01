import { DataSnapshot } from 'firebase/database';
import React, { useContext } from 'react';
import { actions } from './actions';
import { CommentReactionTarget, CommentTarget, Store, Target } from './constants';

// function closestCommentable(target: EventTarget) {
//   const el = (target as Element).closest('[data-commentable=true]');
//   return el;
// }

export type Events = ReturnType<typeof createEvents>;

function onKeyDown(store: Store, e: KeyboardEvent) {
  if (store.focusedId?.type === 'composer') {
    if (e.key === 'Enter' && !e.shiftKey) {
      actions.sendMessage(store, store.focusedId.workspaceId, store.focusedId.threadId);
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
      actions.sendMessage(store, workspaceId, threadId);
    },

    // onMouseOver: (e: MouseEvent) => {
    //   actions.removeSelection();
    //   if (e.target) {
    //     const el = closestCommentable(e.target);
    //     if (el) actions.hover(el);
    //   }
    // },

    onFocus: (e: React.FocusEvent, props: { target: Target }) => {
      actions.focus(store, props.target);
    },

    onClick: (e: React.MouseEvent, props: { target: Target }) => {
      switch (props.target.type) {
        case 'commentButton': {
          break;
        }
        case 'closeThreadButton': {
        }
        case 'resolveThreadButton': {
          actions.resolve(store, props.target.workspaceId, props.target.threadId);
          break;
        }
        case 'reopenThreadButton': {
          actions.open(store, props.target.workspaceId, props.target.threadId);
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

    onKeyDown: (e: KeyboardEvent) => {
      if (store.focusedId?.type === 'composer') {
        if (e.key === 'Enter' && !e.shiftKey) {
          actions.sendMessage(store, store.focusedId.workspaceId, store.focusedId.threadId);
          e.stopPropagation();
          e.preventDefault();
        }
      }
    },

    // onMouseDown: (e: MouseEvent) => {
    //   switch (store.uiState) {
    //     case 'selecting': {
    //       if (!e.target) return;

    //       const el = closestCommentable(e.target);
    //       if (!el) return;

    //       const id = el.getAttribute('data-commentable-id');
    //       if (!id) return;

    //       actions.startCommenting(id);
    //       break;
    //     }
    //     case 'commenting': {
    //       break;
    //     }
    //     case 'idle': {
    //       break;
    //     }
    //     case 'composing': {
    //       break;
    //     }
    //   }
    // },

    // onKeyDown: (e: KeyboardEvent) => {
    //   if (e.key === 'Escape') {
    //     actions.cancel();
    //   }
    //   switch (store.uiState) {
    //     case 'composing': {
    //       if (store.selectedId) {
    //         store.composers[store.selectedId.threadId].body += e.key;
    //       }
    //       break;
    //     }
    //   }
    // },
  };
}

// export const events = {
//   onConnectionStateChange: async (isConnected: boolean) => {
//     store.isConnected = isConnected;

//     if (!store.config.isSetup) {
//       await actions.authenticate();
//     }

//     if (!store.config.hasIdentified) {
//       await actions.saveProfile();
//     }
//   },

//   onTimelineEventAdded: (snapshot: DataSnapshot) => {
//     const event = snapshot.val();
//     const eventId = snapshot.key;
//     const workspaceId = snapshot.ref.parent?.ref.parent?.key;
//     const threadId = snapshot.ref.parent?.key;

//     // todo validate data here
//     //
//     if (threadId && workspaceId && eventId) {
//       store.workspaces[workspaceId].timeline[threadId] ||= {};
//       store.workspaces[workspaceId].timeline[threadId][eventId] ||= event;
//     }
//   },

//   onSend: (workspaceId: string, threadId: string) => {
//     actions.sendMessage(workspaceId, threadId);
//   },

//   // onMouseOver: (e: MouseEvent) => {
//   //   actions.removeSelection();
//   //   if (e.target) {
//   //     const el = closestCommentable(e.target);
//   //     if (el) actions.hover(el);
//   //   }
//   // },

//   onFocus: (e: React.FocusEvent, props: { target: Target }) => {
//     actions.focus(props.target);
//   },

//   onClick: (e: React.MouseEvent, props: { target: Target }) => {
//     switch (props.target.type) {
//       case 'commentButton': {
//         break;
//       }
//     }
//   },

//   onEmojiReactionClick: (e: React.MouseEvent, props: { target: CommentReactionTarget }) => {
//     actions.toggleCommentReaction(props);
//   },

//   onEmojiReactPointerDown: (e: React.PointerEvent, props: { target: CommentTarget }) => {
//     actions.toggleEmojiReactionPicker(props);
//   },

//   onBlur: (e: React.FocusEvent, props: { target: Target }) => {
//     actions.blur(props.target);
//   },

//   onKeyDown: (e: KeyboardEvent) => {
//     if (store.focusedId?.type === 'composer') {
//       if (e.key === 'Enter' && !e.shiftKey) {
//         actions.sendMessage(store.focusedId.workspaceId, store.focusedId.threadId);
//         e.stopPropagation();
//         e.preventDefault();
//       }
//     }
//   },

//   // onMouseDown: (e: MouseEvent) => {
//   //   switch (store.uiState) {
//   //     case 'selecting': {
//   //       if (!e.target) return;

//   //       const el = closestCommentable(e.target);
//   //       if (!el) return;

//   //       const id = el.getAttribute('data-commentable-id');
//   //       if (!id) return;

//   //       actions.startCommenting(id);
//   //       break;
//   //     }
//   //     case 'commenting': {
//   //       break;
//   //     }
//   //     case 'idle': {
//   //       break;
//   //     }
//   //     case 'composing': {
//   //       break;
//   //     }
//   //   }
//   // },

//   // onKeyDown: (e: KeyboardEvent) => {
//   //   if (e.key === 'Escape') {
//   //     actions.cancel();
//   //   }
//   //   switch (store.uiState) {
//   //     case 'composing': {
//   //       if (store.selectedId) {
//   //         store.composers[store.selectedId.threadId].body += e.key;
//   //       }
//   //       break;
//   //     }
//   //   }
//   // },
// };
