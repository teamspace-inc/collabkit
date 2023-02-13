import { createComposer, createStore, createWorkspace } from '../src/store';
import { expect, test } from 'vitest';

test('createWorkspace', () => {
  expect(createWorkspace()).toStrictEqual({
    inbox: {},
    openThreads: {},
    profiles: {},
    name: '',
    timeline: {},
    composers: {},
    seen: {},
    seenBy: {},
    threadInfo: {},
    threadProfiles: {},
    pendingThreads: {},
    pendingThreadInfo: {},
    openPins: {},
    eventPins: {},
    computed: {},
  });
});

test('createComposer', () => {
  expect(createComposer()).toStrictEqual({
    isTyping: {},
    editor: null,
    enabled: false,
    isMentioning: false,
    pendingPin: null,
    hasText: false,
  });
});

test('createStore', () => {
  expect(createStore()).toStrictEqual({
    isPinningEnabled: false,
    appId: null,
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
    selectedId: null,
    focusedId: null,
    hoveringId: null,
    menuId: null,
    reactingId: null,
    viewingId: null,
    previewingId: null,
    editingId: null,
    workspaces: {},
    profiles: {},
    avatarErrors: {},
    subs: {},
    callbacks: {},
    mentionableUsers: {},
    nextThreadId: null,
    clientX: 0,
    clientY: 0,
    composerId: null,
    commentables: {},
    expandedThreadIds: [],
    pinsVisible: true,
    dragPinObjectId: '',
    dragPinUpdate: [],
  });
});
