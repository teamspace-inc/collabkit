import { TLPointerInfo } from '@tldraw/core';
import { ShapeTarget, StateWithSpace } from 'state/constants';
import { mutables } from 'state/mutables';
import actions from '..';

export const goToShape = (state: StateWithSpace, info: TLPointerInfo<ShapeTarget>) => {
  const space = state.currentSpace;
  if (!space) {
    console.warn('[goToShape] not in a space');
    return;
  }
  actions.select(state, info);
  space.pageState.camera.animate = true;
  actions.zoomToSelection(state, { maxZoom: 1 });
  if (mutables.animateCameraTimeoutId) {
    window.clearTimeout(mutables.animateCameraTimeoutId);
  }
  mutables.animateCameraTimeoutId = window.setTimeout(() => {
    delete space.pageState.camera.animate;
  }, 600);
};
