import { createComposer, createStore, createWorkspace } from '../src/store';
import { expect, test } from 'vitest';

test('createWorkspace', () => {
  expect(createWorkspace()).toStrictEqual({
    inbox: {},
    profiles: {},
    name: '',
    timeline: {},
    composers: {},
    seen: {},
    threadInfo: {},
    threadProfiles: {},
    pendingThreadInfo: {},
    openPins: {},
    eventPins: {},
    computed: {},
    isResolved: {},
    isOpen: {},
  });
});

test('createComposer', () => {
  expect(createComposer()).toStrictEqual({
    isTyping: {},
    editor: null,
    enabled: false,
    isMentioning: false,
    hasText: false,
    attachments: {},
  });
});

test('createStore', () => {
  expect(createStore()).toStrictEqual({
    isFigmaStyle: false,
    appId: null,
    sync: null,
    isConnected: false,
    isSidebarOpen: false,
    appState: 'blank',
    uiState: 'idle',
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
    editingEventSnapshots: {},
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
    visiblePinPositions: [],
  });
});
