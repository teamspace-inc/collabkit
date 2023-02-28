import { proxy, ref } from 'valtio';
import { derive } from 'valtio/utils';
import { Config, Store, SyncAdapter } from '@collabkit/core';
import { createStore } from '@collabkit/client';

export function createValtioStore(config: Config, sync: SyncAdapter): Store {
  const store = proxy(createStore());
  store.config = config;
  store.sync = ref(sync);
  derive(
    {
      pins: (get) => {
        const snapshot = get(store);
        const { workspaceId, viewingId, previewingId } = snapshot;
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
            const { attachments } = composer;
            if (attachments) {
              for (const id in attachments) {
                if (attachments[id].type !== 'pin') continue;
                const exists = pins.find((pin) => pin.id === id);
                if (!exists) {
                  pins.push({
                    ...attachments[id],
                    id,
                    eventId,
                    threadId,
                    workspaceId,
                    createdById: store.userId!,
                  });
                }
              }
            }
          }
        }

        // move previewing or viewing pin to the start of the array
        // so they appear on top of other pins when either the preview
        // or popover content is shown
        if (previewingId && previewingId.type === 'pin') {
          const index = pins.findIndex((pin) => pin.id === previewingId.id);
          if (index > -1) {
            const pin = pins[index];
            pins.splice(index, 1);
            pins.push(pin);
          }
        }
        if (viewingId && viewingId.type === 'pin') {
          const index = pins.findIndex((pin) => pin.id === viewingId.id);
          if (index > -1) {
            const pin = pins[index];
            pins.splice(index, 1);
            pins.push(pin);
          }
        }

        return {
          open: pins,
        };
      },
    },
    {
      proxy: store,
    }
  );

  return store as Store;
}
