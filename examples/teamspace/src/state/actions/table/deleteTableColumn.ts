import { TLPointerInfo } from '@tldraw/core';
import { State, TableColumnTarget } from 'state/constants';

export const deleteTableColumn = (state: State, info: TLPointerInfo<TableColumnTarget>) => {
  const { docId, id } = info.target;
  const table = state.store.editing.tables[docId];
  table.deleted[id] = true;
};
