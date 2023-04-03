import { mutables } from 'state/mutables';
import type { State } from 'state/constants';
import actions from '..';

export const stopFollowing = (state: State) => {
  if (state.currentSpace?.pageState.followingId) {
    // save the last position to mutables if we re-follow and no new data has been received.
    mutables.cameras[state.currentSpace.pageState.followingId] =
      state.currentSpace.pageState.camera;
    state.currentSpace.pageState.followingId = null;
  }
  actions.enter(state, 'idle');
};
