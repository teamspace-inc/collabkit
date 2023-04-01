import {
  ref,
  getDatabase,
  onDisconnect,
  onValue,
  onChildAdded,
  Unsubscribe,
  update,
} from '@firebase/database';
import { RelativePosition } from 'yjs';
import { subscribe } from 'valtio';
import { subscribeKey } from 'valtio/utils';
import throttle from 'lodash.throttle';

import type { EditingStore, SelectableTarget, StateWithSpace, Target } from 'state/constants';

import { mutables } from 'state/mutables';

export type FileUploadProgress = { [itemId: string]: number };

export type RequiredProps = 'createdAt' | 'color' | 'uid';

export type RequiredClientState = Pick<ClientState, RequiredProps>;

export type OptimisticState = Omit<ClientState, RequiredProps>;

export type ResizeProps = [
  deltaX: number,
  deltaY: number,
  isAspectRatioLocked: boolean,
  transactionId: number,
  handleId: number
];

type FirebaseResizeProps = [
  deltaX: number,
  deltaY: number,
  isAspectRatioLocked: boolean,
  transactionId: number,
  handleId: number,
  timestamp: number
];

export type DragProps = [deltaX: number, deltaY: number, transactionId: number];

type FirebaseDragProps = [deltaX: number, deltaY: number, transactionId: number, timestamp: number];

type TextCursor = { anchor: RelativePosition; head: RelativePosition };

export type Required = {
  // Required
  createdAt: number;
  color: string;
  uid: string;
};

export type EditingClientState = {
  textCursor: TextCursor | null;
};

export type SpaceClientState = Required & {
  selected?: { [targetId: string]: Omit<SelectableTarget, 'id'> };
  cancellations?: { [transactionId: string]: true };
  drag?: DragProps;
  resize?: ResizeProps;
  selectBox?: number[];
  cursor?: number[];
  editingId?: string;
  fileUploadProgress?: FileUploadProgress;
};

export type ClientState = Required & SpaceClientState;

export type Clients = Record<string, ClientState>;

// function isClientState(o: unknown): o is ClientState {
//   return typeof o === 'object' && o != null;
// }

export type ClientStateUpdateEvent = { clientId: string } & Partial<ClientState>;

let idCounter = 1;
export function nextTransactionId() {
  return idCounter++;
}

const _ref = (path: string[]) => ref(getDatabase(), `/realtime/${path.join('/')}`);

export const docRef = (docId: string) => _ref([docId]);
export const clientRef = (clientId: string) => ref(getDatabase(), `/clients/${clientId}`);
export const realtimeRef = (docId: string, clientId: string) => _ref([docId, clientId]);
export const cancellationsRef = (docId: string, clientId: string) =>
  _ref([docId, clientId, 'cancellations']);
export const dragRef = (docId: string, clientId: string) => _ref([docId, clientId, 'drag']);
export const resizeRef = (docId: string, clientId: string) => _ref([docId, clientId, 'resize']);
export const selectBoxRef = (docId: string, clientId: string) =>
  _ref([docId, clientId, 'selectBox']);
export const cursorRef = (docId: string, clientId: string) => _ref([docId, clientId, 'cursor']);
export const editingRef = (docId: string, clientId: string) => _ref([docId, clientId, 'editing']);
export const selectedRef = (docId: string, clientId: string) => _ref([docId, clientId, 'selected']);

export const cameraRef = (docId: string, clientId: string) => _ref([docId, clientId, 'camera']);

export const lastJoinedAtRef = (docId: string, clientId: string) =>
  _ref([docId, clientId, 'lastJoinedAt']);

export const fileUploadProgressRef = (docId: string, clientId: string) =>
  _ref([docId, clientId, 'fileUploadProgress']);

// takes an array of from Type[] and turns it into a Record<string, Type>
// where Type has an 'id' field
function arrayToObject(ids: Iterable<SelectableTarget>) {
  return Array.from(ids).reduce((o, target) => {
    const { id, ...rest } = target;
    o[id] = rest;
    return o;
  }, {} as { [id: string]: Omit<SelectableTarget, 'id'> });
}

const dropUpdatesOlderThanMs = 500;

export function cancelDrag(docId: string, transactionId: number, clientId: string) {
  const ref = realtimeRef(docId, clientId);
  return update(ref, {
    drag: null,
    [`cancellations/${transactionId}`]: true,
  });
}

export function cancelResize(docId: string, transactionId: number, clientId: string) {
  const ref = realtimeRef(docId, clientId);
  return update(ref, {
    resize: null,
    [`cancellations/${transactionId}`]: true,
  });
}

interface FirebaseCardClientState {
  textCursor?: TextCursor | null;
}

interface FirebaseClientState {
  drag?: FirebaseDragProps | null;
  resize?: FirebaseResizeProps | null;
  selectBox?: number[] | null;
  selected: { [itemId: string]: Omit<SelectableTarget, 'id'> } | null;
  cursor?: number[] | null;
  editing?: Target | null;
  textCursor?: { anchor: RelativePosition; head: RelativePosition; id: string } | null;
  camera?: number[] | null;
  fileUploadProgress?: FileUploadProgress | null;
  lastJoinedAt: number | object;
}

export function bindEditingRealtime(
  docId: string,
  store: EditingStore,
  localClientId: string
): Unsubscribe {
  const subs: Unsubscribe[] = [];

  let isConnected = false;
  let pending: Partial<FirebaseCardClientState> = {};

  async function flush() {
    if (!isConnected) {
      return;
    }
    try {
      const values = pending;
      pending = {};
      await update(realtimeRef(docId, localClientId), values);
    } catch (e) {
      console.error('[flush] error', e, pending);
    }
  }

  // 60 fps
  const tick = throttle(flush, 1000 / 60, { trailing: true });

  const unsubscribeTextCursor = subscribeKey(store, 'localYCursors', (value) => {
    pending.textCursor = value[docId];
    tick();
  });

  subs.push(
    onValue(docRef(docId), (snapshot) => {
      const val = snapshot.val();
      if (val) {
        // need to unwrap .textCursor as it's redundant here
        for (const id in val) {
          store.yCursors[docId] ||= {};
          store.yCursors[docId]![id] = val[id]?.textCursor ?? null;
        }
      } else {
        store.yCursors[docId] = {};
      }
    })
  );

  const db = getDatabase();
  const connectedRef = ref(db, '.info/connected');
  subs.push(
    onValue(connectedRef, async (snap) => {
      if (snap.val() === true) {
        await onDisconnect(realtimeRef(docId, localClientId)).remove();

        isConnected = true;
        tick();
      } else {
        isConnected = false;
        store.yCursors ||= {};
        store.yCursors[docId] = {};
      }
    })
  );

  return () => {
    unsubscribeTextCursor();
    subs.forEach((sub) => sub());
  };
}

export const onClient = (state: StateWithSpace, clientId: string) => {
  const docId = state.currentSpace.docId;
  const spaceStore = state.currentSpace;

  function isRealtime(timestamp: number) {
    return Date.now() - timestamp < dropUpdatesOlderThanMs;
  }

  const _subs: Unsubscribe[] = [];

  _subs.push(
    onValue(clientRef(clientId), (snapshot) => {
      const val = snapshot.val() || null;
      state.store.clients[clientId] = val;
    })
  );

  _subs.push(
    onValue(selectedRef(docId, clientId), (snapshot) => {
      const val = snapshot.val() || {};
      const client = spaceStore.realtime[clientId];

      if (!client) {
        return;
      }

      // const clientSelected = new Set<SelectableTargets>();

      client.selected = {};
      for (const id of Object.keys(val)) {
        client.selected[id] = val[id];
      }

      // selected.set(clientId, )
    })
  );

  _subs.push(
    onValue(dragRef(docId, clientId), (snapshot) => {
      const val = snapshot.val();
      if (!val) {
        // we don't set to null here because we want to keep the drag
        // until we receive a completed tx or it's cancelled
        return;
      }
      const timestamp = val[3] as number;

      if (!isRealtime(timestamp)) {
        return;
      }

      const drag = val.slice(0, 3);

      const client = spaceStore.realtime[clientId];
      if (client) client.drag = drag;
    })
  );

  _subs.push(
    onValue(resizeRef(docId, clientId), (snapshot) => {
      const val = snapshot.val();
      if (!val) {
        // we don't set to null here because we want to keep the resize
        // until we receive a completed tx or it's cancelled.
        return;
      }
      const args = val as [...ResizeProps, number];
      const timestamp = args[5];

      if (!isRealtime(timestamp)) {
        console.log('[realtime] resize not realtime', timestamp);
        return;
      }

      const resize = val.slice(0, 5);
      const client = spaceStore.realtime[clientId];
      if (client) client.resize = resize;
    })
  );

  _subs.push(
    onValue(cameraRef(docId, clientId), (snapshot) => {
      const val = snapshot.val();
      if (!val) {
        delete mutables.cameras[clientId];
        return;
      }

      const camera = {
        point: [val[0] as number, val[1] as number],
        zoom: val[2] as number,
      };

      const timestamp = val[3] as number;

      if (!isRealtime(timestamp)) {
        return;
      }

      if (spaceStore.pageState.followingId === clientId) {
        spaceStore.pageState.camera = camera;
      } else {
        mutables.cameras[clientId] = camera;
      }
    })
  );

  _subs.push(
    onValue(fileUploadProgressRef(docId, clientId), (snapshot) => {
      const val = snapshot.val();
      if (!val) {
        delete spaceStore.realtime[clientId]?.fileUploadProgress;
        return;
      }
      const client = spaceStore.realtime[clientId];
      if (client) client.fileUploadProgress = val;
    })
  );

  _subs.push(
    onChildAdded(cancellationsRef(docId, clientId), (snapshot) => {
      if (snapshot.key) {
        const transactionId = Number(snapshot.key);
        if (!isFinite(transactionId)) {
          console.warn('[realtime] malformed transactionId', transactionId);
          return;
        }
        const canceled = snapshot.val();
        if (canceled) {
          if (spaceStore.realtime[clientId]?.drag?.[2] === transactionId) {
            delete spaceStore.realtime[clientId].drag;
          }
          if (spaceStore.realtime[clientId]?.resize?.[3] === transactionId) {
            delete spaceStore.realtime[clientId].resize;
          }
        }
      }
    })
  );

  _subs.push(
    onValue(cursorRef(docId, clientId), (snapshot) => {
      const val = snapshot.val();
      if (!val) {
        delete spaceStore.realtime[clientId]?.cursor;
      } else {
        const timestamp = val[2] as number;
        if (!isRealtime(timestamp)) {
          return;
        }
        const client = spaceStore.realtime[clientId];
        if (client) client.cursor = val.slice(0, 2);
      }
    })
  );

  _subs.push(
    onValue(editingRef(docId, clientId), (snapshot) => {
      const val = snapshot.val();
      const editingId = val ? val : undefined;
      const client = spaceStore.realtime[clientId];
      if (client) client.editingId = editingId;
    })
  );

  _subs.push(
    onValue(selectBoxRef(docId, clientId), (snapshot) => {
      const val = snapshot.val();
      if (!val) {
        delete spaceStore.realtime[clientId]?.selectBox;
        return;
      } else {
        const timestamp = val[4] as number;
        if (!isRealtime(timestamp)) {
          return;
        }
        const client = spaceStore.realtime[clientId];
        if (client) client.selectBox = val.slice(0, 4);
      }
    })
  );

  return () => {
    _subs.forEach((_) => _());
  };
};

export function bindRealtime(
  docId: string,
  state: StateWithSpace,
  localClientId: string
): Unsubscribe {
  let isConnected = true;
  const { optimistic, pageState } = state.currentSpace;
  let pending: Partial<FirebaseClientState> = {
    selected: arrayToObject(state.store.editing.selectedIds),
    editing: state.store.editing.editingId,
    camera: [...pageState.camera.point, pageState.camera.zoom, Date.now()],
    resize: optimistic.resize ? [...optimistic.resize, Date.now()] : null,
    drag: optimistic.drag ? [...optimistic.drag, Date.now()] : null,
    selectBox: optimistic.selectBox ? [...optimistic.selectBox, Date.now()] : null,
    fileUploadProgress: optimistic.fileUploadProgress ?? null,
    cursor: [...state.currentSpace.cursor, Date.now()],
  };

  async function flush() {
    if (!isConnected) {
      return;
    }
    try {
      const values = pending;
      pending = {};
      await update(realtimeRef(docId, localClientId), values);
    } catch (e) {
      console.error('[flush] error', e, pending);
    }
  }

  // 60 fps
  const tick = throttle(flush, 1000 / 60, { trailing: true });

  // push initial values to Firebase
  tick();

  const unsubscribeEditing = subscribe(state.store.editing, (ops) => {
    for (const op of ops) {
      switch (op[0]) {
        case 'set': {
          switch (op[1][0]) {
            case 'selectedIds': {
              pending.selected = arrayToObject(op[2] as SelectableTarget[]);
              break;
            }
            case 'editingId': {
              pending.editing = op[2] as Target;
              break;
            }
            case 'camera': {
              pending.camera = [
                ...state.currentSpace.pageState.camera.point,
                state.currentSpace.pageState.camera.zoom,
                Date.now(),
              ];
              break;
            }
          }
          break;
        }
        case 'delete': {
          switch (op[1][0]) {
            case 'selectedIds': {
              pending.selected = null;
              break;
            }
            case 'editingId': {
              pending.editing = null;
              break;
            }
            case 'camera': {
              pending.camera = null;
              break;
            }
          }
          break;
        }
        default: {
          console.warn('[subscribe store.pageState] unhandled op', op);
        }
      }
    }
    tick();
  });

  const unsubscribePageState = subscribe(state.currentSpace.pageState, (ops) => {
    for (const op of ops) {
      switch (op[0]) {
        case 'set': {
          switch (op[1][0]) {
            case 'camera': {
              pending.camera = [
                ...state.currentSpace.pageState.camera.point,
                state.currentSpace.pageState.camera.zoom,
                Date.now(),
              ];
              break;
            }
          }
          break;
        }
        case 'delete': {
          switch (op[1][0]) {
            case 'camera': {
              pending.camera = null;
              break;
            }
          }
          break;
        }
        default: {
          console.warn('[subscribe store.pageState] unhandled op', op);
        }
      }
    }
    tick();
  });

  const unsubscribeCursor = subscribeKey(state.currentSpace, 'cursor', (value) => {
    if (value == null) {
      pending.cursor = null;
    } else {
      pending.cursor = [...value, Date.now()];
    }
    tick();
  });

  const unsubscribeOptimistic = subscribe(state.currentSpace.optimistic, (ops) => {
    for (const op of ops) {
      switch (op[0]) {
        case 'set': {
          switch (op[1][0]) {
            case 'resize': {
              pending.resize = [...(op[2] as ResizeProps), Date.now()];
              break;
            }
            case 'drag': {
              pending.drag = [...(op[2] as DragProps), Date.now()];
              break;
            }
            case 'selectBox': {
              pending.selectBox = [...(op[2] as number[]), Date.now()];
              break;
            }
            case 'fileUploadProgress': {
              pending.fileUploadProgress = op[2] as FileUploadProgress;
              break;
            }
            default: {
              console.warn('[subscribe store.optimistic] op: set, unhandled prop', op[1][0]);
            }
          }
          break;
        }
        case 'delete': {
          switch (op[1][0]) {
            case 'selectBox': {
              pending.selectBox = null;
              break;
            }
            case 'resize': {
              pending.resize = null;
              break;
            }
            case 'drag': {
              pending.drag = null;
              break;
            }
            default: {
              console.warn('[subscribe store.optimistic] op: delete, unhandled prop', op[1][0]);
            }
          }
          break;
        }
      }
    }
    tick();
  });

  // const addClient = (clientId: string, clientState: ClientState) => {
  //   if (clientId === localClientId) {
  //     return;
  //   }
  //   if (!clientSubs.has(clientId)) {
  //     // console.log('[realtime client added]', _clientId);
  //     spaceStore.realtime[clientId] = clientState;
  //     clientSubs.set(clientId, onClient(clientId));
  //   }
  // };

  // const removeClient = (clientId: string) => {
  //   if (clientId && clientSubs.has(clientId)) {
  //     // console.log('[realtime client removed]', _clientId);
  //     const unsub = clientSubs.get(clientId);
  //     unsub && unsub();
  //     clientSubs.delete(clientId);
  //     delete spaceStore.realtime[clientId];
  //     delete mutables.cameras[clientId];
  //   }
  // };

  // const connect = async () => {
  //   console.log('[realtime] onDisconnect(clientRef);', localClientId);
  //   // ensure we clean up on disconnect (firebase handles this for us)
  //   await onDisconnect(clientRef(localClientId)).remove();
  //   const snapshot = await get(docRef(docId));

  //   const val = snapshot.val() as { [id: string]: ClientState };
  //   if (val) {
  //     const clients = Object.entries(val);
  //     for (const [clientId, client] of clients) {
  //       addClient(clientId, client);
  //     }
  //   }

  //   // connect
  //   spaceStore.realtime = val || {};
  //   pending = {
  //     lastJoinedAt: serverTimestamp(),
  //   };

  //   await registerClient(globalStore.color, localClientId);
  //   // this needs to be done after registerClient to ensure we have permissions to do it
  //   console.log('[realtime] onDisconnect(realtimeRef);', localClientId);
  //   await onDisconnect(realtimeRef(docId, localClientId)).remove();
  // };

  // const db = getDatabase();
  // const connectedRef = ref(db, '.info/connected');
  // subs.push(
  //   onValue(connectedRef, async (snap) => {
  //     if (snap.val() === true) {
  //       // await connect();
  //       isConnected = true;
  //       tick();
  //     } else {
  //       // disconnect
  //       isConnected = false;
  //       spaceStore.realtime = {};
  //       mutables.cameras = {};
  //       for (const clientId of Object.keys(spaceStore.realtime)) {
  //         removeClient(clientId);
  //       }
  //     }
  //   })
  // );

  // subs.push(
  //   onChildAdded(docRef(docId), (snapshot) => {
  //     const clientId = snapshot.key;
  //     const val = snapshot.val();
  //     if (isClientState(val)) {
  //       clientId && addClient(clientId, val);
  //     } else {
  //       console.warn('[realtime invalid client]', clientId, val);
  //     }
  //   })
  // );

  // subs.push(
  //   onChildRemoved(docRef(docId), (snapshot) => {
  //     const clientId = snapshot.key;
  //     clientId && removeClient(clientId);
  //   })
  // );

  return () => {
    unsubscribeOptimistic();
    unsubscribePageState();
    unsubscribeCursor();
    unsubscribeEditing();
    // [...subs, ...Array.from(clientSubs.values())].forEach((_) => _());
    // clientSubs.clear();
  };
}
