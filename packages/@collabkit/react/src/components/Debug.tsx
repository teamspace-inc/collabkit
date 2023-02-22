import React from 'react';
import { useSnapshot } from 'valtio';
import { useStore } from '../hooks/useStore';

export function Debug() {
  const store = useStore();
  const { selectedId } = useSnapshot(store);
  return <code>{JSON.stringify(selectedId, null, 2)}</code>;
}
