import { proxy, ref } from 'valtio';
import { derive } from 'valtio/utils';
import { Config, Store, SyncAdapter } from '@collabkit/core';
import { createStore } from '@collabkit/client';

export function createValtioStore(config: Config, sync: SyncAdapter): Store {
  const store = proxy(createStore());
  store.config = config;
  store.sync = ref(sync);
  store.isReadOnly = config.readOnly ?? false;
  derive(
    {
      allPins: (get) => {
        const snapshot = get(store);
        const { workspaceId } = snapshot;
        if (!workspaceId) return {};
        const workspace = snapshot.workspaces[workspaceId];
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
    },
    {
      proxy: store,
    }
  );

  if (config.callbacks) {
    store.callbacks = config.callbacks;
  }
  return store as Store;
}
