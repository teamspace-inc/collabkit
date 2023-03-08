import type { App } from 'vue';
import type { Config } from '@collabkit/core';
import { createCollabKitStore } from '@collabkit/client';

export function createCollabKit(config: Config) {
  const collabkitPlugin = {
    install(app: App) {
      const store = createCollabKitStore(config);
      app.provide('CollabKitStore', store);
    },
  };
  return collabkitPlugin;
}
