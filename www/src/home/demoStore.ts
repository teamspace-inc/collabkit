import {
  internal_createStore as createStore,
  internal_createWorkspace as createWorkspace,
  Config,
  Workspace,
} from '@collabkit/react';
import { subscribe } from 'valtio/vanilla';
import { LocalOnlySync } from './LocalOnlySync';

export function createDemoStore(
  config: Config,
  storageKey: string,
  defaultWorkspace: Partial<Workspace>
) {
  const workspace = loadWorkspace(storageKey, defaultWorkspace);
  const sync = new LocalOnlySync(workspace);
  const store = createStore(config, sync);

  store.workspaces.acme = {
    ...createWorkspace(),
    ...workspace,
  };
  store.workspaceId = 'acme';
  store.userId = 'demo';
  store.profiles = profiles as any;
  subscribe(store, (ops) => {
    if (ops.some(shouldPersistChange)) {
      saveWorkspace(storageKey, store.workspaces.acme);
    }
  });
  return store;
}

function shouldPersistChange(op: Op) {
  const path = op[1];
  return path[0] === 'workspaces' && path[1] === 'acme';
}

const VERSION = 'v4';
function saveWorkspace(storageKey: string, { pins, timeline, seen }: Workspace) {
  try {
    localStorage.setItem(
      storageKey,
      JSON.stringify({ workspace: { pins, timeline, seen }, version: VERSION })
    );
  } catch {
    console.error('Failed to save workspace to localStorage');
  }
}
function loadWorkspace(storageKey: string, defaultWorkspace: Partial<Workspace>) {
  let data = null;
  try {
    data = JSON.parse(localStorage.getItem(storageKey) ?? 'null');
  } catch {
    return defaultWorkspace;
  }
  if (data && data.version == VERSION && data.workspace) {
    return data.workspace;
  } else {
    return defaultWorkspace;
  }
}

const profiles = {
  'anon-1': { color: 'slate', email: 'anon@example.com', name: 'Jane Doe' },
  'alicia-1': { color: 'orange', email: 'alicia@example.com', name: 'Alicia Baker' },
  'dom-1': { color: 'sky', email: 'dom@example.com', name: 'Dominic Burt' },
  'greta-1': { color: 'violet', email: 'greta@example.com', name: 'Greta Aziz' },
  'ville-1': { color: 'green', email: 'ville@example.com', name: 'Ville Deckard' },
  john: { color: 'pink', email: 'john@example.com', name: 'John Doe' },
  sara: { color: 'blue', email: 'sara@example.com', name: 'Sarah Donner' },
  tamar: { color: 'teal', email: 'tamar@example.com', name: 'Tamar Jones' },
};

export const mentionableUsers = Object.entries(profiles).map(([userId, profile]) => ({
  userId,
  name: profile.name,
  email: profile.email,
  workspaceId: 'acme',
}));

type Path = (string | symbol)[];
type Op =
  | [op: 'set', path: Path, value: unknown, prevValue: unknown]
  | [op: 'delete', path: Path, prevValue: unknown]
  | [op: 'resolve', path: Path, value: unknown]
  | [op: 'reject', path: Path, error: unknown];
