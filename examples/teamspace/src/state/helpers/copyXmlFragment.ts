import { Item, StateWithSpace } from 'state/constants';
import { AbstractType, XmlElement, XmlText } from 'yjs';
import { getXmlFragment } from './getXmlFragment';

export function copyXmlFragment(state: StateWithSpace, fromShape: Item, toShape: Item) {
  if (!state.currentSpace.doc) {
    throw new Error('tried to copyXmlFragment with no data.doc');
  }

  state.currentSpace.doc.transact(() => {
    const sourceFragment = getXmlFragment(state.currentSpace, fromShape.id);
    const targetFragment = getXmlFragment(state.currentSpace, toShape.id);
    if (sourceFragment == null) throw new Error('copyXmlFragment: no sourceFragment');
    if (targetFragment == null) throw new Error('copyXmlFragment: no targetFragment');
    targetFragment.insert(
      0,
      sourceFragment
        .toArray()
        .map((item) =>
          item instanceof AbstractType ? (item.clone() as XmlElement | XmlText) : item
        )
    );
  }, 'copyXmlFragment');
}
