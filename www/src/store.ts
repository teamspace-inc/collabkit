import {
  internal_createStore as createStore,
  internal_createWorkspace as createWorkspace,
  Config,
  Workspace,
} from '@collabkit/react';
import { subscribe } from 'valtio/vanilla';
import { LocalOnlySync } from './LocalOnlySync';

export function createDemoStore(config: Config, storageKey: string) {
  const workspace = loadWorkspace(storageKey);
  const sync = new LocalOnlySync(workspace);
  const store = createStore(config, sync, true);

  store.workspaces.acme = {
    ...createWorkspace(config),
    ...workspace,
  };
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

const VERSION = 'v0';
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
function loadWorkspace(storageKey: string) {
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

const defaultWorkspace: Partial<Workspace> = {
  pins: {
    B0ENawPadDHvTyyILKWz2: {
      createdAt: 1658843343088,
      createdById: 'alicia-1',
      offset: { x: 0.5791564580251479, y: 0.7686934621710526 },
      selector: 'img[src="/src/UI.svg"]',
      state: 'open',
      url: 'http://localhost:8000/demo',
    },
    IdNMQ8uP07YfJtxyNqH28: {
      createdAt: 1658843169471,
      createdById: 'dom-1',
      offset: { x: 0.5128657775517751, y: 0.29183799342105265 },
      selector: 'img[src="/src/UI.svg"]',
      state: 'open',
      url: 'http://localhost:8000/demo',
    },
    ssuGX9o7kJEE7SeSEhVvR: {
      createdAt: 1658842883088,
      createdById: 'ville-1',
      offset: { x: 0.2997497919748521, y: 0.5798673930921052 },
      selector: 'img[src="/src/UI.svg"]',
      state: 'open',
      url: 'http://localhost:8000/demo',
    },
  },
  timeline: {
    B0ENawPadDHvTyyILKWz2: {
      '-N7ul9YUhGqMcZnBhpUh': {
        body: 'Orders are holding strong. Must be an ACV problem.',
        createdAt: 1658843343088,
        createdById: 'alicia-1',
        type: 'message',
      },
    },
    IdNMQ8uP07YfJtxyNqH28: {
      '-N7ukV90v5j3inGLNQt3': {
        body: 'Revenue looks great here, any ideas on the downturn afterwards?',
        createdAt: 1658843169471,
        createdById: 'dom-1',
        type: 'message',
      },
      '-N7ukaiRfiQ7wmutPzc-': {
        body: 'I think it might have been a stock issue!',
        createdAt: 1658843196463,
        createdById: 'greta-1',
        type: 'message',
      },
    },
    ssuGX9o7kJEE7SeSEhVvR: {
      '-N7ujPE4Y1ZsPANNeb3I': {
        body: "I'm so glad we're tracking this, great work setting up this dashboard.",
        createdAt: 1658842883088,
        createdById: 'ville-1',
        type: 'message',
      },
    },
  },
  seen: {
    ssuGX9o7kJEE7SeSEhVvR: '-N7ujPE4Y1ZsPANNeb3I',
    IdNMQ8uP07YfJtxyNqH28: '-N7ukV90v5j3inGLNQt3',
    B0ENawPadDHvTyyILKWz2: '-N7ul9YUhGqMcZnBhpUh',
    sxG87Sq0t3HHG0ghJMaXu: '-N84KobQKUnix1nNkMH-',
  },
};
const profiles = {
  'anon-1': { color: 'slate', email: 'anon@example.com', name: 'Jane Doe' },
  alice: { color: 'green', name: 'Alice', workspaceId: 'acme' },
  'alice-1': {
    color: 'slate',
    email: 'alice@example.com',
    name: 'Alice Levine',
  },
  'alicia-1': { color: 'orange', email: 'alicia@example.com', name: 'Alicia Baker' },
  'andy-1': { color: 'orange', email: 'andy@example.com', name: 'Andy Jones' },
  'dom-1': { color: 'sky', email: 'dom@example.com', name: 'Dominic Burt' },
  'greta-1': { color: 'violet', email: 'greta@example.com', name: 'Greta Aziz' },
  'janet-1': {
    color: 'yellow',
    email: 'janet@example.org',
    name: 'Janet Reilly',
    workspaceId: 'acme',
  },
  'ville-1': { color: 'green', email: 'ville@example.com', name: 'Ville Deckard' },
};

type Path = (string | symbol)[];
type Op =
  | [op: 'set', path: Path, value: unknown, prevValue: unknown]
  | [op: 'delete', path: Path, prevValue: unknown]
  | [op: 'resolve', path: Path, value: unknown]
  | [op: 'reject', path: Path, error: unknown];
