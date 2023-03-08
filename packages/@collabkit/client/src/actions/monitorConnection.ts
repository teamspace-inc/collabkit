import { onValue } from 'firebase/database';
import { ref } from '../sync/firebase/refs';
import type { Store } from '@collabkit/core';

export function monitorConnection(
  store: Store,
  events: { onConnectionStateChange: (isConnected: boolean) => void }
) {
  if (store.subs['connectionState']) {
    return;
  }
  const connectedRef = ref`.info/connected`;
  store.subs['connectionState'] = onValue(connectedRef, (snapshot) => {
    if (!store.isConnected && snapshot.val()) {
      events.onConnectionStateChange(snapshot.val());
    }
  });
}
