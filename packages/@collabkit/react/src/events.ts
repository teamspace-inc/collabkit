import { DataSnapshot } from 'firebase/database';
import React from 'react';
import { actions } from './actions';
import { Target } from './constants';
import { store } from './store';

// function closestCommentable(target: EventTarget) {
//   const el = (target as Element).closest('[data-commentable=true]');
//   return el;
// }

export const events = {
  onConnectionStateChange: async (isConnected: boolean) => {
    store.isConnected = isConnected;

    if (!store.config.isSetup) {
      await actions.authenticate();
    }

    if (!store.config.hasIdentified) {
      await actions.saveProfile();
    }
  },

  onTimelineEventAdded: (snapshot: DataSnapshot) => {
    const event = snapshot.val();
    // todo validate data here
    if (snapshot.key) {
      if (snapshot.ref.parent?.ref.key) {
        store.timelines[snapshot.ref.parent?.ref.key] ||= {};
        store.timelines[snapshot.ref.parent?.ref.key][snapshot.key] = event;
      }
    }
  },

  onSend: (threadId: string) => {
    actions.sendMessage(threadId);
  },

  // onMouseOver: (e: MouseEvent) => {
  //   actions.removeSelection();
  //   if (e.target) {
  //     const el = closestCommentable(e.target);
  //     if (el) actions.hover(el);
  //   }
  // },

  onFocus: (e: React.FocusEvent, props: { target: Target }) => {
    actions.focus(props.target);
  },

  onBlur: (e: React.FocusEvent, props: { target: Target }) => {
    actions.blur(props.target);
  },

  onChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    props: { target: Target }
  ) => {
    if (props.target.type === 'composer') {
      actions.changeComposer(props.target.threadId, e.target.value);
    }
  },

  onKeyDown: (e: KeyboardEvent) => {
    if (store.focusedId?.type === 'composer') {
      if (e.key === 'Enter' && !e.shiftKey) {
        actions.sendMessage(store.focusedId.threadId);
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
