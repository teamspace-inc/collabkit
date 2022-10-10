import { createWorkspace } from '@collabkit/client';
import { internal_createStore as createStore, Config, Workspace } from '@collabkit/react';
import { LocalOnlySync } from './LocalOnlySync';

export function createDemoStore(config: Config, defaultWorkspace: Partial<Workspace>) {
  const sync = new LocalOnlySync({});
  const store = createStore(config, sync);

  const workspaceStore = createWorkspace();

  // @ts-ignore
  Object.keys(defaultWorkspace).forEach((k) => (workspaceStore[k] = defaultWorkspace[k]));

  store.isSignedIn = true;
  console.log(workspaceStore);
  store.workspaces.acme = workspaceStore;
  store.workspaceId = 'acme';
  store.userId = 'anon-1';
  store.profiles = profiles as any;
  return store;
}

const profiles = {
  'anon-1': {
    id: 'anon-1',
    color: 'slate',
    email: 'anon@example.com',
    name: 'Jane Doe',
  },
  'alicia-1': {
    id: 'alicia-1',
    color: 'orange',
    email: 'alicia@example.com',
    name: 'Alicia Baker',
  },
  'dom-1': {
    id: 'dom-1',
    color: 'sky',
    email: 'dom@example.com',
    name: 'Dominic Burt',
  },
  'greta-1': {
    id: 'greta-1',
    color: 'violet',
    email: 'greta@example.com',
    name: 'Greta Aziz',
  },
  'ville-1': {
    id: 'ville-1',
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
};

export const mentionableUsers = Object.entries(profiles).map(([userId, profile]) => ({
  id: userId,
  name: profile.name,
  email: profile.email,
  workspaceId: 'acme',
}));

type Path = (string | symbol)[];
