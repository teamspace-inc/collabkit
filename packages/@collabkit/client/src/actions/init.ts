import type { Config, Store, UnconfiguredStore, SyncAdapter } from '@collabkit/core';
import { markRaw } from '../store';

export async function init(store: Store | UnconfiguredStore, config: Config, sync: SyncAdapter) {
  store.config = config;
  store.sync = markRaw(sync);
}
