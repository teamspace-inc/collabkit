import type { Store } from '@collabkit/core';
import { inject } from 'vue';
import { storeKey } from '../constants';

export function useCollabKitStore(): Store {
  const store = inject<Store>(storeKey);
  if (!store) {
    throw new Error('No CollabKit store found');
  }
  return store;
}
