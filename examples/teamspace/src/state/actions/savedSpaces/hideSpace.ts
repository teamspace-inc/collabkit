import type { SpaceTarget, State } from 'state/constants';
import { nanoid } from '../../../utils/nanoid';

export const hideSpace = (state: State, info: { target: SpaceTarget }) => {
  const { store, currentSpace } = state;
  const index = store.savedSpaces.findIndex(({ id }) => id === info.target.id);

  if (index !== -1) {
    store.savedSpaces.splice(index, 1);
  }

  // If this space was currently open, switch to another space.
  if (currentSpace && info.target.id === currentSpace.docId) {
    const nextSpace = store.savedSpaces[0];
    if (nextSpace) {
      history.pushState(null, '', `/${nextSpace.id}`);
    } else {
      // No spaces left, create a new space.
      history.pushState(null, '', `/${nanoid()}`);
    }
  }
};
