import { createWorkspace } from '@collabkit/client';
import { internal_createStore as createStore, Config, Workspace } from '@collabkit/react';
import { LocalOnlySync } from './LocalOnlySync';

export function createDemoStore(config: Config, defaultWorkspace: Partial<Workspace>) {
  const sync = new LocalOnlySync({});
  const store = createStore(config, sync);

  const workspaceStore = createWorkspace();

  // @ts-ignore
  Object.keys(defaultWorkspace).forEach((k) => (workspaceStore[k] = defaultWorkspace[k]));

  store.workspaces.acme = workspaceStore;
  store.workspaceId = 'acme';
  store.userId = 'anon';
  store.profiles = profiles as any;
  store.appId = 'demo';
  return store;
}

const profiles = {
  anon: {
    id: 'anon',
    color: 'slate',
    email: 'anon@example.com',
    name: 'Anonymous',
  },
  alicia: {
    id: 'alicia',
    color: 'orange',
    email: 'alicia@example.com',
    name: 'Alicia Baker',
  },
  dom: {
    id: 'dom',
    color: 'sky',
    email: 'dom@example.com',
    name: 'Dominic Burt',
  },
  greta: {
    id: 'greta',
    color: 'violet',
    email: 'greta@example.com',
    name: 'Greta Aziz',
  },
  ville: {
    id: 'ville',
    color: 'green',
    email: 'ville@example.com',
    name: 'Ville Deckard',
  },
  john: {
    id: 'john',
    color: 'pink',
    email: 'john@example.com',
    name: 'John Doe',
  },
  sara: {
    id: 'sara',
    color: 'blue',
    email: 'sara@example.com',
    name: 'Sarah Donner',
  },
  tamar: {
    id: 'tamar',
    color: 'teal',
    email: 'tamar@example.com',
    name: 'Tamar Jones',
  },
  julia: {
    id: 'julia',
    color: 'yellow',
    email: 'julia@example.com',
    name: 'Julia Efes',
  },
  jameshanson: {
    id: 'jameshanson',
    color: 'cyan',
    email: 'jameshanson',
    name: 'James Hanson',
  },
};

export const mentionableUsers = Object.entries(profiles).map(([userId, profile]) => ({
  id: userId,
  name: profile.name,
  email: profile.email,
  workspaceId: 'acme',
}));

type Path = (string | symbol)[];
