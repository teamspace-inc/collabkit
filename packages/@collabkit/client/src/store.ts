import type { Composer, SyncAdapter, UnconfiguredStore, Workspace } from '@collabkit/core';
import { ref as valtioRef } from 'valtio/vanilla';
import { markRaw as vueMarkRaw } from '@vue/reactivity';

export function markRaw<T extends object>(
  value: T
): T & {
  __v_skip?: true;
  $$valtioRef: true;
} {
  return vueMarkRaw(valtioRef(value));
}

export function createComposer(): Composer {
  return {
    $$body: '',
    $$mentions: [],
    isTyping: {},
    editor: null,
    enabled: { default: false },
  };
}

export function createWorkspace(): Workspace {
  return {
    inbox: {},
    openThreads: {},
    objects: {},
    pins: {},
    profiles: {},
    name: '',
    timeline: {},
    composers: {},
    seen: {},
    seenBy: {},
    threadInfo: {},
    likelyFetchedAllProfiles: false,

    pendingThreads: {},
    pendingThreadInfo: {},
  };
}

export function createStore(): UnconfiguredStore {
  const store: UnconfiguredStore = {
    sync: null as unknown as SyncAdapter,
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
  };
  return store;
}
