import { TLPointerInfo } from '@tldraw/core';
import { State, TableRowTarget } from 'state/constants';

export const deleteTableRow = (state: State, info: TLPointerInfo<TableRowTarget>) => {
  const { docId, id } = info.target;
  const table = state.store.editing.tables[docId];
  table.deleted[id] = true;
};
