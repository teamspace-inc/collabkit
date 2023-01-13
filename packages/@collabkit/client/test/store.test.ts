import { createComposer, createStore, createWorkspace } from '../src/store';
import { expect, test } from 'vitest';

test('createWorkspace', () => {
  expect(createWorkspace()).toStrictEqual({
    inbox: {},
    openThreads: {},
    objects: {},
    profiles: {},
    name: '',
    timeline: {},
    composers: {},
    seen: {},
    seenBy: {},
    threadInfo: {},
    likelyFetchedAllProfiles: false,
    threadProfiles: {},

    timelineInitialFetchComplete: {},
    fetchedProfiles: {},

    pendingThreads: {},
    pendingThreadInfo: {},
  });
});

test('createComposer', () => {
  expect(createComposer()).toStrictEqual({
    $$body: '',
    mentions: [],
    isTyping: {},
    editor: null,
    enabled: false,
    isMentioning: false,
  });
});

test('createStore', () => {
  expect(createStore()).toStrictEqual({
    sync: null,
    isReadOnly: false,
    isConnected: false,
    isSidebarOpen: false,
    appState: 'blank',
    uiState: 'idle',
    isDemo: false,
    config: null,
    userId: null,
    user: null,
    workspaceId: null,
    focusedId: null,
    menuId: null,
    selectedId: null,
    reactingId: null,
    viewingId: null,
    previewingId: null,
    editingId: null,
    hoveringId: null,
    workspaces: {},
    profiles: {},
    avatarErrors: {},
    subs: {},
    callbacks: {},
    mentionableUsers: {},
  });
});
