import { actions } from '.';
import { Store } from '../constants';

export async function subscribeWorkspace(store: Store) {
  actions.subscribeSeen(store);
  actions.subscribePins(store);
}
