import React, { useCallback, useEffect } from 'react';
import type { Store, Target } from '@collabkit/core';
import { subscribeKey } from 'valtio/utils';
import { useCallbackRef } from '@radix-ui/react-use-callback-ref';

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
  const match = useCallbackRef(matchFn);
  useEffect(() => {
    return subscribeKey(store, key, (value: Target | null) => {
      setState(match(value));
    });
  }, [key, store, match]);
  return state;
}
