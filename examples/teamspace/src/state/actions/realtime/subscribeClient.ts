import { ClientState, onClient } from 'realtime';
import { State, StateWithSpace } from 'state/constants';

export async function subscribeClient(
  state: State,
  info: { clientId: string; clientState: ClientState }
) {
  if (!state.currentSpace) {
    return;
  }

  if (info.clientId === state.store.clientId) {
    return;
  }

  if (state.currentSpace.subs[info.clientId]) {
    return;
  }

  state.currentSpace.realtime[info.clientId] = info.clientState;
  state.currentSpace.subs[info.clientId] = onClient(state as StateWithSpace, info.clientId);
}
