import { YFirebaseUpdate, YUpdate, YUpdateBase, YSyncState, YSyncedFirebaseUpdate } from './types';
import { toUint8Array, fromUint8Array } from 'js-base64';
import {
  query,
  ref,
  push as _push,
  get,
  update,
  onValue,
  startAt,
  orderByKey,
  getDatabase,
  serverTimestamp,
  onChildAdded,
} from '@firebase/database';
import { isTypedArray } from './utils';

function validateUpdateBase(o: unknown): o is YUpdateBase {
  return (
    typeof o === 'object' &&
    o != null &&
    o.hasOwnProperty('u') &&
    o.hasOwnProperty('uid') &&
    o.hasOwnProperty('cid') &&
    o.hasOwnProperty('did')
  );
}

export function validateUpdate(o: unknown): o is YUpdate {
  return validateUpdateBase(o) && isTypedArray((o as any)['u']);
}

export function validateFirebaseUpdate(o: unknown): o is YFirebaseUpdate {
  return validateUpdateBase(o) && typeof (o as any)['u'] === 'string';
}

function toUpdate(firebaseUpdate: YFirebaseUpdate & { iid?: string }): YUpdate {
  if (!validateFirebaseUpdate(firebaseUpdate)) {
    throw new Error('invalid FirebaseUpdate');
  }
  delete firebaseUpdate.iid;
  return {
    ...firebaseUpdate,
    u: toUint8Array(firebaseUpdate.u),
  };
}

// by default if an update is retrieved from firebase,
// it must be synced!
function toSyncedFirebaseUpdate(update: YUpdate, firebaseId: string): YSyncedFirebaseUpdate {
  let u = update as YSyncedFirebaseUpdate;
  u.s = YSyncState.Synced;
  u.fid = firebaseId;
  return u;
}

function toFirebaseUpdate(update: YUpdate & { iid?: string }): YFirebaseUpdate {
  if (!validateUpdate(update)) {
    throw new Error('invalid Update');
  }
  delete update.iid;
  return {
    ...update,
    u: fromUint8Array(update.u),
  };
}

async function fetch(docPath: string, startAtId: string | null) {
  const _updates: YSyncedFirebaseUpdate[] = [];
  const snapshot = await get(docUpdatesQuery(docPath, startAtId));
  if (snapshot.exists()) {
    const updates = snapshot.val();
    Object.keys(updates).forEach((id) => {
      const update = updates[id];
      if (validateFirebaseUpdate(update)) {
        _updates.push(toSyncedFirebaseUpdate(toUpdate(update), id));
      }
    });
  }
  return _updates;
}

async function push(docPath: string, update: YUpdate) {
  const updateRef = ref(getDatabase(), docPath);
  const firebaseUpdate = toFirebaseUpdate(update);
  try {
    const snapshot = await _push(updateRef, {
      ...firebaseUpdate,
      t: serverTimestamp(),
    } as YFirebaseUpdate);
    return snapshot.key;
  } catch (e) {
    console.error('erroring pushing update', e);
    return null;
  }
}

function docUpdatesQuery(docPath: string, startAtId: string | null) {
  // console.log(`[yFirebase.query] ${docPath}, ${startAtId}`);
  const orderBy = orderByKey();
  let docRef = ref(getDatabase(), docPath);
  let docQuery =
    typeof startAtId === 'string'
      ? query(docRef, startAt(startAtId), orderBy)
      : query(docRef, orderBy);

  return docQuery;
}

function subscribe(
  docPath: string,
  startAtId: string | null,
  onUpdate: (update: YSyncedFirebaseUpdate) => void
) {
  return onChildAdded(docUpdatesQuery(docPath, startAtId), (snapshot) => {
    if (snapshot.exists() && snapshot.key) {
      const firebaseUpdate = snapshot.val() as unknown;
      if (validateFirebaseUpdate(firebaseUpdate)) {
        const update = toSyncedFirebaseUpdate(toUpdate(firebaseUpdate), snapshot.key);
        if (validateUpdate(update)) {
          onUpdate(update);
        }
      } else {
        console.error('[network/y] invalid update', firebaseUpdate);
      }
    }
  });
}

function onConnection(onChange: (isConnected: boolean) => void) {
  return onValue(ref(getDatabase(), '.info/connected'), (snapshot) => {
    onChange(snapshot.val() === true);
  });
}

async function del(docPath: string, ids: Set<string>) {
  const updates: { [path: string]: any } = {};
  for (const id of ids) {
    const path = `${docPath}/${id}`;
    updates[path] = null;
  }
  await update(ref(getDatabase()), updates);
}

export const yFirebase = {
  fetch,
  push,
  del,
  subscribe,
  onConnection,
};
