import * as Y from 'yjs';

import type { YUpdate } from './types';
import { DB, yIDB } from './yIDB';
import { YAbstractProvider } from './yAbstractProvider';
import { assert } from './utils';

type YIDBProviderProps = {
  path: string;
  doc: Y.Doc;
  userId: string;
};

export function initYIDB(props: YIDBProviderProps) {
  return new YIDBProvider(props);
}

export class YIDBProvider extends YAbstractProvider {
  _db?: DB;

  afterCompact(key: string): Promise<any> {
    assert(this._db);
    return yIDB.del(this._db, IDBKeyRange.upperBound(key, true));
  }

  async beforeLoad() {
    this._db = await yIDB.open(this.docPath);
  }

  afterApply() {
    return;
  }

  subscribe() {
    return () => {};
  }

  fetch() {
    assert(this._db);
    return yIDB.fetch(this._db);
  }

  push(yUpdate: YUpdate) {
    assert(this._db);
    return yIDB.update(this._db, yUpdate.id, yUpdate, true);
  }

  deleteLocalData() {
    assert(this._db);
    return yIDB.clear(this._db);
  }

  afterLoad() {
    return Promise.resolve();
  }

  constructor(props: YIDBProviderProps) {
    super(props);
  }
}
