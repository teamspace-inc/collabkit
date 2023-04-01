import {
  DataSnapshot,
  getDatabase,
  limitToLast,
  onChildAdded,
  onValue,
  orderByKey,
  push,
  Query,
  query,
  ref,
  serverTimestamp,
  startAfter,
} from '@firebase/database';
import { applyUpdateV2, Doc, encodeStateAsUpdateV2, UndoManager } from 'yjs';
import { toUint8Array, fromUint8Array } from 'js-base64';
import { nanoid } from 'nanoid';

import { Binding, DocType, SharedStore, State, Version } from 'state/constants';
import {
  Save,
  TransactionOrigin,
  YUpdateBase,
  YFirebaseUpdate,
  YUpdate,
  YSyncState,
} from './types';
import { runMigrations } from './schema';

const AUTO_SAVE_AFTER = 5;
const AUTO_SAVE_MAX_DELAY = 2_000;

function isTransactionOrigin(origin: unknown): origin is TransactionOrigin {
  return (
    (typeof origin === 'object' &&
      origin != null &&
      typeof (origin as any).clientId === 'string' &&
      typeof (origin as any).txId === 'number') ??
    false
  );
}

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

function isValidFirebaseUpdate(o: unknown): o is YFirebaseUpdate {
  return validateUpdateBase(o) && typeof (o as any)['u'] === 'string';
}

function toUpdate(firebaseUpdate: YFirebaseUpdate & { iid?: string }): YUpdate {
  if (!isValidFirebaseUpdate(firebaseUpdate)) {
    throw new Error('invalid FirebaseUpdate');
  }
  delete firebaseUpdate.iid;
  return {
    ...firebaseUpdate,
    u: toUint8Array(firebaseUpdate.u),
  };
}

export async function fetchSaves(doc: Doc) {
  const savesRef = ref(getDatabase(), `/saves/${doc.guid}`);
  const savesQuery = query(savesRef, orderByKey());
  const snapshot = await get(savesQuery);
  let saves: Save[] = [];
  snapshot.forEach((child) => {
    const save = child.val();
    save.doc = new Doc({ guid: `${doc.guid}/${child.key}` });
    applyUpdateV2(save.doc, toUint8Array(save.u));
    saves.push(save);
  });
  return saves;
}

// https://stackoverflow.com/questions/69007208/firebase-realtime-database-error-client-is-offline-react-nextjs
// solves the pesky "client is offline" error
function get(query: Query): Promise<DataSnapshot> {
  return new Promise((resolve, reject) => {
    onValue(query, resolve, { onlyOnce: true });
  });
}

export async function fetchLastSave(docId: string): Promise<Save | undefined> {
  const savesRef = ref(getDatabase(), `/saves/${docId}`);
  const lastSaveQuery = query(savesRef, orderByKey(), limitToLast(1));
  const snapshot = await get(lastSaveQuery);
  const save = snapshot.val();
  return save ? { ...save[Object.keys(save)[0]], id: snapshot.key } : undefined;
}

export function bindDoc(
  doc: Doc,
  docType: DocType,
  state: State,
  version: Version,
  opts: { save?: Save } = {}
): Binding {
  // we use this to check if we actually need to run
  // a migration in the beforeObserver callback
  // as it can fire fairly often (on any firebase update)
  // but actual schema changes are much more rare.
  let shouldRunMigrations = true;

  // this is used to prevent runMigrations
  // from being triggered while it's running
  let migrationLock = false;

  // before any observers are called
  // run any migrations, this ensures that the app
  // always gets the version of the data as stated
  // in the firebase update # v field.
  function beforeObserverCalls() {
    if (shouldRunMigrations && !migrationLock) {
      migrationLock = true;
      runMigrations(state, doc, docType);
      shouldRunMigrations = false;
    }
    migrationLock = false;
  }

  doc.on('beforeObserverCalls', beforeObserverCalls);

  if (opts.save) {
    if (opts.save.did !== doc.guid) {
      console.warn('save from another doc, ignoring', opts.save);
      opts.save = undefined;
    }

    if (opts.save?.cid === doc.clientID) {
      console.warn('save from same client, ignoring', opts.save);
      opts.save = undefined;
    }
  }
  // console.log('[bindDoc] init', doc.guid, doc.clientID);
  const userId = 'user1';

  const updatesRef = ref(getDatabase(), `/updates/${doc.guid}`);
  const savesRef = ref(getDatabase(), `/saves/${doc.guid}`);

  let pushCount = 0;
  let autoSaveTimeoutID: number | null = null;

  let applied = new Set<string>([]);

  const subs: (() => void)[] = [];

  async function onDocUpdate(update: Uint8Array, origin: any) {
    // console.log('[bindDoc] onDocUpdate', doc.guid, doc.clientID);

    let o = origin;

    if (typeof origin === 'function') {
      o = origin();
    }

    if (o == null) {
      return;
    }

    if (o instanceof UndoManager) {
      o = 'undoManager';
    }

    if (o.clientId && o.clientId !== state.store.clientId) {
      return;
    }

    if (typeof o === 'number') {
      return;
    }

    if (state.store.readOnly) {
      console.log('[bindDoc] readonly', state.store.readOnly);
      return;
    }

    try {
      const snapshot = await push(updatesRef, {
        uid: userId,
        cid: doc.clientID,
        did: doc.guid,
        id: nanoid(8),
        v: version[docType],
        u: fromUint8Array(update),
        s: YSyncState.Pending,
        o,
        t: serverTimestamp(),
      });

      pushCount += 1;

      if (origin !== 'save' && pushCount >= AUTO_SAVE_AFTER) {
        if (!autoSaveTimeoutID) {
          // Save after a random delay from 0 to AUTO_SAVE_MAX_DELAY ms
          // to avoid a problem where many clients create a save at the
          // same time.
          const delayMs = Math.floor(Math.random() * AUTO_SAVE_MAX_DELAY);
          autoSaveTimeoutID = window.setTimeout(() => save(), delayMs);
          // console.debug(`save scheduled ${delayMs}ms from now`, {
          //   delayMs,
          //   count,
          // });
        }
      }

      return snapshot;
    } catch (e) {
      console.error('[bindDoc] failed to push update to firebase', e);
    }

    return;
  }

  function getSharedStore(): SharedStore | undefined {
    return state.store.spaces?.[doc.guid] || state.store.cards[doc.guid];
  }

  async function save() {
    const sharedStore = getSharedStore();

    autoSaveTimeoutID = null;

    // Another client has saved the doc,
    // so we don't need to save again.
    if (pushCount < AUTO_SAVE_AFTER) {
      return;
    }

    pushCount = 0;

    try {
      // console.log('[bindDoc] save', doc.guid, doc.clientID, sharedStore?.linkedDocs);

      const linkedSaves: Record<string, string> = {};
      if (sharedStore) {
        sharedStore.linkedDocs.forEach((linkedDoc) => {
          const u = fromUint8Array(encodeStateAsUpdateV2(linkedDoc));
          linkedSaves[linkedDoc.guid] = u;
        });
      }

      // console.log('[bindDoc] push', doc.guid, doc.clientID);
      const u = encodeStateAsUpdateV2(doc);
      const saveSnapshot = await onDocUpdate(u, 'save');
      if (saveSnapshot?.key) {
        await push(savesRef, {
          fid: saveSnapshot.key,
          did: doc.guid,
          cid: doc.clientID,
          t: serverTimestamp(),
          v: version[docType],
          uid: userId,
          u: fromUint8Array(u),
          l: linkedSaves,
        });
        // console.log('[bindDoc] saved', doc.guid, doc.clientID, snapshot);
      } else {
        console.error('[bindDoc] failed to save', saveSnapshot);
      }
    } catch (e) {
      console.error('[bindDoc] failed to save', e);
    }
  }

  function applyUpdate(snapshot: DataSnapshot) {
    const sharedStore = getSharedStore();

    if (!snapshot.exists()) {
      return;
    }

    const val = snapshot.val();

    if (!isValidFirebaseUpdate(val)) {
      return;
    }

    if (val.cid === doc.clientID) {
      return;
    }

    if (val.o?.clientId === state.store.clientId) {
      return;
    }

    if (val.did !== doc.guid) {
      return;
    }

    if (val.o === 'save') {
      // Reset the count to 0 as another
      // client has saved the doc
      pushCount = 0;
    }

    if (applied.has(val.id)) {
      return;
    }

    // if we have a version and it's newer than
    // the currently supported one, mark the app
    // as readonly and prompt the user to reload
    if (val.v && val.v > version[docType]) {
      state.store.readOnly = true;
      state.store.promptToRefresh = true;
      return;
    } else if (!val.v || (val.v && val.v < version[docType])) {
      shouldRunMigrations = true;
    }

    const update = toUpdate(val);

    // console.log('[bindDoc] apply', doc.guid, doc.clientID);

    applyUpdateV2(doc, update.u, update.cid);

    applied.add(update.id);

    if (isTransactionOrigin(update.o) && sharedStore) {
      sharedStore.appliedTransactions[update.o.clientId] ||= [];
      sharedStore.appliedTransactions[update.o.clientId].push(update.o.txId);
    }

    return;
  }

  function subscribe() {
    const updatesQuery = getUpdatesQuery();
    subs.push(onChildAdded(updatesQuery, applyUpdate));
  }

  function getUpdatesQuery() {
    const constraints = [orderByKey()];
    if (opts.save) constraints.push(startAfter(opts.save.fid));
    return query(updatesRef, ...constraints);
  }

  async function load() {
    // console.log('[bindDoc] load', doc.guid);
    if (opts.save) {
      // console.log('[bindDoc] loaded from save', doc.guid);
      applyUpdateV2(doc, toUint8Array(opts.save.u), opts.save.cid);
    }
    const updatesQuery = getUpdatesQuery();
    const snapshot = await get(updatesQuery);
    snapshot.forEach(applyUpdate);
    runMigrations(state, doc, docType);
    // const meta = doc.getMap('meta').toJSON();
    // console.log(`[bindDoc] loaded ${doc.guid} ${meta.type}–v${meta.version}`);
  }

  doc.on('updateV2', onDocUpdate);

  subs.push(() => {
    doc.off('updateV2', onDocUpdate);
    doc.off('beforeObserverCalls', beforeObserverCalls);
  });

  return {
    load,
    subscribe,
    unsubscribe: () => {
      applied.clear();
      subs.forEach((unsubscribe) => unsubscribe());
      if (autoSaveTimeoutID != null) {
        clearTimeout(autoSaveTimeoutID);
        autoSaveTimeoutID = null;
      }
    },
  };
}
