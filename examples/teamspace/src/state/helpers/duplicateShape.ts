import { createTableCard } from 'network/createTableCard';
import { createTextCard } from 'network/createTextCard';
import { Item, StateWithSpace } from 'state/constants';
import { copyXmlFragment } from 'state/helpers/copyXmlFragment';
import { nanoid } from 'utils/nanoid';
import { snapshot } from 'valtio';

export function duplicateShape(state: StateWithSpace, item: Item) {
  if (!state.currentSpace.doc) {
    throw new Error('no data doc while duplicating shape');
  }

  const newId = nanoid();

  if (item.type === 'card') {
    const card = createTextCard(state, { duplicateCardId: item.docId });
    const newShape = { ...snapshot(item) };
    newShape.id = newId;
    newShape.docId = card.docId;
    return newShape;
  } else if (item.type === 'table') {
    const card = createTableCard(state, { duplicateCardId: item.docId });
    const newShape = { ...snapshot(item) };
    newShape.id = newId;
    newShape.docId = card.docId;
    return newShape;
  } else {
    const newShape = { ...snapshot(item) };
    newShape.id = newId;
    copyXmlFragment(state, item, newShape);
    return newShape;
  }
}
