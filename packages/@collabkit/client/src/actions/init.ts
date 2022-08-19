import type { Config, Store, UnconfiguredStore } from '@collabkit/core';
import type { SyncAdapter } from '../sync';

export async function init(store: Store | UnconfiguredStore, config: Config, sync: SyncAdapter) {
  store.config = config;
  store.sync = sync;
  store.isReadOnly = config.readOnly ?? false;
}
