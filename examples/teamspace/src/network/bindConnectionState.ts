import { getDatabase, onValue, ref } from 'firebase/database';

import { ConnectionState } from 'state/constants';

export function bindConnectionState(store: { connectionState: ConnectionState }) {
  const connectedRef = ref(getDatabase(), '.info/connected');
  let timeoutID: number | null = null;
  const unsubscribe = onValue(connectedRef, (snapshot) => {
    if (snapshot.val() === true) {
      store.connectionState = 'online';
    } else if (store.connectionState === 'online') {
      store.connectionState = 'offline';
    } else if (store.connectionState === 'new') {
      // if we remain in the new state for a while and it's
      // not changing we're probably offline
      timeoutID = window.setTimeout(() => {
        if (store.connectionState === 'new') {
          store.connectionState = 'offline';
        }
      }, 10000);
    }
  });

  return () => {
    unsubscribe();
    if (timeoutID) clearTimeout(timeoutID);
  };
}
