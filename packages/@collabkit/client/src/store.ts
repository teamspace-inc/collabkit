import type {
  Composer,
  Config,
  Store,
  SyncAdapter,
  UnconfiguredStore,
  Workspace,
} from '@collabkit/core';
import { derive } from 'valtio/utils';
import { proxy, ref as valtioRef } from 'valtio/vanilla';
import { FirebaseSync } from './sync/firebase/FirebaseSync';

export function markRaw<T extends object>(
  value: T
): T & {
  __v_skip?: true;
  $$valtioRef: true;
} {
  return valtioRef(value);
}

export function createComposer(): Composer {
  return {
    isTyping: {},
    editor: null,
    enabled: false,
    isMentioning: false,
    hasText: false,
    attachments: {},
  };
}

export function createWorkspace(): Workspace {
  return {
    inbox: {},
    profiles: {},
    name: '',
    timeline: {},
    composers: {},
    seen: {},
    threadInfo: {},
    threadProfiles: {},
    pendingThreadInfo: {},
    openPins: {},
    eventPins: {},
    computed: {},
    isResolved: {},
    isOpen: {},
  };
}

export function createStore(): UnconfiguredStore {
  const store: UnconfiguredStore = {
    isFigmaStyle: true,
    sync: null as unknown as SyncAdapter,
    isConnected: false,
    isSidebarOpen: false,
    uiState: 'idle',
    config: null,
    userId: null,
    user: null,
    workspaceId: null,
    selectedId: null,
    menuId: null,
    reactingId: null,
    viewingId: null,
    previewingId: null,
    hoveringId: null,
    focusedId: null,
    editingId: null,
    editingEventSnapshots: {},
    composerId: null,
    workspaces: {},
    profiles: {},
    avatarErrors: {},
    subs: {},
    callbacks: {},
    mentionableUsers: {},
    nextThreadId: null,
    clientX: 0,
    clientY: 0,
    commentables: {},
    expandedThreadIds: [],
    pinsVisible: true,
    dragPinObjectId: '',
    dragPinUpdate: [],
    visiblePinPositions: [],
  };
  return store;
}

export function createCollabKitStore(config: Config) {
  const sync = new FirebaseSync({ test: config._test ?? false });
  return createValtioStore(config, sync);
}

export function createValtioStore(config: Config, sync: SyncAdapter): Store {
  const store = proxy(createStore());
  store.config = config;
  store.sync = markRaw(sync);
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
