import { onChildAdded, onChildRemoved } from 'firebase/database';
import { useSpaceEvents } from '../events';
import { ClientState, docRef } from 'realtime';
import { SpaceStore } from 'state/constants';
import { useEffect } from 'react';

function isClientState(o: unknown): o is ClientState {
  return typeof o === 'object' && o != null;
}

/** Calls onClientAdded and onClientRemoved when space **/
export function useClients(store: SpaceStore, docId: string) {
  const { onClientAdded, onClientRemoved } = useSpaceEvents(store);

  useEffect(() => {
    const subs: (() => void)[] = [];
    subs.push(
      onChildAdded(docRef(docId), (snapshot) => {
        const clientId = snapshot.key;
        const clientState = snapshot.val();
        if (isClientState(clientState)) {
          clientId && onClientAdded(clientId, clientState);
        } else {
          console.warn('[realtime invalid client]', clientId, clientState);
        }
      })
    );

    subs.push(
      onChildRemoved(docRef(docId), (snapshot) => {
        const clientId = snapshot.key;
        clientId && onClientRemoved(clientId);
      })
    );

    return () => {
      subs.forEach((sub) => sub());
    };
  }, [docId]);
}
