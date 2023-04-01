import { LinkableTarget, State } from 'state/constants';

export function hasLinkTo(
  state: State,
  a: LinkableTarget | null | undefined,
  b: LinkableTarget | null | undefined
) {
  if (a == null || b == null) {
    return false;
  }

  return !!state.store.cards[a.id].props.links[b.id];
}
