import { getDatabase, onValue, ref } from '@firebase/database';
import { useEffect } from 'react';
import { useAppEvents } from '../events';
import { useSpaceContext } from './useSpaceContext';

export function useNetworkConnection() {
  const { store: space } = useSpaceContext();
  const { onNetworkConnect, onNetworkDisconnect } = useAppEvents();
  useEffect(() => {
    const db = getDatabase();
    const connectedRef = ref(db, '.info/connected');
    return onValue(connectedRef, async (snap) => {
      if (snap.val() === true) {
        onNetworkConnect();
      } else {
        onNetworkDisconnect();
      }
    });
  }, [space.docId]);
}
