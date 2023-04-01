import { remove } from 'firebase/database';
import { clientRef, realtimeRef } from 'realtime';
import { State } from 'state/constants';

export async function unregisterClient(state: State) {
  if (!state.currentSpace) {
    return;
  }

  await remove(realtimeRef(state.currentSpace.docId, state.store.clientId));
  await remove(clientRef(state.store.clientId));
}
