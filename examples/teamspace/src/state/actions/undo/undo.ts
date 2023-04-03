import { State } from 'state/constants';

export const undo = (state: State) => {
  if (state.currentSpace?.undoManager && state.currentSpace.undoManager.canUndo()) {
    state.currentSpace.undoManager.undo();
  }
};
