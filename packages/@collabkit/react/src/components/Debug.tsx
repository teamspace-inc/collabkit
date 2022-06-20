import { useSnapshot } from 'valtio';
import { store } from '../store';

export function Debug() {
  const { appState, uiState } = useSnapshot(store);
  return (
    <code style={{ fontSize: 14 }}>
      {appState} - {uiState}
    </code>
  );
}
