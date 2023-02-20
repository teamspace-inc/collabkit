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
    | 'previewingId'
    | 'composerId'
    | 'menuId',
  matchFn: (target: Target | null) => boolean
) {
  const matchFnRef = React.useRef<typeof matchFn>(matchFn);
  const [state, setState] = React.useState<boolean>(() => matchFnRef.current(store[key]));
  useEffect(() => {
    return subscribeKey(store, key, (value) => {
      setState(matchFnRef.current(value));
    });
  }, [key, setState, store]);
  return state;
}
