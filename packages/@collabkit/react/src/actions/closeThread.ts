import { Store } from '../constants';

export async function closeThread(store: Store) {
  store.viewingId = null;
}
