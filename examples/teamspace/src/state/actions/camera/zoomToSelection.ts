import { FIT_TO_SCREEN_PADDING, StateWithSpace } from 'state/constants';
import { Utils } from '@tldraw/core';
import { mutables } from 'state/mutables';
import { getBounds } from '../../../shapes';
import Vec from '@tldraw/vec';
import { getVisibleItems, itemToShape } from 'state/helpers';

export const zoomToSelection = (state: StateWithSpace, options?: { maxZoom: number }) => {
  if (!state.currentSpace) {
    console.warn('[zoomToSelection] not in a space');
    return;
  }

  const { sizes } = state.currentSpace;
  const { camera } = state.currentSpace.pageState;
  const { selectedIds } = state.store.editing;
  const { rendererBounds } = mutables;

  if (selectedIds.length === 0) return;

  const selectedItems = getVisibleItems(state.currentSpace).filter((item) =>
    selectedIds.find((target) =>
      item.type === 'card' ? target.id === item.docId : target.id === item.id
    )
  );

  if (selectedItems.length === 0) return;

  const commonBounds = Utils.getCommonBounds(
    selectedItems
      .map(
        (item) => item && sizes[item.id] && getBounds(itemToShape(state.currentSpace.sizes, item))
      )
      .filter((bounds) => !!bounds)
  );

  let zoom = Math.min(
    (rendererBounds.width - FIT_TO_SCREEN_PADDING) / commonBounds.width,
    (rendererBounds.height - FIT_TO_SCREEN_PADDING) / commonBounds.height
  );

  zoom = camera.zoom === zoom || camera.zoom < 1 ? Math.min(1, zoom) : zoom;

  zoom = options?.maxZoom ? Math.min(options.maxZoom, zoom) : zoom;

  const delta = [
    (rendererBounds.width - commonBounds.width * zoom) / 2 / zoom,
    (rendererBounds.height - commonBounds.height * zoom) / 2 / zoom,
  ];

  if (!Number.isFinite(zoom) || zoom <= 0) {
    console.error('zoom is out of range', { zoom });
    return;
  }

  camera.zoom = zoom;
  camera.point = Vec.toFixed(Vec.sub(delta, [commonBounds.minX, commonBounds.minY]));
};
