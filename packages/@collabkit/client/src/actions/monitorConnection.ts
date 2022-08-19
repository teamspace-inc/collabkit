import { ref, onValue, getDatabase } from 'firebase/database';
import type { Store } from '@collabkit/core';
import { createEvents } from '../events';
import { getApp } from 'firebase/app';

export function monitorConnection(store: Store, events: ReturnType<typeof createEvents>) {
  if (store.subs['connectionState']) {
    return;
  }
  const connectedRef = ref(getDatabase(getApp('CollabKit')), '.info/connected');
  store.subs['connectionState'] = onValue(connectedRef, (snapshot) => {
    if (!store.isConnected && snapshot.val()) {
      events.onConnectionStateChange(snapshot.val());
    }
  });
}
