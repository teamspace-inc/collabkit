import { Binding, StateWithSpace } from 'state/constants';
import { nanoid } from '../utils/nanoid';
import { AbstractType, Doc, Map as YMap } from 'yjs';
import { bindDoc } from './bindDoc';
import { VERSION } from './schema';

export function migratePrimitiveCardFragments(doc: Doc, state: StateWithSpace) {
  // nc: migrate from root xmlFragments to texts
  // don't use constants here as this is a migration
  // for a specific value only
  const texts = doc.getMap('texts');
  const items = doc.getMap('items');

  let bindings: Binding[] = [];

  if (items.size > 0) {
    doc.transact(() => {
      items.forEach((item) => {
        const id = (item as YMap<any>).get('id') as string | undefined;
        if (id) {
          const fragment = texts.get(id);
          const type = (item as YMap<any>).get('type') as string | undefined;
          if (type === 'card' && fragment) {
            const docId = (item as YMap<any>).get('docId') as string | undefined;
            if (!docId) {
              console.log('[migratePrimitiveCardFragments] found card to migrate', id);
              const cardId = nanoid();
              const cardDoc = new Doc({ guid: cardId });
              const binding = bindDoc(cardDoc, 'card', state, VERSION, {});

              console.log(
                '[migratePrimitiveCardFragments] ready to migrate',
                id,
                'to',
                cardId,
                cardDoc.getXmlFragment('text'),
                texts.get(id)
              );

              cardDoc.transact(() => {
                const sourceFragment = fragment;
                const targetFragment = cardDoc.getXmlFragment('text');
                if (sourceFragment == null)
                  throw new Error('migratePrimitiveCardFragments: no sourceFragment');
                if (targetFragment == null)
                  throw new Error('migratePrimitiveCardFragments: no targetFragment');
                targetFragment.insert(
                  0,
                  // @ts-ignore
                  sourceFragment
                    .toArray()
                    // @ts-ignore
                    .map((item) => (item instanceof AbstractType ? item.clone() : item))
                );
              }, 'migratePrimitiveCardFragmentsInner');

              (items.get(id) as YMap<any>).set('docId', cardId);

              bindings.push(binding);
            }
          }
        }
      });
    }, 'migratePrimitiveCardFragments');
  }

  setTimeout(() => {
    bindings.forEach((binding) => binding.unsubscribe());
  }, 10000);
}
