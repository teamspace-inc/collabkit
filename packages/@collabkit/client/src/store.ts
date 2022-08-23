import type { SyncAdapter, UnconfiguredStore, Workspace } from '@collabkit/core';
import { ref as valtioRef } from 'valtio';
import { markRaw as vueMarkRaw } from '@vue/reactivity';

export function markRaw<T extends object>(
  value: T
): T & {
  __v_skip?: true;
  $$valtioRef: true;
} {
  return vueMarkRaw(valtioRef(value));
}

export function createWorkspace(): Workspace {
  return {
    inbox: {},
    pins: {},
    profiles: {},
    name: '',
    timeline: {},
    composers: {},
    seen: {},
    seenBy: {},
    threadInfo: {},
    likelyFetchedAllProfiles: false,
  };
}

export function createStore(): UnconfiguredStore {
  const store: UnconfiguredStore = {
    sync: null as unknown as SyncAdapter,
    isReadOnly: false,
    isConnected: false,
    isSignedIn: false,
    appState: 'blank',
    uiState: 'idle',
    isDemo: false,
    config: null,
    userId: null,
    user: null,
    workspaceId: null,
    focusedId: null,
    selectedId: null,
    reactingId: null,
    viewingId: null,
    composingId: null,
    hoveringId: null,
    workspaces: {},
    profiles: {},
    subs: {},
    callbacks: {},
  };
  return store;
}
