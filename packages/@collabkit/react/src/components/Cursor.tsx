import { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { useApp } from './useApp';

export function Cursor() {
  const { store } = useApp();
  const { uiState } = useSnapshot(store);
  useEffect(() => {
    if (uiState === 'idle') {
      document.body.style.cursor = 'auto';
    } else if (uiState === 'selecting') {
      document.body.style.cursor = 'crosshair';
    } else {
      document.body.style.cursor = 'auto';
    }
  }, [uiState]);
  return null;
}
