import { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { useApp } from '../hooks/useApp';

export function Cursor() {
  const { store } = useApp();
  const { uiState } = useSnapshot(store);
  useEffect(() => {
    if (uiState === 'selecting') {
      // This will be overriden by the Commentable component.
      document.body.style.cursor = 'not-allowed';
    } else {
      document.body.style.cursor = 'auto';
    }
  }, [uiState]);
  return null;
}
