import { SelectableTarget, Target } from 'state/constants';

export function isSelectableTarget(target: Target): target is SelectableTarget {
  return (
    target.type === 'card' ||
    target.type === 'shape' ||
    target.type === 'table' ||
    target.type === 'tableRow' ||
    target.type === 'tableColumn' ||
    target.type === 'tableCell'
  );
}
