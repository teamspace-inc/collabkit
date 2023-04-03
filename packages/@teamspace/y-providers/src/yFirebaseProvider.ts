import * as Y from 'yjs';
import type { YSyncedFirebaseUpdate, YUpdate } from './types';
import { yFirebase } from './yFirebase';
import { YAbstractProvider, YAbstractProviderProps } from './yAbstractProvider';
import { isValidOrigin, TransactionHistory } from './utils';

type YFirebaseProviderProps = {
  path: string;
  doc: Y.Doc;
  userId: string;
};

export function initYFirebase(props: YFirebaseProviderProps) {
  return new YFirebaseProvider(props);
}

export class YFirebaseProvider extends YAbstractProvider {
  _appliedFirebaseIds = new Set<string>();
  _transactionHistory = new TransactionHistory();
  _yFirebase: typeof yFirebase = yFirebase;
  _isConnected: boolean = false;

  afterCompact(key: string): Promise<any> {
    return Promise.resolve();
  }

  onConnect() {
    this.emit('connect', []);
  }

  async onDisconnect() {
    this.emit('disconnect', []);
  }

  async beforeLoad() {
    return new Promise((resolve, reject) => {
      try {
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
      } catch (e) {
        console.error('[y.beforeLoad] error', e);
        reject();
      }
    });
  }

  afterApply(yUpdate: YSyncedFirebaseUpdate, didApply: boolean) {
    if (didApply && yUpdate.fid) {
      this._appliedFirebaseIds.add(yUpdate.fid);
    }
    if (isValidOrigin(yUpdate.o)) {
      this._transactionHistory.add(yUpdate.o.clientId, yUpdate.o.txId);
    }
  }

  deleteLocalData() {
    return Promise.resolve();
  }

  subscribe(onUpdate: (update: YUpdate) => void) {
    return this._yFirebase.subscribe(this.docPath, null, onUpdate);
  }

  fetch() {
    return this._yFirebase.fetch(this.docPath, null);
  }

  push(yUpdate: YUpdate) {
    // console.log('p', this.userId, this.doc.getMap('foo').toJSON());
    return this._yFirebase.push(this.docPath, yUpdate);
  }

  afterLoad() {
    return Promise.resolve();
  }

  hasAppliedTransaction(clientId: string, transactionId: number) {
    return this._transactionHistory.has(clientId, transactionId);
  }

  constructor(props: YAbstractProviderProps) {
    super(props);
  }
}
