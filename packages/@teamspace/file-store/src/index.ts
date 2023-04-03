import { openDB, DBSchema, IDBPDatabase } from 'idb/with-async-ittr';

const _store = 'file-store5';

export type FileStoreDB = IDBPDatabase<FileStore>;

interface FileStore extends DBSchema {
  [_store]: {
    value: {
      itemId: string;
      blob: Blob;
    };
    key: string;
    indexes: {
      itemId: string;
    };
  };
}

export async function open() {
  const db = await openDB<FileStore>(_store, 2, {
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
        keyPath: 'id',

        autoIncrement: true,
      });
      store.createIndex('itemId', 'itemId', { unique: true });
    },
  });
  return db;
}

export function put(db: FileStoreDB, props: { blob: Blob; itemId: string }): Promise<unknown> {
  return db.put(_store, { itemId: props.itemId, blob: props.blob });
}

export function get(db: FileStoreDB, key: string) {
  return db.getFromIndex(_store, 'itemId', key);
}
