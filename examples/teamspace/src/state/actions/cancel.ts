import * as Realtime from 'realtime';
import type { State } from '../constants';

import actions from './';

export const cancel = (state: State) => {
  const { uiState } = state.store;
  const space = state.currentSpace;

  if (!space) {
    return;
  }

  switch (uiState) {
    case 'editing': {
      actions.stopEditing(state);
      break;
    }
    case 'pointing.shape':
    case 'idle':
      if (state.store.focusModeId) {
        actions.exitFocusMode(state);
      } else {
        actions.deselectAll(state);
      }
      actions.hideAutocomplete(state);

      break;
    case 'pointing.table.row':
    case 'table.row.translating': {
      actions.stopTranslatingTableRow(state);
      break;
    }
    case 'pointing.table.column':
    case 'table.column.translating': {
      actions.stopTranslatingTableColumn(state);
      break;
    }
    case 'translating':
      actions.clearSnapInfo(state);
      actions.clearSnapLines(space);
      if (space.transactionId != null) {
        console.log('cancelling drag');
        Realtime.cancelDrag(space.docId, space.transactionId, state.store.clientId);
        delete space.optimistic.drag;
      } else {
        console.warn('[cancel] drag transaction not found');
      }
      delete space.optimistic.drag;
      actions.clearPointedBoundsHandle(state);
      break;
    case 'transforming':
      actions.clearSnapInfo(state);
      actions.clearSnapLines(space);
      delete space.optimistic.resize;
      if (space.transactionId != null) {
        Realtime.cancelResize(space.docId, space.transactionId, state.store.clientId);
        delete space.optimistic.resize;
      } else {
        console.warn('[cancel] resize transaction not found');
      }
      delete space.optimistic.resize;
      actions.clearPointedBoundsHandle(state);
      break;
    case 'box.creating':
    case 'text.creating': {
      actions.deleteSelected(state);
      break;
    }
    case 'contextMenu.showing': {
      actions.hideContextMenu(state);
      return;
    }
    case 'editing.autocomplete.showing': {
      actions.hideAutocomplete(state);
      return;
    }
  }
  actions.enter(state, 'idle');
};
