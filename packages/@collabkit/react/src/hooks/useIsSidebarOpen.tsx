import { useSnapshot } from 'valtio';
import { useStore } from '../hooks/useStore';

export function useIsSidebarOpen() {
  const store = useStore();
  const { isSidebarOpen } = useSnapshot(store);
  return isSidebarOpen;
}
