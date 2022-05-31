import { proxy } from 'valtio';

export interface Comment {
  id: string;
  message: string;
  actorId: string;
  seenBy: string[];
}

export interface Actor {
  name: string;
  photoURL: string;
  id: string;
}

export interface CommentThread {
  actors: { [key: string]: Actor };
  isDone: boolean;
  comments: Comment[];
  composerMessage: string;
}

export interface Store {
  uiState: 'idle' | 'commenting' | 'selecting';
  threads: { [key: string]: CommentThread };
}

function closestCommentable(target: EventTarget) {
  const el = (target as Element).closest('[data-commentable=true]');
  return el;
}

export const store = proxy<Store>({
  uiState: 'idle',
  threads: {
    'thread-1': {
      isDone: false,
      actors: {
        'user-1': {
          name: 'Joe',
          id: 'user-1',
          photoURL: 'https://randomuser.me/api/portraits/men/35.jpg',
        },
        'user-2': {
          name: 'Rebecca',
          id: 'user-2',
          photoURL: 'https://api.uifaces.co/our-content/donated/AVQ0V28X.jpg',
        },
      },
      composerMessage: '',
      comments: [
        { id: '1', message: 'Hey', actorId: 'user-1', seenBy: ['user-1', 'user-2'] },
        { id: '2', message: 'Hi', actorId: 'user-2', seenBy: ['user-2'] },
      ],
    },
    'thread-2': {
      isDone: false,
      actors: {},
      composerMessage: '',
      comments: [],
    },
  },
});

export const events = {
  onFloatingCommentButtonClick: () => {
    switch (store.uiState) {
      case 'idle': {
        actions.startSelecting();
        break;
      }
      case 'selecting':
      case 'commenting': {
        actions.cancel();
        break;
      }
    }
  },

  onCommentSend: (message: string) => {
    actions.sendMessage(message);
  },

  onMouseOver: (e: MouseEvent) => {
    actions.removeSelection();
    if (e.target) {
      const el = closestCommentable(e.target);
      if (el) actions.hover(el);
    }
  },

  onMouseDown: (e: MouseEvent) => {
    if (store.uiState != 'selecting') return;
    if (!e.target) return;

    const el = closestCommentable(e.target);
    if (!el) return;

    const id = el.getAttribute('data-commentable-id');
    if (!id) return;

    actions.startCommenting(id);
  },

  onKeyDown: (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      actions.cancel();
    }
  },
};

export const actions = {
  removeSelection: () => {
    document.querySelectorAll('[data-commentable]').forEach((el) => {
      if (el.classList.contains('commentable-hover')) {
        el.classList.remove('commentable-hover');
      }
    });
  },

  hover: (el: Element) => {
    el.classList.add('commentable-hover');
  },

  startSelecting: () => {
    if (store.uiState === 'idle') {
      store.uiState = 'selecting';
      document.addEventListener('mouseover', events.onMouseOver);
      document.addEventListener('keydown', events.onKeyDown);
      document.addEventListener('mousedown', events.onMouseDown);
    }
  },

  startCommenting: (id: string) => {
    document.removeEventListener('mouseover', events.onMouseOver);
    document.removeEventListener('keydown', events.onKeyDown);
    if (store.uiState === 'selecting') {
      store.uiState = 'commenting';
    }
  },
  cancel: () => {
    store.uiState = 'idle';
    actions.removeSelection();
    document.removeEventListener('mousedown', events.onMouseDown);
    document.removeEventListener('mouseover', events.onMouseOver);
    document.removeEventListener('keydown', events.onKeyDown);
  },
  sendMessage: (message: string) => {
    console.log('sending message', message);
    store.threads['thread-1'].comments.push({
      message,
      actorId: 'user-1',
      seenBy: ['user-1', 'user-2'],
    });
  },
};
