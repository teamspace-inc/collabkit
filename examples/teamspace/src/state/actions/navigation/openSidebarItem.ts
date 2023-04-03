import { TLPointerInfo, Utils } from '@tldraw/core';
import { getBounds } from '../../../shapes';
import type { SidebarPointerTarget, State, StateWithSpace } from 'state/constants';
import { mutables } from 'state/mutables';
import actions from '..';
import { targetEqual } from '../shapes/targetEqual';
import { itemToShape } from 'state/helpers';

export const openSidebarItem = (state: State, info: TLPointerInfo<SidebarPointerTarget>) => {
  if (!state.currentSpace) {
    console.warn('[openSidebarItem] not in a space');
    return;
  }

  const space = state.currentSpace;
  const target = info.target;

  const wasAlreadySelected = state.store.editing.selectedIds.some((selectedTarget) =>
    targetEqual(selectedTarget, target)
  );

  if (target.type === 'shape') {
    actions.select(state, { ...info, target });
    const item = space.items[target.id];

    if (!item) {
      console.warn('[openSidebarItem] item not found', target);
      return;
    }
    const viewport = Utils.computeViewport(space.pageState.camera, mutables.rendererBounds);

    const isInViewport =
      space.sizes[item.id] &&
      Utils.boundsContain(viewport, getBounds(itemToShape(state.currentSpace.sizes, item)));

    const shouldAnimate = wasAlreadySelected || !isInViewport;

    if (shouldAnimate) {
      if (!state.currentSpace) {
        return;
      }
      space.pageState.camera.animate = shouldAnimate;
      actions.zoomToSelection(state as StateWithSpace, { maxZoom: 1 });
      if (mutables.animateCameraTimeoutId) {
        window.clearTimeout(mutables.animateCameraTimeoutId);
      }
      mutables.animateCameraTimeoutId = window.setTimeout(() => {
        delete space.pageState.camera.animate;
      }, 600);
    }
  }
};
