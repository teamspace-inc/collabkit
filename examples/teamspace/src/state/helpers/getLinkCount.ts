import { LinkableTarget, State } from 'state/constants';

export function getLinkCount(state: State, target: LinkableTarget | null | undefined) {
  if (!target) {
    return 0;
  }
  return Object.keys(state.store.cards[target.id].props.links).length;
}
