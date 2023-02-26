import React from 'react';
import { useSnapshot } from 'valtio';
import { useStore } from '../hooks/useStore';

export function Debug() {
  const store = useStore();
  const { selectedId, composerId, focusedId } = useSnapshot(store);
  return (
    <code>
      {JSON.stringify(selectedId?.type, null, 2)}
      {JSON.stringify(composerId?.type, null, 2)}
      {JSON.stringify(focusedId?.type, null, 2)}
    </code>
  );
}
