import { State } from 'state/constants';

export const redo = (state: State) => {
  if (state.currentSpace?.undoManager && state.currentSpace?.undoManager.canRedo()) {
    state.currentSpace.undoManager.redo();
  }
};
