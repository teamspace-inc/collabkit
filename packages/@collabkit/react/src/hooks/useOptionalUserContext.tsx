import { useSnapshot } from 'valtio';
import { useStore } from './useStore';

export function useOptionalUserContext() {
  return useSnapshot(useStore()).userId;
}
