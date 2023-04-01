import { SpaceStore } from 'state/constants';

type CancelPayload = {
  clientId: string;
  transactionId: number;
};

export function cancelRealtimeTransaction(store: SpaceStore, payload: CancelPayload) {
  const { clientId, transactionId } = payload;
  if (!store.realtime[clientId]) {
    console.warn('[cancelRealtimeTransaction] ignoring unknown clientId', payload);
  }
  if (store.realtime[clientId].drag?.[2] === transactionId) {
    delete store.realtime[clientId].drag;
  }
  if (store.realtime[clientId].resize?.[3] === transactionId) {
    delete store.realtime[clientId].resize;
  }
}
