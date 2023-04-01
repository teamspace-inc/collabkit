import type { State, TextCardTarget } from 'state/constants';
import { createIndexItem } from './_indexableFromText';
import { XmlFragment } from 'yjs';
import { targetEqual } from 'state/helpers/targetEqual';

export const indexText = (state: State, payload: { target: TextCardTarget; text: XmlFragment }) => {
  const { search } = state.store;
  const { target, text } = payload;

  let indexItem = search.indexedItems[target.id];

  if (indexItem) {
    try {
      search.engine.remove((item) => targetEqual(item.target, indexItem.target));
    } catch (e) {}
  }

  indexItem = createIndexItem(target, text);

  search.indexedItems[target.id] = indexItem;
  search.engine.add(indexItem);
};
