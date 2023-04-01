import { TLPointerInfo } from '@tldraw/core';
import type { ShapeTarget, State, StateWithSpace, Target } from 'state/constants';
import { duplicateShape } from 'state/helpers';
import { store } from 'state/store';

export const duplicateSelectedShapes = (state: State, info: TLPointerInfo<Target>) => {
  const space = state.currentSpace;

  if (!space) {
    console.warn('[duplicateSelectedShapes] No current space');
    return;
  }

  if (!space.doc) {
    console.warn('[duplicateSelectedShapes] No current space');
    return;
  }

  let newTargets: ShapeTarget[] = [];

  space.doc.transact(() => {
    store.editing.selectedIds.forEach((target) => {
      if (target.type === 'shape') {
        const shape = duplicateShape(state as StateWithSpace, space.items[target.id]);
        space.items[shape.id] = shape;
        newTargets.push({ type: 'shape', id: shape.id });
      }
    });
  }, 'duplicateSelectedShapes');

  state.store.editing.selectedIds = newTargets;
};
