import React, { useEffect, useMemo } from 'react';
import { Target } from '@collabkit/core';
import { useStore } from './useStore';
import { subscribeKey } from 'valtio/utils';
import equals from 'fast-deep-equal';

export function useIsTargetMatch(
  target: Target,
  key: 'hoveringId' | 'viewingId' | 'editingId' | 'focusedId' | 'selectedId'
) {
  const [state, setState] = React.useState<boolean>(false);
  const store = useStore();
  useMemo(() => {
    return subscribeKey(store, key, (value) => {
      setState(equals(value, target));
    });
  }, [target, key, setState, store]);
  return state;
}
