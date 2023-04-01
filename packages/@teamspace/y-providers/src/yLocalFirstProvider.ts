import { YUpdate, YSyncState, YSyncedFirebaseUpdate } from './types';
import { yFirebase } from './yFirebase';
import { yIDB } from './yIDB';
import { YAbstractProvider, YAbstractProviderProps } from './yAbstractProvider';
import { DB } from '.';
import { assert, isValidOrigin, log, debug, TransactionHistory } from './utils';

export function initLocalFirstProvider(props: YAbstractProviderProps) {
  return new YLocalFirstProvider(props);
}

export class YLocalFirstProvider extends YAbstractProvider {
  _isConnected: boolean = false;
  _yFirebase: typeof yFirebase = yFirebase;
  _yIDB: typeof yIDB = yIDB;
  _db?: DB;
  _appliedFirebaseIds = new Set<string>();
  _transactionHistory = new TransactionHistory();

  constructor(props: YAbstractProviderProps) {
    super(props);
  }

  unsubscribe() {
    this._subs.map((_) => _());
  }

  async beforeLoad() {
    this._db = await this._yIDB.open(this.docPath);
    return new Promise((resolve) => {
      this._subs.push(
        this._yFirebase.onConnection((isConnected) => {
          const connect = !this._isConnected && isConnected;
          const disconnect = this._isConnected && !isConnected;
          if (connect) this.onConnect();
          if (disconnect) this.onDisconnect();
          this._isConnected = isConnected;
          resolve(isConnected);
        })
      );
    });
  }

  async retryPendingAndSaved() {
    assert(this._db);
    const updates = await this._yIDB.fetch(this._db);
    const toSync = updates.filter(
      (u) =>
        (u.s === YSyncState.SavedLocally || u.s === YSyncState.Pending) && u.uid === this.userId
    );
    // console.debug('[y.onReconnect toSync]', toSync);
    const results = await Promise.allSettled(toSync.map((u) => yFirebase.push(this.docPath, u)));

    results.forEach((result, i) => {
      const hasPersisted = result.status === 'fulfilled' && result.value;
      if (hasPersisted) {
        const update = toSync[i];
        assert(this._db);
        this._yIDB.update(this._db, update.id, { ...update, s: YSyncState.Synced }, true);
      }
    });
    const allSynced = results.filter((result) => result.status === 'rejected').length === 0;

    // if we had something to sync and we synced it
    if (toSync.length > 0 && allSynced) {
      this.emit('retry-pending-and-saved-success', []);
    }

    log('retryPendingAndFailed', { guid: this.doc.guid, results });
  }

  onConnect() {
    this.emit('connect', []);
    return this.retryPendingAndSaved();
  }

  async onDisconnect() {
    this.emit('disconnect', []);
  }

  // todo make this fetch from idb
  // vs storing yet another var
  getLastId() {
    const lastUpdateKey = `${this.docPath}/${this.userId}/lastUpdateId`;
    return localStorage.getItem(lastUpdateKey) || null;
  }

  setLastId(id: string) {
    const lastUpdateKey = `${this.docPath}/${this.userId}/lastUpdateId`;
    localStorage.removeItem(lastUpdateKey);
    localStorage.setItem(lastUpdateKey, id);
  }

  subscribe(onUpdate: (update: YSyncedFirebaseUpdate) => void) {
    return this._yFirebase.subscribe(this.docPath, this.getLastId(), (update) => {
      onUpdate(update);
      assert(this._db);
      this._yIDB.update(this._db, update.id, { ...update, s: YSyncState.Synced }, true).then(() => {
        this.setLastId(update.fid);
      });
    });
  }

  async fetch() {
    try {
      const updates = new Map<string, YUpdate>();
      assert(this._db);

      const results = await Promise.allSettled([
        this._yIDB.fetch(this._db),
        this._yFirebase.fetch(this.docPath, this.getLastId()),
      ]);

      if (results[0].status === 'fulfilled') {
        results[0].value.forEach((u) => updates.set(u.id, u));
      } else {
        console.error('this.yIDB fetch failed', results[0].reason);
      }

      if (results[1].status === 'fulfilled') {
        results[1].value.forEach((u) => updates.set(u.id, u));
      } else {
        console.error('[y.fetch failed]', results[1].reason);
      }
      return Array.from(updates.values());
    } catch (e) {
      console.error('[y.fetch failed]', e);
      return [];
    }
  }

  getStats(yUpdates: YUpdate[]) {
    const stats = new Map<YSyncState, number>();
    [YSyncState.Pending, YSyncState.Synced, YSyncState.SavedLocally].forEach((state) => {
      const count = yUpdates.filter((u) => u.s === state).length;
      stats.set(state, count);
      return stats;
    });
    return stats;
  }

  async afterCompact(updateId: string) {
    this._appliedFirebaseIds.delete(updateId);
    try {
      const db = this._db;
      if (db) {
        const update = await this._yIDB.get(db, updateId);
        if (update?.iid) {
          return this._yIDB.del(db, IDBKeyRange.upperBound(update.iid, true));
        }
      }
    } catch (e) {
      console.error('[y.afterCompact.failed]', e);
    }

    return Promise.reject();
  }

  deleteLocalData() {
    assert(this._db);
    return this._yIDB.clear(this._db);
  }

  afterApply(yUpdate: YSyncedFirebaseUpdate, didApply: boolean) {
    if (yUpdate.fid && didApply) {
      this._appliedFirebaseIds.add(yUpdate.fid);
    }
    if (isValidOrigin(yUpdate.o)) {
      this._transactionHistory.add(yUpdate.o.clientId, yUpdate.o.txId);
    }
  }

  afterLoad(keyedUpdates: Map<string, YUpdate>) {
    setTimeout(
      () =>
        this.emit('didLoad', [
          this.getStats(Array.from(keyedUpdates.values())).get(YSyncState.Pending),
        ]),
      0
    );
    return this.retryPendingAndSaved();
  }

  async push(yUpdate: YUpdate) {
    debug('push', { guid: this.doc.guid, yUpdate });

    let errors: unknown[] = [];
    let firebase = false;
    try {
      if (this._isConnected) {
        await this._yFirebase.push(this.docPath, yUpdate);
        firebase = true;
      } else {
        debug('[y.push.firebase skip offline]', yUpdate);
      }
    } catch (e) {
      errors.push(e);
      log('[y.push.firebase fail]', e);
    }

    let idb = false;
    try {
      assert(this._db);
      await this._yIDB.update(this._db, yUpdate.id, yUpdate, true);
      idb = true;
    } catch (e) {
      errors.push(e);
      log('[y.push.idb fail]', e);
    }

    let fatal = !firebase && !idb;

    if (fatal) {
      // gotta emit from an async function
      setTimeout(() => this.emit('error', [yUpdate.id, errors]), 0);
      console.error('[y.push fatal IDB & Firebase push failed]', errors);
      return null;
    }

    let sync = firebase && idb;
    let localSync = !firebase && idb;

    let s = YSyncState.Pending;

    if (sync) {
      s = YSyncState.Synced;
    } else if (localSync) {
      s = YSyncState.SavedLocally;
      this.emit('saved', [yUpdate.id]);
    }

    try {
      assert(this._db);
      await this._yIDB.update(this._db, yUpdate.id, { ...yUpdate, s }, true);
    } catch (e) {
      console.error('[y.push failed to update sync state in idb]', e);
    }

    return yUpdate.id;
  }

  hasAppliedTransaction(clientId: string, transactionId: number) {
    return this._transactionHistory.has(clientId, transactionId);
  }
}
