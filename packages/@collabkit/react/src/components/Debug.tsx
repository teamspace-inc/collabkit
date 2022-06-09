import { useSnapshot } from 'valtio';
import { store } from '../store';

export function Debug() {
  const { appState, uiState } = useSnapshot(store);
  return (
    <div>
      {appState} - {uiState}
    </div>
  );
}
