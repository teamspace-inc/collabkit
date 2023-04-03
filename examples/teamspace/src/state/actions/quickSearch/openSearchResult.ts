import type { State } from 'state/constants';
import { mutables } from 'state/mutables';
import actions from '..';

export const openSearchResult = (state: State) => {
  const { search } = state.store;

  if (!search.selectedId) {
    return;
  }

  if (state.store.focusModeId) {
    actions.exitFocusMode(state);
  }

  state.store.editing.selectedIds = [search.selectedId];
  actions.hideSearch(state);

  if (state.currentSpace) {
    state.currentSpace.pageState.camera.animate = true;
    actions.zoomToSelection({ ...state, currentSpace: state.currentSpace }, { maxZoom: 1 });
    if (mutables.animateCameraTimeoutId) {
      window.clearTimeout(mutables.animateCameraTimeoutId);
    }
    mutables.animateCameraTimeoutId = window.setTimeout(() => {
      delete state.currentSpace?.pageState.camera.animate;
    }, 600);
  }
};
