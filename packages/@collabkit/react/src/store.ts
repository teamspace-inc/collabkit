import { ref } from 'valtio';
import { proxyWithComputed } from 'valtio/utils';
import { Config, Store, SyncAdapter } from './constants';
import { createStore, actions } from '@collabkit/client';

export function createValtioStore(config: Config, sync: SyncAdapter): Store {
  const store = proxyWithComputed(createStore(), {
    allPins: (store) => {
      const { workspaceId } = store;
      if (!workspaceId) return {};
      const workspace = store.workspaces[workspaceId];
      if (!workspace) return {};
      const pins = Object.entries(workspace?.openPins ?? {})
        .map(([objectId, pinMap]) => Object.values(pinMap).map((pin) => ({ ...pin, objectId })))
        .flat();

      for (const threadId in workspace.composers) {
        const composers = workspace.composers[threadId];
        for (const eventId in composers) {
          const composer = composers[eventId];
          const { pendingPin } = composer;
          if (pendingPin) {
            const exists = pins.find((pin) => pin.id === pendingPin.id);
            if (!exists) {
              pins.push(pendingPin);
            }
          }
        }
      }
      return pins;
    },
  });

  if (config.callbacks) {
    store.callbacks = config.callbacks;
  }
  actions.init(store, config, ref(sync));
  return store as Store;
}
