import type { State, TextCardTarget } from 'state/constants';
import { shapeTargetToCardTarget, getSelectedCard, getSelectedShape } from 'state/helpers';
import actions from '..';

export const enterFocusMode = (state: State, info: { target?: TextCardTarget }) => {
  if (!state.currentSpace) {
    console.warn('[enterFocusMode] no current space');
    return;
  }

  let card;
  if (info.target) {
    card = info.target;
  } else {
    // if we have a selected card use that
    card = getSelectedCard(state);

    // otherwise look for a shape, that is for a card
    if (!card) {
      const shape = getSelectedShape(state);
      card = shapeTargetToCardTarget(state, shape);
    }
  }

  if (card) {
    // clear selection so keystrokes can't affect
    // the card on the canvas by mistake
    state.store.editing.selectedIds = [];

    state.store.focusModeId = card;
    actions.startEditing(state, {
      target: card,
      editorContext: { target: { type: 'pane', id: 'pane' } },
    });
  }
};
