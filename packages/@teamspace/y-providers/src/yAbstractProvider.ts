import * as Y from 'yjs';
import { Observable } from 'lib0/observable';
import { YUpdate, YSyncState } from './types';
import { nanoid } from 'nanoid';
import { log, debug } from './utils';

type Unsubscribe = () => void;

export type YAbstractProviderProps = {
  path: string;
  doc: Y.Doc;
  userId: string;
};

const AUTO_SAVE_AFTER = 20;
const AUTO_SAVE_MAX_DELAY = 10_000;

export abstract class YAbstractProvider extends Observable<string> {
  path: string;
  userId: string;
  doc: Y.Doc;
  docPath: string;
  _synced: boolean = false;
  _unsavedUpdateCount: number = 0;
  _compactTimeoutId: number | null = null;

  onDocUpdate: (update: Uint8Array, transactionOrigin: any, transaction: Y.Transaction) => void =
    () => {};

  unsub = () => {};

  _subs: (() => void)[] = [];

  constructor(props: YAbstractProviderProps) {
    super();
    this.path = props.path;
    this.doc = props.doc;
    this.userId = props.userId;
    this.docPath = `${this.path}/${this.doc.guid}`;
    if (!props.doc.guid) {
      throw new Error('doc (Y.Doc) has no guid');
    }
  }

  unsubscribe() {
    this._subs.map((_) => _());
  }

  async load() {
    log('load', { guid: this.doc.guid });
    this.unsubscribe();
    await this.beforeLoad();
    this.onDocUpdate = this.handleDocUpdate.bind(this);
    this.doc.on('updateV2', this.onDocUpdate);
    this._subs.push(() => {
      this.doc.off('updateV2', this.onDocUpdate);
    });
    let didLoad = false;
    let keyedUpdates = new Map<string, YUpdate>();
    try {
      keyedUpdates = await this.loadUpdates();
      didLoad = true;
    } catch (e) {
      console.error('[y.loadUpdates error]', e);
    }
    this.synced = true;
    this._subs.push(this.subscribe((u) => this.applyUpdate(u)));
    if (didLoad) {
      await this.afterLoad(keyedUpdates);
    }
  }

  async loadUpdates() {
    log('loadUpdates', { guid: this.doc.guid });
    let keyedUpdates = new Map<string, YUpdate>();
    const updates = await this.fetch();
    // console.log(this.userId, updates);
    updates.forEach((u) => this.applyUpdate(u));
    updates.forEach((u) => keyedUpdates.set(u.id, u));
    return keyedUpdates;
  }

  applyUpdate(update: YUpdate) {
    debug('applyUpdate', { guid: this.doc.guid, update });
    let didApply = false;
    const cid = update.cid;
    const isSameDoc = update.did === this.doc.guid;
    const isForeignClient = cid !== this.doc.clientID;
    if (isForeignClient && isSameDoc && this.shouldApply(update)) {
      // console.debug('[y.apply]', this.doc.guid, update.id, cid);
      try {
        Y.applyUpdateV2(this.doc, update.u, cid);
        // console.log(this.doc.guid, this.userId, this.doc.getMap('foo').toJSON());
        // console.debug('[y.apply.✔]', this.doc.guid, update.id, cid);
        didApply = true;
      } catch (e) {
        console.error('[y.apply.error]', e);
      }
    }
    this.afterApply(update, didApply);
    if (update.o === 'save') {
      this._unsavedUpdateCount = 0;
    } else {
      this._unsavedUpdateCount += 1;
    }
    if (this._unsavedUpdateCount > AUTO_SAVE_AFTER) {
      this.compact();
    }
    return didApply;
  }

  get synced() {
    return this._synced;
  }

  set synced(state) {
    log(state ? 'synced' : 'not synced', { guid: this.doc.guid, synced: state });
    // console.debug('[y.synced]', this.doc.guid, state);
    if (this._synced !== state) {
      this._synced = state;
      this.emit('synced', [state]);
      this.emit('sync', [state]);
    }
  }

  handleDocUpdate(update: Uint8Array, transactionOrigin: any, _transaction?: Y.Transaction) {
    let origin = transactionOrigin;

    if (typeof transactionOrigin === 'function') {
      origin = transactionOrigin();
    }

    if (transactionOrigin instanceof Y.UndoManager) {
      origin = 'undoManager';
    }

    if (this.shouldPush(origin)) {
      const yUpdate: YUpdate = {
        id: nanoid(8),
        u: update,
        uid: this.userId,
        cid: this.doc.clientID,
        did: this.doc.guid,
        s: YSyncState.Pending,
        o: origin,
      };
      return this.push(yUpdate);
    }
    return Promise.resolve();
  }

  destroy() {
    log('destroy', { guid: this.doc.guid });
    if (this._compactTimeoutId != null) {
      clearTimeout(this._compactTimeoutId);
      this._compactTimeoutId = null;
    }
    this.unsubscribe();
    super.destroy();
  }

  compact() {
    if (!this._compactTimeoutId) {
      // Compact after a random delay from 0 to AUTO_SAVE_MAX_DELAY ms to avoid a
      // problem where many clients create a save at the same time.
      const delayMs = Math.floor(Math.random() * AUTO_SAVE_MAX_DELAY);
      this._compactTimeoutId = setTimeout(() => this._compact(), delayMs);
      log(`compaction scheduled ${delayMs}ms from now`, {
        delayMs,
        unsavedUpdateCount: this._unsavedUpdateCount,
      });
    }
  }

  async _compact() {
    this._compactTimeoutId = null;
    if (!this.synced) {
      console.warn('[y.compact] called on an unsynced document');
      return;
    }
    if (this._unsavedUpdateCount <= AUTO_SAVE_AFTER) {
      // Number of unsaved updates is no longer above threshold,
      // probably because another client saved them already.
      log('compaction cancelled', { count: this._unsavedUpdateCount });
      return;
    }
    log('compact', { guid: this.doc.guid });
    const save = Y.encodeStateAsUpdateV2(this.doc);
    const updateId = await this.handleDocUpdate(save, 'save');
    if (updateId && typeof updateId === 'string') {
      await this.afterCompact(updateId);
    }

    return save;
  }

  shouldApply(yUpdate: YUpdate): boolean {
    return true;
  }

  shouldPush(origin: any) {
    // if (typeof origin === undefined || origin === null) {
    //   console.warn(
    //     'origin was blank, you might want to set origin to ensure updates are synced',
    //     origin
    //   );
    // }
    return origin && typeof origin !== 'number' && origin !== this && origin !== 'undo';
  }

  abstract afterApply(update: YUpdate, didApply: boolean): void;

  abstract afterCompact(key: string): Promise<any>;

  abstract beforeLoad(): Promise<any>;

  abstract subscribe(onUpdate: (update: YUpdate) => void): Unsubscribe;

  abstract fetch(): Promise<YUpdate[]>;

  abstract deleteLocalData(): Promise<any>;

  abstract push(yUpdate: YUpdate): Promise<string | null>;

  abstract afterLoad(keyedUpdates: Map<string, YUpdate>): Promise<void>;
}
