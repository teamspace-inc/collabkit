import { SelectableTarget, State, TextCardTarget } from 'state/constants';

export function shapeTargetToCardTarget(
  state: State,
  shapeTarget: SelectableTarget | null | undefined
): TextCardTarget | undefined {
  if (shapeTarget == null) {
    return;
  }

  if (shapeTarget.type === 'card') {
    return shapeTarget;
  }

  const item = state.currentSpace?.items[shapeTarget.id];

  if (item && item.type === 'card') {
    return { type: 'card', id: item.docId };
  }

  return;
}
