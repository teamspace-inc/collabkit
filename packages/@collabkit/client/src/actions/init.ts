import type { Config, Store, UnconfiguredStore, SyncAdapter } from '@collabkit/core';

export async function init(store: Store | UnconfiguredStore, config: Config, sync: SyncAdapter) {
  store.config = config;
  store.sync = sync;
}
