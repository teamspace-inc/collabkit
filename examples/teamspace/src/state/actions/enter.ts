import type { State, UIState } from '../constants';

import actions from './';

const PLACING_ITEM_UI_STATES: UIState[] = [
  'sticky.idle',
  'sticky.pointing',
  'card.idle',
  'card.pointing',
];

export const enter = (state: State, nextUIState: UIState) => {
  const { store } = state;
  const space = state.currentSpace;

  if (store.uiState === nextUIState) {
    return;
  }

  // if we were placing an item, but now we are doing something else
  // lets hide the tool preview
  if (
    PLACING_ITEM_UI_STATES.includes(store.uiState) &&
    !PLACING_ITEM_UI_STATES.includes(nextUIState) &&
    space
  ) {
    actions.hideToolPreview(space);
  }

  // if we were editing and now are doing something else
  // clear up the editing state, ensures state transitions
  // always work
  if (store.uiState.startsWith('editing') && !nextUIState.startsWith('editing')) {
    actions.stopEditing(state);
  }

  store.uiState = nextUIState;

  switch (nextUIState) {
    case 'idle':
      if (space) {
        space.pageState.tool = 'select';
      }
      break;
  }
};
