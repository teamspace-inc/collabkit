import type { SpaceStore } from 'state/constants';
import { zoomTo } from '.';

export const resetZoom = (data: SpaceStore) => {
  zoomTo(data, 100);
};
