import React, { useEffect } from 'react';
import type { Store, Target } from '@collabkit/core';
import { subscribeKey } from 'valtio/utils';

export function useStoreKeyMatches(
  store: Store,
  key:
    | 'hoveringId'
    | 'viewingId'
    | 'editingId'
    | 'focusedId'
    | 'selectedId'
    | 'reactingId'
    | 'menuId',
  matchFn: (target: Target | null) => boolean
) {
  const [state, setState] = React.useState<boolean>(false);
  useEffect(() => {
    return subscribeKey(store, key, (value) => {
      setState(matchFn(value));
    });
  }, [key, setState, store]);
  return state;
}
