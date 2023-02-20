import React, { useCallback, useEffect } from 'react';
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
    | 'previewingId'
    | 'composerId'
    | 'menuId',
  matchFn: (target: Target | null) => boolean
) {
  const [state, setState] = React.useState<boolean>(() => matchFn(store[key]));
  const match = useCallback(
    (value: Target | null) => {
      setState(matchFn(value));
    },
    [matchFn, setState]
  );

  useEffect(() => {
    return subscribeKey(store, key, match);
  }, [key, setState, store, match]);
  return state;
}
