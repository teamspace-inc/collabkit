import { State } from 'state/constants';
import { Doc } from 'yjs';
import { bindProxyAndYKeyValue } from './network/bindProxyAndYKeyValue';

export function observeTable(state: State, doc: Doc) {
  state.store.editing.tables[doc.guid] = {
    cellValues: {},
    rowHeights: {},
    rows: {},
    columnWidths: {},
    columns: {},
    deleted: {},
  };
  const { unsubscribe } = bindProxyAndYKeyValue(
    state.store.editing.tables[doc.guid],
    doc.getArray('table'),
    transactionOrigin
  );

  return unsubscribe;
}

function transactionOrigin() {
  return 'observeTable';
}
