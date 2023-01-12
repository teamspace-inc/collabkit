import React from 'react';
import { useSnapshot } from 'valtio';
import { useApp } from '../hooks/useApp';

export function Debug() {
  const { store } = useApp();
  const { focusedId } = useSnapshot(store);
  return <code>{JSON.stringify(focusedId, null, 2)}</code>;
}
