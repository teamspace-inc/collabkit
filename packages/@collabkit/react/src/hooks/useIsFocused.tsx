import { useTarget } from './useTarget';
import { useStore } from './useStore';
import { useStoreKeyMatches } from './useSubscribeStoreKey';
import equals from 'fast-deep-equal';

export function useIsFocused() {
  const store = useStore();
  const target = useTarget();
  return useStoreKeyMatches(store, 'focusedId', (focusedId) => equals(focusedId, target));
}
