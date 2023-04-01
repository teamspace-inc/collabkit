import { TLPointerInfo } from '@tldraw/core';
import Vec from '@tldraw/vec';
import * as Realtime from 'realtime';

import { fromTLBoundsHandle, HandleId } from '../../../utils/Handle';
import type { State } from 'state/constants';
import { getPagePoint } from 'state/helpers';
import { mutables } from 'state/mutables';
import { ResizeProps } from 'realtime';

export const resizeSelectedShapes = (state: State, payload: TLPointerInfo) => {
  const space = state.currentSpace;
  if (!space) {
    console.warn('[resizeSelectedShape] No current space');
    return;
  }

  const { initialPoint } = mutables;

  const point = getPagePoint(payload.point, space.pageState);
  const delta = Vec.sub(point, initialPoint);

  // can probably cache this if the selection doesn't change
  const isAspectRatioLocked = state.store.editing.selectedIds.some(
    (target) =>
      space.items[target.id].type === 'image' &&
      !space.items[target.id].isDeleted &&
      !space.pageState.hiddenIds.includes(target.id)
  );

  const handleId = fromTLBoundsHandle(mutables.pointedBoundsHandleId) ?? HandleId.BottomRight;

  const resize: ResizeProps = [
    delta[0],
    delta[1],
    isAspectRatioLocked,
    space.transactionId ?? Realtime.nextTransactionId(),
    handleId,
  ];

  space.pageState.isResizing = true;
  space.optimistic.resize = resize;
};
