import type { App } from 'vue';
import type { Config } from '@collabkit/core';
import { actions, createCollabKitStore } from '@collabkit/client';
import { storeKey } from './constants';

export function createCollabKit(config: Config) {
  const collabkitPlugin = {
    install(app: App) {
      const store = createCollabKitStore(config);
      actions.install(store);
      app.provide(storeKey, store);
    },
  };
  return collabkitPlugin;
}
