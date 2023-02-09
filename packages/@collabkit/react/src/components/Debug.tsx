import React from 'react';
import { useSnapshot } from 'valtio';
import { useStore } from '../hooks/useStore';

export function Debug() {
  const store = useStore();
  const { focusedId } = useSnapshot(store);
  return <code>{JSON.stringify(focusedId, null, 2)}</code>;
}
