import { AbstractType } from 'yjs';
import { ref } from 'valtio/vanilla';
import { State, TextCardTarget } from 'state/constants';
import actions from 'state/actions';
import { insertDefaultCardContents } from 'state/helpers';
import { VERSION } from './schema';
import { createCard } from './createCard';

export function createTextCard(state: State, payload: { duplicateCardId?: string }) {
  return createCard(
    state,
    { cardType: 'text', duplicateCardId: payload.duplicateCardId },
    (doc) => {
      const text = doc.getXmlFragment('text');

      if (payload.duplicateCardId) {
        doc.transact(() => {
          const sourceFragment =
            state.store.cards[payload.duplicateCardId!].doc?.getXmlFragment('text');
          if (sourceFragment) {
            text.insert(
              0,
              sourceFragment
                .toArray()
                .map((item: any) => (item instanceof AbstractType ? item.clone() : item))
            );
          }
          doc.getMap('meta').set('cardType', 'text');
        }, 'duplicateCard');
      } else {
        doc.transact(() => {
          insertDefaultCardContents(text);
          const meta = doc.getMap('meta');
          meta.set('cardType', 'text');
          meta.set('version', VERSION['card']);
          meta.set('type', 'card');
        }, 'createCard');
      }

      state.store.editing.texts[doc.guid] = ref(text);
      const target: TextCardTarget = { type: 'card', id: doc.guid };
      actions.indexText(state, { target, text });
    }
  );
}
