import { useEffect, useState } from 'react';
import { SpaceData, SpaceStore } from 'state/constants';
import { snapshot, subscribe } from 'valtio/vanilla';

export function useSpaceStoreSubscription(store: SpaceStore): SpaceData {
  const [data, setData] = useState<SpaceData>(snapshot(store));

  useEffect(() => {
    return subscribe(store, (ops) => {
      if (ops.length === 1 && ops[0][0] === 'set' && ops[0][1][0] === 'cursor') {
        // Ignore update if nothing else changed but the mouse cursor.
        return;
      }
      setData(snapshot(store));
    });
  }, [store]);

  return data;
}
