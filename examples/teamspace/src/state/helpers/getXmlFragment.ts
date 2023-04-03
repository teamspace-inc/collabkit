import { SpaceData, TEXTS_KEY } from 'state/constants';
import { XmlFragment } from 'yjs';
import { createXmlFragment } from './createXmlFragment';

export function getXmlFragment(
  data: SpaceData,
  id: string,
  getDefault = createXmlFragment
): XmlFragment | null {
  if (!data.doc) {
    return null;
  }

  const texts = data.doc.getMap<XmlFragment>(TEXTS_KEY);
  let xmlFragment = texts.get(id);
  if (!xmlFragment) {
    data.doc.transact(() => {
      xmlFragment = getDefault();
      texts.set(id, xmlFragment!);
    }, 'getXmlFragment');
  }
  return xmlFragment!;
}
