import { actions } from '.';
import { Store } from '../constants';

export async function subscribeWorkspace(store: Store, props: { workspaceId: string }) {
  actions.subscribeSeen(store, props);
  actions.subscribePins(store, props);
}
