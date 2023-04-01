export type DocId = string;
export type YId = string;
export type ClientId = number;

export type YUpdateBase = {
  uid: string;
  cid: ClientId;
  did: DocId;
  id: string;
  s: YSyncState;
  o: any;
};

export type YUpdate = YUpdateBase & {
  u: Uint8Array;
};

export type YFirebaseUpdate = YUpdateBase & {
  u: string;
};

export type YSyncedFirebaseUpdate = YUpdate & {
  fid: string;
  s: YSyncState.Synced;
};

export enum YSyncState {
  Pending = 1, // in-memory
  Synced = 2, // firebase
  SavedLocally = 3, // idb
}

export type TransactionOrigin = {
  clientId: string;
  txId: number;
};
