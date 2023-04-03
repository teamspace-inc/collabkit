import { TLBoundsEdge, TLPointerInfo } from '@tldraw/core';
import { nanoid } from '../../../utils/nanoid';
import { State, TableColumnTarget } from 'state/constants';
import { getInsertionIndex } from './getInsertionIndex';

export const insertTableColumn = (
  state: State,
  payload: {
    info: TLPointerInfo<TableColumnTarget>;
    edge: TLBoundsEdge;
  }
) => {
  const { target } = payload.info;
  const table = state.store.editing.tables[target.docId];
  const newColumnId = nanoid();
  table.columns[newColumnId] = getInsertionIndex(table, target, payload.edge);
};
