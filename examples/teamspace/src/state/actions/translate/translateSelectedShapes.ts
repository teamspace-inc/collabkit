import { TLPointerInfo, TLSnapLine, Utils } from '@tldraw/core';
import Vec from '@tldraw/vec';

import { SNAP_DISTANCE, StateWithSpace } from 'state/constants';
import { getPagePoint } from 'state/helpers';
import { mutables } from 'state/mutables';
import { DragProps } from 'realtime';

export const translateSelectedShapes = (state: StateWithSpace, payload: TLPointerInfo) => {
  const { initialPoint, viewport, snapInfo } = mutables;

  if (!state.currentSpace.transactionId) {
    throw new Error('[translateSelectedShapes] no transactionId set');
  }

  let delta = Vec.sub(getPagePoint(payload.point, state.currentSpace.pageState), initialPoint);

  if (payload.shiftKey) {
    if (Math.abs(delta[0]) > Math.abs(delta[1])) {
      delta[1] = 0;
    } else {
      delta[0] = 0;
    }
  }

  // Snapping

  let snapLines: TLSnapLine[] = [];

  const speed = Vec.len2(payload.delta) / state.currentSpace.pageState.camera.zoom;

  if (snapInfo && !payload.metaKey && speed < 5) {
    const snappingBounds = Utils.getBoundsWithCenter(
      Utils.translateBounds(snapInfo.initialBounds, delta)
    );

    const isCloning = false;
    const snappableBounds = (isCloning ? snapInfo.all : snapInfo.others).filter(
      (bounds) => Utils.boundsContain(viewport, bounds) || Utils.boundsCollide(viewport, bounds)
    );

    const snapResult = Utils.getSnapPoints(
      snappingBounds,
      snappableBounds,
      SNAP_DISTANCE / state.currentSpace.pageState.camera.zoom
    );

    if (snapResult) {
      snapLines = snapResult.snapLines;
      delta = Vec.sub(delta, snapResult.offset);
    }
  }
  state.currentSpace.overlays.snapLines = snapLines;

  const drag: DragProps = [delta[0], delta[1], state.currentSpace.transactionId];

  state.currentSpace.optimistic.drag = drag;
  state.currentSpace.pageState.isDragging = true;
};
