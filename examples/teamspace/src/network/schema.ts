import { DocType, Item, ITEMS_V2_KEY, State, Version } from 'state/constants';
import { proxy } from 'valtio';
import { Doc, Map } from 'yjs';
import { bindProxyAndYKeyValue } from './bindProxyAndYKeyValue';

// Increment this and add a corresponding migration when
// making a schema change to the doc
export const VERSION: Version = {
  space: 2,
  card: 2,
};

const migrations: Record<DocType, Record<number, (state: State, doc: Doc) => void>> = {
  space: {
    0: (state: State, doc: Doc) => {
      const meta = doc.getMap('meta');
      meta.set('version', 1);
      meta.set('type', 'space');
      console.log('set version');
    },
    1: (state: State, doc: Doc) => {
      const meta = doc.getMap('meta');
      const version = meta.get('version');
      if (version !== 1) {
        return;
      }
      if (!state.currentSpace) {
        return;
      }
      const items = proxy<{ [itemId: string]: Item }>({});
      const itemsMap = doc.getMap('items');
      bindProxyAndYKeyValue(items, doc.getArray(ITEMS_V2_KEY), 'bindProxyAndYKeyValueMigration');
      for (const itemId of itemsMap.keys()) {
        const item = itemsMap.get(itemId) as Map<any>;
        if (item) {
          console.log(item.toJSON());

          const { size, point, ...rest } = item.toJSON() as any;

          let x = 0,
            y = 0;

          if (point) {
            y = point[1];
            x = point[0];
          }

          items[itemId] = {
            ...rest,
            x,
            y,
          };
        }
      }

      meta.set('version', 2);
      console.log('Upgraded to Space Version 2', doc.getArray(ITEMS_V2_KEY).toJSON());
    },
  },
  card: {
    0: (state: State, doc: Doc) => {
      const meta = doc.getMap('meta');
      meta.set('version', 1);
      meta.set('type', 'card');
    },
    1: (state: State, doc: Doc) => {
      const meta = doc.getMap('meta');
      if (!meta.get('cardType')) {
        meta.set('cardType', 'text');
      }
      const v = meta.get('version');
      if (v instanceof Number && v < VERSION.card) {
        meta.set('version', 2);
      }
    },
  },
};

export function runMigrations(state: State, doc: Doc, docType: DocType) {
  const meta = doc.getMap('meta');
  const version = (meta.get('version') as number) ?? 0;
  doc.transact(() => {
    for (let v = version; v < VERSION[docType]; v++) {
      console.debug('[runMigrations]', doc.guid, docType, v);
      migrations[docType][v](state, doc);
    }
  }, 'migrate.' + docType);
}
