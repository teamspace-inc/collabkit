import { proxy, ref } from 'valtio';
import { IdentifyProps, MentionProps, Store, Workspace } from './constants';
import { SyncAdapter } from './sync';

export type Config = {
  appId: string;
  apiKey: string;
  workspace: { name?: string; id: string };
  user?: IdentifyProps | null;
  mentionableUsers: MentionProps;
  readOnly?: boolean;
  mode?: 'demo';
  onAuthenticationRequired?: () => void;
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

export function createStore(config: Config, sync: SyncAdapter, skipCache = false): Store {
  const store = proxy<Store>({
    sync: ref(sync),
    mode: config.mode,
    isReadOnly: config.readOnly ?? false,
    isConnected: false,
    isSignedIn: false,
    token: config.apiKey,
    appState: 'ready',
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
      onAuthenticationRequired: config.onAuthenticationRequired,
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
  return store;
}
