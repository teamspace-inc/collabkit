import { AbstractType } from 'yjs';
import { generateKeyBetween } from 'utils/fractionalIndexing';

import { DEFAULT_TABLE_ROW_HEIGHT, State } from 'state/constants';
import { VERSION } from './schema';
import { createCard } from './createCard';
import { nanoid } from '../utils/nanoid';
import { STICKY_NOTE_WIDTH } from 'shapes/sticky/StickyComponent';
import { sortByFractionalIndex } from './constructTable';

export function createTableCard(state: State, payload: { duplicateCardId?: string }) {
  return createCard(state, { ...payload, cardType: 'table' }, (doc) => {
    const tableArray = doc.getArray('table');
    if (payload.duplicateCardId) {
      const sourceDoc = state.store.cards[payload.duplicateCardId!].doc;
      if (!sourceDoc) {
        console.warn(
          '[createTableCard] No source doc found for card during duplicate transact',
          payload.duplicateCardId
        );
        return;
      }
      doc.transact(() => {
        // clone other table
        const sourceTable = sourceDoc.getArray('table');
        if (sourceTable) {
          tableArray.insert(
            0,
            sourceTable
              .toArray()
              .map((item: any) => (item instanceof AbstractType ? item.clone() : item))
          );
        }

        doc.getMap('meta').set('cardType', 'table');
      }, 'duplicateTable');
    } else {
      doc.transact(() => {
        const meta = doc.getMap('meta');
        meta.set('cardType', 'table');
        meta.set('version', VERSION['card']);
        meta.set('type', 'card');
      }, 'createTable');

      const rowIds = [nanoid(), nanoid(), nanoid()];
      let rows: Record<string, string> = {};
      rows[rowIds[0]] = generateKeyBetween(null, null);
      rows[rowIds[1]] = generateKeyBetween(rows[rowIds[0]], null);
      rows[rowIds[2]] = generateKeyBetween(rows[rowIds[1]], null);

      const columnIds = [nanoid(), nanoid(), nanoid()];
      let columns: Record<string, string> = {};
      columns[columnIds[0]] = generateKeyBetween(null, null);
      columns[columnIds[1]] = generateKeyBetween(columns[columnIds[0]], null);
      columns[columnIds[2]] = generateKeyBetween(columns[columnIds[1]], null);

      columns = sortByFractionalIndex(columns, {});
      rows = sortByFractionalIndex(rows, {});

      const columnWidths: Record<string, number> = {};
      for (const columnId of columnIds) {
        columnWidths[columnId] = STICKY_NOTE_WIDTH;
      }
      const rowHeights: Record<string, number> = {};
      for (const rowId of rowIds) {
        rowHeights[rowId] = DEFAULT_TABLE_ROW_HEIGHT;
      }
      Object.assign(state.store.editing.tables[doc.guid], {
        cellValues: {},
        columns,
        rows,
        columnWidths,
        rowHeights,
        deleted: {},
      });
      Promise.resolve().then(() => {
        console.log(doc.getArray('table').toJSON());
        // debugger;
      });
    }
  });
}
