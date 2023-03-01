import type { Composer, SyncAdapter, UnconfiguredStore, Workspace } from '@collabkit/core';
import { ref as valtioRef } from 'valtio/vanilla';

export function markRaw<T extends object>(
  value: T
): T & {
  __v_skip?: true;
  $$valtioRef: true;
} {
  return valtioRef(value);
}

export function createComposer(): Composer {
  return {
    isTyping: {},
    editor: null,
    enabled: false,
    isMentioning: false,
    hasText: false,
    attachments: {},
  };
}

export function createWorkspace(): Workspace {
  return {
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
  };
}

export function createStore(): UnconfiguredStore {
  const store: UnconfiguredStore = {
    isFigmaStyle: false,
    sync: null as unknown as SyncAdapter,
    isConnected: false,
    isSidebarOpen: false,
    uiState: 'idle',
    config: null,
    userId: null,
    user: null,
    workspaceId: null,
    selectedId: null,
    menuId: null,
    reactingId: null,
    viewingId: null,
    previewingId: null,
    hoveringId: null,
    focusedId: null,
    editingId: null,
    editingEventSnapshots: {},
    composerId: null,
    workspaces: {},
    profiles: {},
    avatarErrors: {},
    subs: {},
    callbacks: {},
    mentionableUsers: {},
    nextThreadId: null,
    clientX: 0,
    clientY: 0,
    commentables: {},
    expandedThreadIds: [],
    pinsVisible: true,
    dragPinObjectId: '',
    dragPinUpdate: [],
    visiblePinPositions: [],
  };
  return store;
}
