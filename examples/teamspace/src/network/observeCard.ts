import { State, TableTarget, TextCardTarget } from 'state/constants';
import { Doc } from 'yjs';
import { observeCardText } from '../observers';
import { observeTable } from '../observeTable';

export function observeCard(state: State, doc: Doc, target: TextCardTarget | TableTarget) {
  let unsub: () => void;
  switch (target.type) {
    case 'card':
      unsub = observeCardText(state, doc);
      break;
    case 'table':
      unsub = observeTable(state, doc);
      break;
    default:
      unsub = () => {};
      console.warn('[observeCard] unsupported target.type', target);
  }

  return unsub;
}
