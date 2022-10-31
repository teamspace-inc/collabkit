import { useSnapshot } from 'valtio';
import { useApp } from './useApp';

export function useIsSignedIn() {
  const { store } = useApp();
  const { isSignedIn } = useSnapshot(store);
  return isSignedIn;
}
