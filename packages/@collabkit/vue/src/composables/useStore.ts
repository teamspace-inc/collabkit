import type { Events } from '@collabkit/client';
import type { Store } from '@collabkit/core';
import { inject } from 'vue';
import { StoreKey } from '../constants';

export function useStore(): Store {
  const value = inject<{
    store: Store;
    events: Events;
  }>(StoreKey);
  if (value == null) {
    throw new Error('CollabKit store not found. Missing <Provider />?');
  }
  return value.store;
}
