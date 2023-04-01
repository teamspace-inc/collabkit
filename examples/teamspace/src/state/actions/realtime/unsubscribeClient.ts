import { State } from 'state/constants';
import { mutables } from 'state/mutables';

export async function unsubscribeClient(state: State, info: { clientId: string }) {
  if (!state.currentSpace) {
    return;
  }

  if (info.clientId === state.store.clientId) {
    return;
  }

  const unsubscribe = state.currentSpace.subs[info.clientId];
  if (unsubscribe) {
    unsubscribe();
    delete state.currentSpace.subs[info.clientId];
    delete state.currentSpace.realtime[info.clientId];
    delete mutables.cameras[info.clientId];
  }
}
