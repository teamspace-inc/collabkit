import {
  get,
  getDatabase,
  limitToLast,
  orderByKey,
  query,
  ref as databaseRef,
} from '@firebase/database';
import { CardType, GlobalStore, TableTarget, TextCardTarget } from 'state/constants';
import { Doc } from 'yjs';
import { ref } from 'valtio/vanilla';
import { bindEditingRealtime } from 'realtime';

import { Save } from './types';
import { getLinkedDocSave } from './saveUtils';
import { State } from 'state/constants';
import actions from 'state/actions';
import { bindDoc } from './bindDoc';
import { VERSION } from './schema';
import { observeCard } from './observeCard';
import { getAppEvents } from '../events';
import { bindProxyAndYKeyValue } from './bindProxyAndYKeyValue';

export function loadCard(state: State, docId: string, opts: { save?: Save }) {
  const subs: (() => void)[] = [];
  const doc = new Doc({ guid: docId });
  const binding = bindDoc(doc, 'card', state, VERSION, { save: opts.save });

  state.store.cards[docId] = {
    docId,
    doc: ref(doc),
    binding,
    docIsLoading: true,
    props: {
      links: {},
      backlinks: {},
    },
    linkedDocs: [],
    appliedTransactions: {},
  };

  // Text
  state.store.editing.yCursors[docId] = {};
  state.store.editing.localYCursors[docId] = null;

  subs.push(bindEditingRealtime(docId, state.store.editing, state.store.clientId));
  binding
    .load()
    .then(async () => {
      let cardType = doc.getMap('meta').get('cardType') as CardType;
      if (!cardType) {
        console.warn('[loadCard] missing card type, defaulting to text');
        cardType = 'text';
      }

      const propBinding = bindProxyAndYKeyValue(
        state.store.cards[docId].props,
        doc.getArray('props'),
        // we need to ensure this is always up to date
        // with the latest clientId
        () => ({
          clientId: state.store.clientId,
        }),
        { onProxyChanged: () => state.currentSpace?.undoManager?.stopCapturing() }
      );

      subs.push(propBinding.unsubscribe);

      let target: TableTarget | TextCardTarget;

      switch (cardType) {
        case 'text':
          const text = doc.getXmlFragment('text');
          state.store.editing.texts[docId] = ref(text);
          target = { type: 'card', id: docId };
          actions.indexText(state, { target, text });

          break;
        case 'table':
          target = { type: 'table', id: docId };
          break;
      }

      binding.subscribe();
      subs.push(binding.unsubscribe);
      subs.push(observeCard(state, doc, target));
      state.store.cards[docId].docIsLoading = false;
      doc.on('destroy', () => {
        console.log('[loadCard] doc destroyed', docId);
        delete state.store.editing.texts[docId];
        subs.forEach((sub) => sub());
      });
      const card = state.store.cards[docId];
      getAppEvents(state.store, state.currentSpace).onCardLoad({ card, doc });
    })
    .catch((e) => {
      console.error('Fail to load card', e);
      subs.forEach((unsubscribe) => unsubscribe());
    });
  return state.store.cards[docId];
}

export async function loadAllCards(store: GlobalStore) {
  const spaceDocIds = store.savedSpaces.map((savedSpace) => savedSpace.id);
  const saves = await fetchAllSaves(spaceDocIds);

  for (const save of saves) {
    const linkedSaves = save?.l;
    if (!linkedSaves) {
      continue;
    }
    for (const docId in linkedSaves) {
      if (!store.cards[docId]) {
        loadCard({ store }, docId, { save: getLinkedDocSave(save, docId) });
      }
    }
  }
}

export async function fetchAllSaves(docIds: string[]): Promise<(Save | undefined)[]> {
  return Promise.all(
    docIds.map(async (docId): Promise<Save | undefined> => {
      const savesRef = databaseRef(getDatabase(), `/saves/${docId}`);
      const lastSaveQuery = query(savesRef, orderByKey(), limitToLast(1));
      const snapshot = await get(lastSaveQuery);
      const save = snapshot.val();
      return save ? { ...save[Object.keys(save)[0]], id: snapshot.key } : undefined;
    })
  );
}
