import { DataSnapshot } from 'firebase/database';
import { actions } from './actions';
import { store } from './store';

function closestCommentable(target: EventTarget) {
  const el = (target as Element).closest('[data-commentable=true]');
  return el;
}

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

  onSend: (threadId: string, body: string) => {
    actions.sendMessage(threadId, body);
  },

  onMouseOver: (e: MouseEvent) => {
    actions.removeSelection();
    if (e.target) {
      const el = closestCommentable(e.target);
      if (el) actions.hover(el);
    }
  },

  onMouseDown: (e: MouseEvent) => {
    switch (store.appState) {
      case 'selecting': {
        if (!e.target) return;

        const el = closestCommentable(e.target);
        if (!el) return;

        const id = el.getAttribute('data-commentable-id');
        if (!id) return;

        actions.startCommenting(id);
        break;
      }
      case 'commenting': {
        break;
      }
      case 'idle': {
        break;
      }
      case 'composing': {
        break;
      }
    }
  },

  onKeyDown: (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      actions.cancel();
    }
    switch (store.appState) {
      case 'composing': {
        if (store.selectedId) {
          store.composer[store.selectedId].body += e.key;
        }
        break;
      }
    }
  },
};
