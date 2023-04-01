import { LinkableTarget, State } from 'state/constants';
import { targetEqual } from '.';

export function createLink(state: State, a: LinkableTarget, b: LinkableTarget) {
  if (targetEqual(a, b)) {
    console.warn('[createLink] tried to link to self');
    return;
  }
  console.log('[linkTo] linking', a.id, 'to', b.id);
  state.store.cards[a.id].props.links[b.id] = { type: b.type };
  state.store.cards[b.id].props.backlinks[a.id] = { type: a.type };
}
