export type YUpdateBase = {
  uid: string; // userId
  cid: number; // clientId
  did: string; // docId

  id: string;
  s: YSyncState;
  o: any; // origin

  v?: number;
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
  Pending = 1,
  Synced = 2,
  SavedLocally = 3,
}

export type TransactionOrigin = {
  clientId: string;
  txId: number;
};

export type Save = {
  id: string;

  fid: string;
  cid: number;
  uid: string;
  did: string;
  u: string;

  l?: Record<string, string>;
};
