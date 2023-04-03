import { TLBoundsEdge, TLPointerInfo } from '@tldraw/core';
import { nanoid } from '../../../utils/nanoid';
import { State, TableRowTarget } from 'state/constants';
import { getInsertionIndex } from './getInsertionIndex';

export const insertTableRow = (
  state: State,
  payload: { info: TLPointerInfo<TableRowTarget>; edge: TLBoundsEdge }
) => {
  const { target } = payload.info;
  const table = state.store.editing.tables[target.docId];
  const newRowId = nanoid();
  table.rows[newRowId] = getInsertionIndex(table, target, payload.edge);
};
