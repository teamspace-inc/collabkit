import { proxy, ref } from 'valtio';
import { Config, Store, SyncAdapter, Workspace } from './constants';

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
  };
}

export function createStore(config: Config, sync: SyncAdapter): Store {
  const store = proxy<Store>({
    sync: ref(sync),
    isReadOnly: config.readOnly ?? false,
    isConnected: false,
    isSignedIn: false,
    appState: 'blank',
    uiState: 'idle',
    isDemo: false,
    config,
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
  });
  return store;
}
