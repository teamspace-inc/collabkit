import actions from 'state/actions';
import { State, TextCardTarget } from 'state/constants';
import { Doc } from 'yjs';

export function observeCardText(state: State, doc: Doc) {
  const text = doc.getXmlFragment('text');
  const target: TextCardTarget = { type: 'card', id: doc.guid };

  function onCardTextChange() {
    actions.indexText(state, { target, text });
  }

  text.observeDeep(onCardTextChange);

  return () => {
    text.unobserveDeep(onCardTextChange);
  };
}
