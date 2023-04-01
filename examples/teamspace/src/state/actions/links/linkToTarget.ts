import { TLPointerInfo, TLTarget } from '@tldraw/core';
import { State, Target } from 'state/constants';
import { createLink, getSelectedLinkables, shapeTargetToCardTarget } from 'state/helpers';

export function linkToTarget(state: State, info: TLPointerInfo<TLTarget>) {
  const space = state.currentSpace;
  if (!space) {
    console.warn('[linkToTarget] not in space');
    return;
  }

  const linkableTargets = getSelectedLinkables(state);

  const target = info.target as Target;

  if (target.type !== 'shape') {
    console.warn('[linkToTarget] target is not a shape');
    return;
  }

  const cardTarget = shapeTargetToCardTarget(state, target);

  if (cardTarget && linkableTargets.length === 1) {
    createLink(state, linkableTargets[0], cardTarget);
  } else {
    console.warn('[linkToTarget] too few or too many linkables', linkableTargets);
  }
}
