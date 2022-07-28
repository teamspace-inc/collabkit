import { proxy } from 'valtio';
import { IdentifyProps, MentionProps, Store, Workspace } from './constants';

type Config = {
  appId: string;
  apiKey: string;
  workspace: { name?: string; id: string };
  user: IdentifyProps;
  mentionableUsers: MentionProps;
  readOnly?: boolean;
  mode?: 'demo';
};

export function createWorkspace(config: Config): Workspace {
  return {
    inbox: {},
    pins: {},
    profiles: {},
    name: config.workspace.name || '',
    timeline: {},
    composers: {},
    seen: {},
    seenBy: {},
  };
}

export function createStore(config: Config): Store {
  if (import.meta.env.DEV && _storeCache[config.apiKey]) {
    return _storeCache[config.apiKey];
  }
  const store = proxy<Store>({
    mode: config.mode,
    isReadOnly: config.readOnly ?? false,
    isConnected: false,
    token: config.apiKey,
    appState: 'config',
    uiState: 'idle',
    config: {
      identify: config.user,
      setup: {
        appId: config.appId,
        apiKey: config.apiKey,
        mode: 'UNSECURED',
      },
      workspace: config.workspace,
      mentions: config.mentionableUsers,
    },
    focusedId: null,
    selectedId: null,
    reactingId: null,
    viewingId: null,
    composingId: null,
    hoveringId: null,
    workspaces: {
      [config.workspace.id]: createWorkspace(config),
    },
    profiles: {},
    subs: {},
  });
  if (import.meta.env.DEV) {
    _storeCache[config.apiKey] = store;
  }
  return store;
}

const _storeCache: Record<string, Store> = {};
