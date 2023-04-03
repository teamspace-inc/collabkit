import type { StateWithSpace } from 'state/constants';
import { applyCamera } from 'state/helpers';
import actions from '..';

export const startFollowing = (state: StateWithSpace, clientId: string) => {
  state.currentSpace.pageState.followingId = clientId;
  applyCamera(state.currentSpace, clientId);
  actions.enter(state, 'following');
};
