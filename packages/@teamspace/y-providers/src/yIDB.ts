import type { YUpdate, YUpdateBase } from './types';
import { openDB, IDBPDatabase, DBSchema } from 'idb/with-async-ittr';

const _store = 'yUpdates5';

export interface YUpdatesDB extends DBSchema {
  [_store]: {
    value: YIDBUpdate;
    key: string;
    indexes: {
      id: string;
    };
  };
}

export type YIDBUpdate = YUpdateBase & {
  u: Uint8Array;
  iid?: number;
  fid?: string;
};

export type DB = IDBPDatabase<YUpdatesDB>;

const dbs = new Map<string, DB>();

async function open(docPath: string): Promise<DB> {
  let db = dbs.get(docPath);
  if (db) {
    // console.log('db exists');
    return db;
  }

  db = await openDB<YUpdatesDB>(docPath, 4, {
    blocked() {
      console.log('[IDB blocked]');
    },

    terminated() {
      console.log('[IDB terminated]');
    },

    blocking() {
      console.log('[IDB blocking]');
    },

    upgrade(db) {
      // console.log('open db', docPath);
      const store = db.createObjectStore(_store, {
        keyPath: 'iid',
        autoIncrement: true,
      });
      store.createIndex('id', 'id', { unique: true });
    },
  });

  dbs.set(docPath, db);

  return db;
}

async function put(db: DB, props: YUpdate): Promise<string | null> {
  try {
    return db.put(_store, props);
  } catch (e) {
    console.error('put failed', props, e);
  }
  return Promise.reject();
}

async function update(
  db: DB,
  updateId: string,
  props: YUpdate,
  createIfNotExists: boolean = false
): Promise<string | null> {
  try {
    const tx = db.transaction(_store, 'readwrite');
    const store = tx.objectStore(_store);
    const update = await store.index('id').get(updateId);
    let id;
    if (update) {
      let newUpdate = { ...update, ...props };
      id = await store.put(newUpdate);
    } else if (createIfNotExists) {
      id = await store.put(props);
    } else {
      console.error('[yIDB.update] update not found', updateId, props, createIfNotExists);
    }
    await tx.done;
    return id || null;
  } catch (e) {
    console.error('[yIDB.update] failed', e, { updateId, props, createIfNotExists });
  }
  return Promise.resolve(null);
}

async function fetch(db: DB) {
  try {
    const _updates: YIDBUpdate[] = [];
    const tx = db.transaction(_store, 'readonly');
    for await (const cursor of tx.store.iterate()) {
      const update = { ...cursor.value } as YUpdate;
      _updates.push(update);
    }

    await tx.done;
    return _updates;
  } catch (e) {
    console.error('fetch error', e);
  }
  return [];
}

export async function getKeyRange(db: DB, keyRange: IDBKeyRange) {
  return db.getAll(_store, keyRange);
}

async function get(db: DB, updateId: string) {
  return db.getFromIndex(_store, 'id', updateId);
}

function deleteLocalData(db: DB) {
  return db.clear(_store);
}

async function del(db: DB, key: string | IDBKeyRange) {
  return db.delete(_store, key);
}

export const yIDB = {
  put,
  fetch,
  update,
  get,
  del,
  open,
  clear: deleteLocalData,
};

export {};
