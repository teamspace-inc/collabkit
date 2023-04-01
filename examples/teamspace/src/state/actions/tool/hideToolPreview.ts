import { SpaceStore } from 'state/constants';

export const hideToolPreview = (space: SpaceStore) => {
  space.pageState.toolPreview = null;
};
