import { Doc } from 'yjs';
import { ref } from 'valtio/vanilla';
import { CardType, State, TableTarget, TextCardTarget } from 'state/constants';
import { bindDoc } from './bindDoc';
import { nanoid } from '../utils/nanoid';
import { observeCard } from './observeCard';
import { VERSION } from './schema';
import { getAppEvents } from '../events';

const CARD_TARGET_TYPE_MAP: Record<CardType, (TextCardTarget | TableTarget)['type']> = {
  text: 'card',
  table: 'table',
};

export function createCard(
  state: State,
  payload: { duplicateCardId?: string; cardType: CardType },
  initCardContent: (doc: Doc) => void
) {
  const docId = nanoid();
  const target: TextCardTarget | TableTarget = {
    type: CARD_TARGET_TYPE_MAP[payload.cardType],
    id: docId,
  };
  const doc = new Doc({ guid: docId });
  const binding = bindDoc(doc, 'card', state, VERSION, {});

  state.store.cards[docId] = {
    doc: ref(doc),
    docId,
    docIsLoading: false,
    props: {
      links: {},
      backlinks: {},
    },
    binding,
    linkedDocs: [],
    appliedTransactions: {},
  };

  binding.subscribe();

  const unsubscribe = observeCard(state, doc, target);
  initCardContent(doc);

  doc.on('destroy', () => {
    console.log('[createCard] doc destroyed', doc.guid);
    delete state.store.editing.texts[docId];
    binding.unsubscribe();
    unsubscribe();
  });

  const card = state.store.cards[docId];
  getAppEvents(state.store, state.currentSpace).onCardLoad({ card, doc });
  state.currentSpace!.undoManager!.stopCapturing();
  return card;
}
