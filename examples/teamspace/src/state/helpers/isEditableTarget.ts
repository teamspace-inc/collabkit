import { EditableTarget, Target } from 'state/constants';

export function isEditableTarget(target: Target): target is EditableTarget {
  return (
    target.type === 'card' ||
    target.type === 'shape' ||
    target.type === 'tableCell' ||
    target.type === 'table' ||
    target.type === 'spaceName'
  );
}
