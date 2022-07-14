import React from 'react';
import { useSnapshot } from 'valtio';
import { useApp } from './useApp';

export function Debug() {
  const { store } = useApp();
  if (store == null) {
    return null;
  }
  const { appState, uiState } = useSnapshot(store);
  return (
    <code style={{ fontSize: 14 }}>
      {appState} - {uiState}
    </code>
  );
}
