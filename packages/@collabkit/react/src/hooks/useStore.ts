import { Store } from '@collabkit/core';
import { useApp } from './useApp';

export function useStore(): Store {
  const { store } = useApp();
  return store;
}
