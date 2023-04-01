import type { ColorTarget, State } from 'state/constants';
import { getItemForTarget } from 'state/helpers';
import actions from '..';

export const setCardColor = (state: State, info: { target: ColorTarget }) => {
  const space = state.currentSpace;
  if (!space) {
    return;
  }
  const { editingId } = state.store.editing;

  if (!editingId) {
    return;
  }

  const item = getItemForTarget(space.items, editingId);
  if (!item || item.type !== 'card') {
    return;
  }

  item.color = info.target.id;

  if (state.store.uiState === 'editing.toolbar.colorPicker.showing') {
    actions.enter(state, 'editing');
  }
};
