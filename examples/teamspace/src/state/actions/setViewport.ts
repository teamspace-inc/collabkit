import { TLBounds, Utils } from '@tldraw/core';
import Vec from '@tldraw/vec';
import { getBounds } from '../../shapes';
import type { State } from 'state/constants';
import { getVisibleItems, itemToShape } from 'state/helpers';
import { mutables } from 'state/mutables';
import actions from '.';

function isInViewport(viewport: typeof mutables['viewport'], bounds: TLBounds) {
  return Utils.boundsContain(viewport, bounds) || Utils.boundsCollide(viewport, bounds);
}

export const setViewport = (state: State, payload: { bounds: TLBounds }) => {
  const space = state.currentSpace;

  if (!space) {
    console.warn('[setViewport] blank space');
    return;
  }

  const { camera } = space.pageState;
  const { width, height } = payload.bounds;

  const [minX, minY] = Vec.sub(Vec.div([0, 0], camera.zoom), camera.point);
  const [maxX, maxY] = Vec.sub(Vec.div([width, height], camera.zoom), camera.point);

  mutables.rendererBounds = { ...payload.bounds };

  mutables.viewport = {
    minX,
    minY,
    maxX,
    maxY,
    height: maxX - minX,
    width: maxY - minY,
  };

  let numShapesInViewport = 0;

  const visibleItems = getVisibleItems(space);

  for (const itemId in visibleItems) {
    if (isInViewport(mutables.viewport, getBounds(itemToShape(space.sizes, visibleItems[itemId]))))
      numShapesInViewport++;
  }

  if (numShapesInViewport === 0 && Object.keys(visibleItems).length > 0) {
    actions.zoomToFit(state, { maxZoom: 1 });
  }
};
