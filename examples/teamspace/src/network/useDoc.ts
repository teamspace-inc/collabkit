import { useEffect } from 'react';
import { Doc } from 'yjs';
import { ref, useSnapshot } from 'valtio';
import { SpaceStore } from 'state/constants';
import { useAppContext } from '../hooks/useAppContext';
import { loadSpace } from './loadSpace';

export default function useDoc(currentSpace: SpaceStore) {
  const { store } = useAppContext();
  const { clientId } = useSnapshot(store);

  function transactionOrigin() {
    return currentSpace.transactionId != null
      ? { clientId, txId: currentSpace.transactionId }
      : { clientId };
  }

  useEffect(() => {
    const doc = new Doc({ guid: currentSpace.docId });
    currentSpace.doc = ref(doc);
    loadSpace(doc, { store, currentSpace }, transactionOrigin).catch((e) =>
      console.error('[useDoc] error loading doc', e)
    );

    return () => {
      currentSpace.undoManager?.destroy();
      doc.destroy();
      currentSpace.doc = null;
    };
  }, [clientId, store, currentSpace]);
}
