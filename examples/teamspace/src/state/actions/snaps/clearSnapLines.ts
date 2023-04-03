import type { SpaceStore } from 'state/constants';

export const clearSnapLines = (space: SpaceStore) => {
  space.overlays.snapLines = [];
};
