import { onValue } from 'firebase/database';
import { ref } from '../sync/firebase/refs';
import type { Store } from '@collabkit/core';
import type { createEvents } from '../events';

export function monitorConnection(store: Store, events: ReturnType<typeof createEvents>) {
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
