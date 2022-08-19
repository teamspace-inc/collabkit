import { proxy, ref } from 'valtio';
import { Config, Store, SyncAdapter } from './constants';
import { createStore, actions } from '@collabkit/client';

export function createValtioStore(config: Config, sync: SyncAdapter): Store {
  const store = proxy(createStore());
  actions.init(store, config, ref(sync));
  return store as Store;
}
