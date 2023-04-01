import { LinkableTarget, Target } from 'state/constants';

export function isLinkableTarget(target: Target): target is LinkableTarget {
  return target.type === 'card';
}
