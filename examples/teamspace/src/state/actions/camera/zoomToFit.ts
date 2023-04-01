import { FIT_TO_SCREEN_PADDING, State } from 'state/constants';
import { Utils } from '@tldraw/core';
import Vec from '@tldraw/vec';
import { mutables } from 'state/mutables';
import { getBounds } from '../../../shapes';
import { getVisibleItems, itemToShape } from 'state/helpers';

export const zoomToFit = (state: State, info?: { maxZoom?: number }) => {
  const space = state.currentSpace;

  if (space == null) {
    return;
  }

  const { camera } = space.pageState;
  const { rendererBounds } = mutables;

  const items = getVisibleItems(space);

  if (items.length === 0) return;

  const commonBounds = Utils.getCommonBounds(
    items.map((item) => getBounds(itemToShape(space.sizes, item)))
  );

  let zoom = Math.min(
    (rendererBounds.width - FIT_TO_SCREEN_PADDING) / commonBounds.width,
    (rendererBounds.height - FIT_TO_SCREEN_PADDING) / commonBounds.height
  );

  if (info?.maxZoom != null && zoom > info.maxZoom) {
    zoom = info.maxZoom;
  }

  zoom = camera.zoom === zoom || camera.zoom < 1 ? Math.min(1, zoom) : zoom;

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
