import { Store } from '../constants';

export async function closeThread(store: Store) {
  store.openId = null;
  store.point = null;
}
