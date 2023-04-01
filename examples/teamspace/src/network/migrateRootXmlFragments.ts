import { AbstractType, Doc, Map as YMap, XmlElement, XmlFragment, XmlText } from 'yjs';

export function migrateRootXmlFragments(doc: Doc) {
  // nc: migrate from root xmlFragments to texts
  // don't use constants here as this is a migration
  // for a specific value only
  const texts = doc.getMap('texts');
  const items = doc.getMap('items');

  if (texts.size === 0 && items.size > 0) {
    doc.transact(() => {
      items.forEach((item) => {
        const id = (item as YMap<any>).get('id') as string | undefined;
        if (id) {
          const fragment = doc.getXmlFragment(id);
          console.log('[migrateRootXmlFragments] found fragment', fragment && fragment.length > 0);
          if (fragment && fragment.length > 0) {
            let newFragment = new XmlFragment();
            newFragment.insert(
              0,
              fragment
                .toArray()
                .map((item) =>
                  item instanceof AbstractType ? (item.clone() as XmlElement | XmlText) : item
                )
            );
            texts.set(id, newFragment);
          }
        }
      });
    }, 'migration');
  }
}
