import { Target } from 'state/constants';

// right now we only support table targets being 'siblings', i.e.
// they share a common parent.
export function isSibling(a: Target, b: Target) {
  return (
    (a.type === 'tableRow' || a.type === 'tableColumn' || a.type === 'tableCell') &&
    (b.type === 'tableRow' || b.type === 'tableColumn' || b.type === 'tableCell') &&
    a.docId === b.docId
  );
}
