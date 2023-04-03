import { Doc } from 'yjs';

import { CardStore, State } from 'state/constants';

export function addLinkedDoc(state: State, info: { card: CardStore; doc: Doc }) {
  const { currentSpace } = state;
  if (currentSpace && !currentSpace.linkedDocs.includes(info.doc)) {
    currentSpace.linkedDocs.push(info.doc);
  }
}
