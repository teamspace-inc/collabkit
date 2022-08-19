import { ref, onValue } from 'firebase/database';
import type { Store } from '@collabkit/core';
import { DB } from '../sync/firebase/setup';
import { createEvents } from '../events';

export function monitorConnection(store: Store, events: ReturnType<typeof createEvents>) {
  if (store.subs['connectionState']) {
    return;
  }
  const connectedRef = ref(DB, '.info/connected');
  store.subs['connectionState'] = onValue(connectedRef, (snapshot) => {
    if (!store.isConnected && snapshot.val()) {
      events.onConnectionStateChange(snapshot.val());
    }
  });
}
