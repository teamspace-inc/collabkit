import { Target } from 'state/constants';
import equal from 'fast-deep-equal';

export function targetEqual(a: Target | null, b: Target | null) {
  return a !== null && b !== null && equal(a, b);
}
