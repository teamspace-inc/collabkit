import {
  TLBounds,
  TLAutoResizeInfo,
  TLContextMenuInfo,
  TLDragInfo,
  TLKeyboardInfo,
  TLPointerInfo,
  TLFocusInfo,
  TLTarget,
  TLBoundsEdge,
  TLBoundsTarget,
  TLBoundsHandleTarget,
} from '@tldraw/core';

import React, { useMemo } from 'react';
import { ClientState } from 'realtime';
import { Doc, XmlFragment } from 'yjs';
import { EditorView } from 'prosemirror-view';

import { useAppContext } from './hooks/useAppContext';
import { useOptionalSpaceStore } from './hooks/useSpaceContext';
import actions from './state/actions';
import { Block, Mark } from './types';
import {
  ShapeTarget,
  SpaceStore,
  StateWithSpace,
  CardStore,
  GlobalStore,
  TextCardTarget,
  SidebarPointerTarget,
  TableCellTarget,
  TableTarget,
  Target,
  State,
  MenuItemTarget,
} from './state/constants';
import {
  getPagePoint,
  getSelectedLinkables,
  hasLeftDeadZone,
  hasSelectedTableCell,
  isConsecutiveClick,
  isSelectableTarget,
} from 'state/helpers';
import { mutables } from './state/mutables';
import { ref } from 'valtio';
import { findItemIdByDocId } from './utils/findItemIdByDocId';
import { isTargetSelected, targetEqual } from 'state/helpers';
import { CardColors } from 'utils/Colors';
import { EditorContextType } from 'hooks/useEditorContext';
import assert from 'utils/assert';

function isStateWithSpace(state: State): state is StateWithSpace {
  return !!state.currentSpace;
}

function updateTranslatingOperations(state: StateWithSpace, info: TLPointerInfo) {
  switch (state.store.uiState) {
    case 'translating': {
      actions.translateSelectedShapes(state, info);
      break;
    }
    case 'table.row.translating': {
      const target = state.store.editing.pointingId;
      if (target && target.type === 'tableRow') {
        actions.translateTableRow(state, { ...info, target });
      }
      break;
    }
    case 'table.column.translating': {
      const target = state.store.editing.pointingId;
      if (target && target.type === 'tableColumn') {
        actions.translateTableColumn(state, { ...info, target });
      }
      break;
    }
    case 'transforming':
    case 'text.creating':
    case 'box.creating': {
      actions.resizeSelectedShapes(state, info);
      break;
    }
  }
}

function updatePointingOperation(state: StateWithSpace, info: TLPointerInfo | TLKeyboardInfo) {
  switch (state.store.uiState) {
    case 'brushSelecting': {
      actions.updateBrush(state, info);
      break;
    }
  }
}

export type SpaceEventHandlers = ReturnType<typeof useSpaceEvents>;
export type AppEventHandlers = ReturnType<typeof useAppEvents>;

export function useAppEvents() {
  const { store } = useAppContext();
  const space = useOptionalSpaceStore();
  return useMemo(() => getAppEvents(store, space), [store, space]);
}

export function getAppEvents(store: GlobalStore, space?: SpaceStore) {
  const state = { store, currentSpace: space };
  return {
    onNetworkConnect: () => {
      actions.registerClient(state, { clientId: store.clientId });
    },

    onNetworkDisconnect: () => {
      if (!state.currentSpace) {
        return;
      }

      state.currentSpace.realtime = {};
      mutables.cameras = {};
      for (const clientId of Object.keys(state.currentSpace.realtime)) {
        actions.unsubscribeClient(state, { clientId });
      }
    },

    onTokenClick: (e: React.MouseEvent, info: { target: Target }) => {
      e.preventDefault();
      e.stopPropagation();
      if (info.target.type === 'card') {
        actions.enterFocusMode(state, { target: info.target });
      }
    },

    onCardLoad: (info: { card: CardStore; doc: Doc }) => {
      actions.addLinkedDoc(state, info);
      actions.addCardToUndoScope(state, info);
    },

    onModalClose: () => {
      actions.exitFocusMode(state);
    },

    onSearchInputFocus: (e: React.FocusEvent<HTMLInputElement>) => {},

    onSearchCloseClick: () => {
      actions.hideSearch(state);
    },

    onSearchInputChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const query = e.target.value;
      actions.search(state, { query });
    },

    onContextMenu: (info: TLContextMenuInfo<TLTarget>, e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      const target = info.target as Target;
      if (
        target.type === 'tableCell' ||
        target.type === 'tableColumn' ||
        target.type === 'tableRow'
      ) {
        state.store.editing.pointingId = target;
      }

      if (info.shiftKey) {
        if (state.currentSpace) {
          if (target.type === 'shape') {
            actions.select(state, { ...info, target });
          }
        }
      }

      actions.showContextMenu(state, { ...info, target });
    },

    onPointContextMenuItem: (info: TLPointerInfo<MenuItemTarget>, e: React.PointerEvent) => {
      e.stopPropagation();

      const { target } = store.contextMenu;

      function getTableRowInfo() {
        if (target && target.type === 'tableRow') {
          return { ...info, target };
        } else {
          throw new Error('target is not a table row');
        }
      }

      function getTableColumnInfo() {
        if (target && target.type === 'tableColumn') {
          return { ...info, target };
        } else {
          throw new Error('target is not a table column');
        }
      }

      function getSpaceInfo() {
        if (target && target.type === 'space') {
          return { ...info, target };
        } else {
          throw new Error('target is not a space');
        }
      }

      function getShapeInfo() {
        if (target && target.type === 'shape') {
          return { ...info, target };
        } else {
          throw new Error('target is not a space');
        }
      }

      switch (info.target.id) {
        case 'link': {
          const linkablesCount = getSelectedLinkables(state).length;
          if (linkablesCount === 1) {
            actions.linkToTarget(state, getShapeInfo());
          } else if (linkablesCount === 2) {
            actions.linkSelected(state);
          }
          break;
        }
        case 'startLinking': {
          actions.selectTool(state, 'link');
          return; // we don't want to enter 'idle' at the end for this one
        }
        case 'unlink': {
          actions.unlink(state);
          break;
        }
        case 'addTableColumn': {
          console.log('todo');
          break;
        }
        case 'addTableRow': {
          console.log('todo');
          break;
        }
        case 'duplicate': {
          console.log('todo');
          break;
        }
        case 'hideSpace': {
          actions.hideSpace(state, getSpaceInfo());
          break;
        }
        case 'delete': {
          actions.deleteSelected(state, info);
          break;
        }
        case 'copy':
          if (state.currentSpace) {
            actions.copySelectedShapes(state, info);
          }
          break;

        case 'cut':
          if (state.currentSpace) {
            actions.cutSelectedShapes(state, info);
          }
          break;
        case 'paste':
          if (state.currentSpace) {
            actions.paste(state as StateWithSpace, info);
          }
          break;

        case 'selectAll':
          if (state.currentSpace) {
            actions.selectAllShapes(state, info);
          }
          break;

        case 'deleteTableColumn':
          actions.deleteTableColumn(state, getTableColumnInfo());
          break;

        case 'deleteTableRow':
          actions.deleteTableRow(state, getTableRowInfo());
          break;

        case 'insertTableColumnLeft':
          actions.insertTableColumn(state, {
            info: getTableColumnInfo(),
            edge: TLBoundsEdge.Left,
          });
          break;

        case 'insertTableColumnRight':
          actions.insertTableColumn(state, {
            info: getTableColumnInfo(),
            edge: TLBoundsEdge.Right,
          });
          break;

        case 'insertTableRowAbove':
          actions.insertTableRow(state, { info: getTableRowInfo(), edge: TLBoundsEdge.Top });
          break;

        case 'insertTableRowBelow':
          actions.insertTableRow(state, { info: getTableRowInfo(), edge: TLBoundsEdge.Bottom });
          break;
      }
      actions.enter(state, 'idle');
    },

    onPointerOver: (info: TLPointerInfo<Target>, e: React.PointerEvent) => {
      const target = info.target;
      switch (store.uiState) {
        case 'search.showing': {
          if (target.type === 'card') {
            actions.selectSearchResult(state, { ...info, target });
          }
          break;
        }
        case 'editing.autocomplete.showing': {
          if (target.type === 'card') {
            actions.selectAutocomplete(state, { selectedId: target });
          }
          break;
        }
      }
    },

    onPointerMove: (info: TLPointerInfo<TLTarget>, e: React.PointerEvent) => {
      if (!isStateWithSpace(state)) {
        return;
      }
      const space = state.currentSpace;
      updatePointingOperation(state, info);
      updateTranslatingOperations(state, info);
      switch (store.uiState) {
        case 'contextMenu.showing': {
          break;
        }
        case 'pointing.canvas': {
          actions.enter(state, 'brushSelecting');
          break;
        }
        case 'panning.pointing': {
          actions.invertedPanCamera(space, info);
          updatePointingOperation(state, info);
          break;
        }
        case 'pointing.boundsHandle': {
          if (hasLeftDeadZone(space, info)) {
            actions.setSnapInfo(state);
            actions.setRealtimeTransactionId(space);
            actions.enter(state, 'transforming');
          }
          break;
        }
        case 'pointing.table.row': {
          if (hasLeftDeadZone(space, info)) {
            actions.startTranslatingTableRow(state, info);
            actions.enter(state, 'table.row.translating');
          }
          break;
        }
        case 'pointing.table.column': {
          if (hasLeftDeadZone(space, info)) {
            actions.startTranslatingTableColumn(state, info);
            actions.enter(state, 'table.column.translating');
          }
          break;
        }
        case 'pointing.bounds':
        case 'pointing.shape': {
          const target = info.target as Target;
          if (hasLeftDeadZone(space, info)) {
            if (info.altKey) {
              if (target.type === 'shape') {
                actions.duplicateSelectedShapes(state, { ...info, target });
              }

              // Wait for the update created by duplicateSelectedShapes to be sent before
              // setting a transaction ID, so that the update gets sent *without* a
              // transaction ID that belongs to the following resize transaction.
              //
              // (Otherwise other clients will ignore the resize, because they've
              // already seen an update with the same transaction ID.)
              Promise.resolve().then(() => {
                actions.setSnapInfo(state);
                actions.setRealtimeTransactionId(space);
                actions.enter(state, 'translating');
              });
            } else {
              actions.setSnapInfo(state);
              actions.setRealtimeTransactionId(space);
              actions.enter(state, 'translating');
            }
          }
          break;
        }
        case 'box.pointing': {
          if (hasLeftDeadZone(space, info)) {
            actions.createBoxShape(state, info);

            // Wait for the update created by createBoxShape to be sent before
            // setting a transaction ID, so that the update gets sent *without* a
            // transaction ID that belongs to the following resize transaction.
            //
            // (Otherwise other clients will ignore the resize, because they've
            // already seen an update with the same transaction ID.)
            Promise.resolve().then(() => {
              actions.setRealtimeTransactionId(space);
              actions.enter(state, 'box.creating');
            });
          }
          break;
        }
        case 'text.pointing': {
          if (hasLeftDeadZone(space, info)) {
            actions.createTextShape(space, info);

            // Wait for the update created by createTextShape to be sent before
            // setting a transaction ID, so that the update gets sent *without* a
            // transaction ID that belongs to the following resize transaction.
            //
            // (Otherwise other clients will ignore the resize, because they've
            // already seen an update with the same transaction ID.)
            Promise.resolve().then(() => {
              actions.setRealtimeTransactionId(space);
              actions.enter(state, 'text.creating');
            });
          }
          break;
        }
        case 'card.idle':
        case 'table.idle':
        case 'sticky.idle': {
          actions.updateToolPreviewPoint(space, info);
          break;
        }
        case 'link.idle': {
          break;
        }
        case 'editing.autocomplete.showing': {
          if (state.store.editing.autocomplete)
            state.store.editing.autocomplete.navigatedBy = 'mouse';
        }
      }
      space.cursor = getPagePoint(info.point, space.pageState);
    },

    onPointerEnter: (info: TLPointerInfo<Target>, e: React.PointerEvent) => {
      switch (store.uiState) {
        case 'editing.autocomplete.showing': {
          const target = info.target as Target;
          if (target.type === 'card') {
            actions.selectAutocomplete(state, { selectedId: target });
          }
          break;
        }
      }
    },

    onPointerDown: (
      info: TLPointerInfo<TLTarget>,
      e: React.PointerEvent,
      editorContext: EditorContextType
    ) => {
      space && actions.setInitialPoint(space, info);
      switch (store.uiState) {
        case 'contextMenu.showing': {
          if (info.target.type === 'bounds') {
            actions.hideContextMenu(state);
          }
          break;
        }
        case 'box.idle': {
          actions.enter(state, 'box.pointing');
          break;
        }
        case 'text.idle': {
          actions.enter(state, 'text.pointing');
          break;
        }
        case 'panning.idle': {
          actions.enter(state, 'panning.pointing');
          break;
        }
        case 'sticky.idle': {
          actions.enter(state, 'sticky.pointing');
          break;
        }
        case 'table.idle': {
          actions.enter(state, 'table.pointing');
          break;
        }
        case 'card.idle': {
          actions.enter(state, 'card.pointing');
          break;
        }
        case 'link.idle': {
          // actions.enter(state, 'link.pointing');
          break;
        }
        case 'search.showing': {
          const target = info.target as Target;
          if (target.type === 'card') {
            actions.selectSearchResult(state, { ...info, target });
            actions.openSearchResult(state);
          }
          break;
        }
        case 'editing.autocomplete.showing': {
          const target = info.target as Target;
          if (target.type === 'card') {
            // Prevent choosing an autocomplete item from deselecting
            // the card or affecting the caret position
            e.preventDefault();
            e.stopPropagation();
            actions.selectAutocomplete(state, { selectedId: target });
            actions.applyAutocomplete(state, { editorContext });
            actions.hideAutocomplete(state);
          }

          break;
        }
      }
    },

    onPointerUp: (info: TLPointerInfo<TLTarget>, e: React.PointerEvent) => {
      // store.editing.pointingId = null;

      switch (store.uiState) {
        case 'panning.pointing': {
          actions.enter(state, 'panning.idle');
          break;
        }
        case 'transforming': {
          assert(space);
          // TODO: extract these to a function
          actions.clearSnapInfo(state);
          actions.clearSnapLines(space);
          actions.stopResize({ store, currentSpace: space });
          actions.stopTranslatingTableColumn(state);
          actions.clearPointedBoundsHandle(state);
          actions.enter(state, 'idle');
          break;
        }
        // case 'table.row.pointing':
        case 'table.row.translating': {
          actions.stopTranslatingTableRow(state);
          actions.enter(state, 'idle');
          break;
        }
        // case 'table.column.pointing':
        case 'table.column.translating': {
          actions.stopTranslatingTableColumn(state);
          actions.enter(state, 'idle');
          break;
        }
        case 'translating': {
          assert(space);
          // TODO: extract these to a function
          actions.clearSnapInfo(state);
          actions.clearSnapLines(space);
          actions.stopTranslating({ store, currentSpace: space });
          actions.clearPointedBoundsHandle(state);
          actions.enter(state, 'idle');
          break;
        }

        case 'sticky.pointing': {
          actions.createStickyShape(state, info);
          actions.enter(state, 'idle');
          break;
        }

        case 'card.pointing': {
          actions.createCardShape(state, { info });
          actions.enter(state, 'idle');
          break;
        }

        case 'table.pointing': {
          actions.createTableShape(state, { info });
          actions.enter(state, 'idle');
          break;
        }

        case 'text.creating':
        case 'box.creating': {
          actions.stopResize(state);
          actions.clearPointedBoundsHandle(state);
          actions.enter(state, 'idle');
          break;
        }
        case 'pointing.bounds': {
          actions.deselectAll(state);
          actions.enter(state, 'idle');
          break;
        }
        case 'brushSelecting': {
          actions.clearBrush(state);
          break;
        }
        case 'text.pointing': {
          assert(space);
          if (!hasLeftDeadZone(space, info)) {
            actions.createTextShape(space, info);
          }
          actions.enter(state, 'idle');
          break;
        }
        case 'link.pointing': {
          if (getSelectedLinkables(state).length === 0) {
            const target = info.target as Target;
            if (isSelectableTarget(target)) {
              actions.select(state, { ...info, target });
            }
            actions.enter(state, 'link.idle');
          } else {
            actions.linkToTarget(state, info);
            actions.enter(state, 'idle');
          }
          break;
        }
        case 'box.pointing':
        case 'pointing.table.column':
        case 'pointing.table.row':
        case 'pointing.canvas':
        case 'pointing.boundsHandle':
        case 'pointing.shape': {
          actions.enter(state, 'idle');
          break;
        }
      }
    },

    onScrollList: (info: TLPointerInfo<{ type: 'wheel' }>, e: React.WheelEvent) => {
      if (store.uiState === 'editing.autocomplete.showing') {
        actions.panAutocomplete(state, info);
        return;
      }
    },

    onKeyDown: (
      key: string,
      info: TLKeyboardInfo,
      e: KeyboardEvent | React.KeyboardEvent<any>,
      editorContext: EditorContextType
    ) => {
      // Global shortcuts that work regardless
      // of the current state.
      if (state.store.uiState === 'following') {
        actions.stopFollowing(state);
      }

      switch (key) {
        case 'O':
        case 'o': {
          if (info.metaKey || info.ctrlKey) {
            // turn off browser file picker
            e.preventDefault();
            actions.enterFocusMode(state, {});
            return;
          }
          break;
        }
        case 'Escape': {
          actions.cancel(state);
          return;
        }
        case '0': {
          if (info.ctrlKey || info.metaKey) {
            space && actions.resetZoom(space);

            return;
          }
          break;
        }
        case '1': {
          if (info.metaKey || info.ctrlKey) {
            e.preventDefault();
            space && actions.zoomToFit(state);

            return;
          }
          break;
        }
        case '2': {
          if (info.metaKey || info.ctrlKey) {
            e.preventDefault();
            space && actions.zoomToSelection(state as StateWithSpace);

            return;
          }
          break;
        }
        case '=': {
          if (e.metaKey || e.ctrlKey) {
            e.preventDefault();
            space && actions.zoomIn(space, info);

            return;
          }
          break;
        }
        case '-': {
          if (e.metaKey || e.ctrlKey) {
            e.preventDefault();
            space && actions.zoomOut(space, info);
            actions.stopFollowing(state);

            return;
          }

          break;
        }
      }

      // Search shortcuts
      if (store.uiState === 'search.showing') {
        switch (key) {
          case 'K':
          case 'k': {
            if (info.metaKey || info.ctrlKey) {
              actions.hideSearch(state);
            }
            break;
          }
          case 'ArrowDown': {
            actions.nextSearchResult(state);
            break;
          }
          case 'ArrowUp': {
            actions.prevSearchResult(state);
            break;
          }
          case 'Enter': {
            actions.openSearchResult(state);
            break;
          }
          case 'Escape': {
            const { query } = store.search;
            if (query && query.length > 0) {
              store.search.query = '';
            } else {
              actions.hideSearch(state);
            }
          }
        }
        return;
      }

      // Dropdown shortcuts
      if (store.uiState === 'editing.autocomplete.showing' && store.editing.autocomplete) {
        const numResults = store.editing.autocomplete.results?.length;
        switch (key) {
          case 'K':
          case 'k': {
            if (info.metaKey || info.ctrlKey) {
              actions.hideAutocomplete(state);
            }
            break;
          }
          case 'ArrowDown': {
            if (numResults && numResults > 0) {
              e.preventDefault();
              e.stopPropagation();
              actions.nextAutocomplete(state);
              return;
            }
            break;
          }
          case 'ArrowUp': {
            if (numResults && numResults > 0) {
              e.preventDefault();
              e.stopPropagation();
              actions.prevAutocomplete(state);
              return;
            }
            break;
          }
          case 'Tab':
          case 'Enter': {
            // if we have a selected item, use it
            // otherwise ignore, and treat as a normal key
            if (store.editing.autocomplete.selectedId) {
              e.preventDefault();
              e.stopPropagation();
              actions.applyAutocomplete(state, { editorContext });
              return;
            } else {
              actions.hideAutocomplete(state);
            }
            break;
          }
          case 'Escape': {
            const { query } = store.editing.autocomplete;
            if (query && query.length > 0) {
              store.editing.autocomplete.query = '';
            } else {
              actions.hideAutocomplete(state);
            }
            return;
          }
        }
      }

      // Editing Shortcuts
      if (store.uiState.startsWith('editing') && store.editing.editingId) {
        const { editingId } = store.editing;
        const item = state.currentSpace?.items[editingId.id];

        switch (key) {
          case '@': {
            actions.showAutocomplete(state, { editorContext });
            break;
          }
          case 'Tab': {
            switch (editingId.type) {
              case 'tableCell': {
                actions.navigateTableCell(state, info);
                break;
              }
              case 'card': {
                if (info.shiftKey) {
                  actions.liftListItem(state, { editorContext });
                } else {
                  actions.sinkListItem(state, { editorContext });
                }
              }
            }
            e.preventDefault();
            e.stopPropagation();
            break;
          }
          case 'Enter': {
            if (item && item.type === 'table') {
              // @todo implement thiis
              // actions.selectNextTableCell(state, { row: +1 });
            } else {
              actions.splitListItem(state, { editorContext, e });
            }
            break;
          }
          case 'Escape': {
            actions.stopEditing(state);
            actions.enter(state, 'idle');
            break;
          }
          case 'K':
          case 'k': {
            if (info.metaKey || info.ctrlKey) {
              actions.stopEditing(state);
              actions.showSearch(state);
            }
            break;
          }
          case 'Z':
          case 'z': {
            if (info.metaKey || info.ctrlKey) {
              e.preventDefault();
              if (info.shiftKey) {
                actions.redo(state);
              } else {
                actions.undo(state);
              }

              return;
            }
            break;
          }
        }
        return;
      }

      // Everything else
      switch (key) {
        case 'altKey':
        case 'metaKey':
        case 'ctrlKey':
        case 'shiftKey': {
          e.preventDefault();
          state.currentSpace && updatePointingOperation(state as StateWithSpace, info);
          break;
        }
        case 'ArrowUp':
        case 'ArrowDown':
        case 'ArrowLeft':
        case 'ArrowRight': {
          e.preventDefault();
          if (hasSelectedTableCell(state)) {
            actions.navigateTableCell(state, info);
          }
          space && actions.nudgeSelectedShapes(state, info);

          return;
        }

        case 'Tab': {
          e.preventDefault();
          if (hasSelectedTableCell(state)) {
            actions.navigateTableCell(state, info);
          }
          actions.selectNextShape(state, info);

          return;
        }
        case ' ': {
          switch (store.uiState) {
            case 'idle': {
              state.currentSpace && actions.selectTool(state as StateWithSpace, 'hand');
              return;
            }
            case 'panning.idle':
            case 'panning.pointing': {
              return;
            }
          }
          break;
        }
        case 'Backspace': {
          actions.deleteSelected(state, info);
          return;
        }
        case 'K':
        case 'k': {
          if (info.metaKey || info.ctrlKey) {
            actions.showSearch(state);
            return;
          }
          break;
        }
        case 'A':
        case 'a': {
          if (info.metaKey || info.ctrlKey) {
            e.preventDefault();
            actions.selectAllShapes(state, info);

            return;
          }
          break;
        }
        case 'C':
        case 'c': {
          if (info.metaKey || info.ctrlKey) {
            actions.copySelectedShapes(state, info);

            return;
          } else {
            if (!state.store.uiState.startsWith('card')) {
              state.currentSpace && actions.selectTool(state as StateWithSpace, 'card');
            }

            return;
          }
          break;
        }
        case 'X':
        case 'x': {
          if (info.metaKey || info.ctrlKey) {
            actions.cutSelectedShapes(state, info);

            return;
          }
          break;
        }
        case 'V':
        case 'v': {
          if (info.metaKey || info.ctrlKey) {
            state.currentSpace && actions.paste(state as StateWithSpace);

            return;
          }
          break;
        }
        case 'Z':
        case 'z': {
          e.preventDefault();
          if (info.metaKey || info.ctrlKey) {
            if (info.shiftKey) {
              actions.redo(state);
            } else {
              actions.undo(state);
            }

            return;
          }
          break;
        }
        case 'H':
        case 'h': {
          if (!state.store.uiState.startsWith('panning')) {
            state.currentSpace && actions.selectTool(state as StateWithSpace, 'hand');
          }
          break;
        }
        case 'S':
        case 's': {
          if (!state.store.uiState.startsWith('sticky')) {
            state.currentSpace && actions.selectTool(state as StateWithSpace, 'sticky');
          }
          break;
        }
        case 'L':
        case 'l': {
          if (!state.store.uiState.startsWith('link')) {
            state.currentSpace && actions.selectTool(state as StateWithSpace, 'link');
          }
          break;
        }
      }

      if (space && store.editing.selectedIds.length === 1) {
        if (
          key &&
          key !== 'Shift' &&
          key !== 'Tab' &&
          key !== 'Escape' &&
          key !== 'Control' &&
          key !== 'Alt' &&
          key !== 'Meta'
        ) {
          //
          // if the user hits enter, treat it as a click
          if (key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
          }

          // const target = store.editing.selectedIds[0];
          // if (target.type === 'shape' || target.type === 'tableCell') {
          //   actions.startEditing(state, { target });
          // }
        }
      }
    },

    onKeyUp: (key: string, info: TLKeyboardInfo, e: KeyboardEvent | React.KeyboardEvent<any>) => {
      if (store.editing.editingId) {
        return;
      }

      switch (key) {
        case 'altKey':
        case 'metaKey':
        case 'ctrlKey':
        case 'shiftKey': {
          state.currentSpace && updatePointingOperation(state as StateWithSpace, info);
          break;
        }
        case ' ': {
          switch (store.uiState) {
            case 'panning.idle':
            case 'panning.pointing':
            case 'pointing.canvas': {
              actions.enter(state, 'idle');
              break;
            }
            case 'idle': {
              break;
            }
          }
        }
      }
    },

    onTableCellHeightChange: (payload: { target: TableCellTarget; height: number }) => {
      actions.updateTableCellHeight(state, payload);
    },

    onTableCellUpdate: (payload: { target: TableCellTarget; value: any }) => {
      actions.updateTableCell(state, payload);
    },

    // onTableCellFocus: (e: FocusEvent | React.FocusEvent, info: TLFocusInfo<TableCellTarget>) => {
    //   actions.select(state, info);
    // },

    onTableAddRow: (target: TableTarget, e: React.PointerEvent) => {
      actions.addTableRow(state, target);
    },

    onTableAddColumn: (
      editorContext: EditorContextType,
      target: TableTarget,
      e: React.PointerEvent
    ) => {
      actions.addTableColumn(state, target);
    },

    onEditorUpdate: (
      editorContext: EditorContextType,
      target: TextCardTarget,
      view: EditorView,
      isLocalClient: boolean
    ) => {
      if (isLocalClient) {
        actions.setEditorSelection(state, {
          target,
          selection: view.state.selection,
          editorContext,
        });
      }

      if (
        store.uiState === 'editing.autocomplete.showing' &&
        targetEqual(store.editing.editingId, target) &&
        isLocalClient
      ) {
        actions.autocomplete(state, { editorContext });
      }
    },

    onEditorViewInstantiated: (
      editorContext: EditorContextType,
      target: TextCardTarget,
      view: EditorView
    ) => {
      actions.editorViewInstantiated(state, { target, view, editorContext });
    },

    onEditorViewDestroyed: (editorContext: EditorContextType, target: TextCardTarget) => {
      actions.editorViewDestroyed(state, { target, editorContext });
    },

    onSidebarPointItem: (info: TLPointerInfo<SidebarPointerTarget>, e: React.PointerEvent) => {
      switch (info.target.type) {
        case 'search':
          actions.showSearch(state);
          break;
        case 'newSpace': {
          actions.openNewSpace(store);
          break;
        }
        case 'space': {
          actions.openSpace(state, info.target.id);
          break;
        }
        case 'shape':
          actions.openSidebarItem(state, { ...info, target: info.target });
          break;
        case 'catalog':
          actions.openCardCatalog(state);
          break;
        case 'sidebar':
          actions.toggleSidebar(state);
          break;
      }
    },

    onSelectFormatOpen: () => {
      actions.enter(state, 'editing.toolbar.formats.showing');
    },

    onSelectFormatClose: () => {
      if (store.uiState === 'editing.toolbar.formats.showing') {
        actions.enter(state, 'editing');
      }
    },

    onSelectColorOpen: () => {
      actions.enter(state, 'editing.toolbar.colorPicker.showing');
    },

    onSelectColorClose: () => {
      if (store.uiState === 'editing.toolbar.colorPicker.showing') {
        actions.enter(state, 'editing');
      }
    },

    onSelectColor: (colorId: keyof typeof CardColors) => {
      actions.setCardColor(state, { target: { type: 'color', id: colorId } });
    },

    onSetBlockType: (info: { editorContext: EditorContextType; block: Block }) => {
      actions.setBlockType(state, info);
    },

    onToggleMark: (info: { mark: Mark; editorContext: EditorContextType }) => {
      actions.toggleMark(state, info);
    },

    onFocus: (info: TLFocusInfo<TLTarget>, e: React.FocusEvent) => {
      const target = info.target as Target;
      switch (target.type) {
        case 'spaceName': {
          actions.startEditingName(state, { ...info, target });
        }
      }
    },

    onBlur: (info: TLFocusInfo<TLTarget>, e: React.FocusEvent) => {
      switch (info.target.type) {
        case 'spaceName': {
          actions.stopEditingName(state);
        }
      }
    },

    onTextAdded: (target: ShapeTarget, text: XmlFragment) => {
      state.store.editing.texts[target.id] = ref(text);
    },

    onTextChange: (target: ShapeTarget, text: XmlFragment) => {
      state.store.editing.texts[target.id] ||= ref(text);
    },
  };
}

export function useSpaceEvents(space: SpaceStore) {
  const { store } = useAppContext();
  return useMemo(() => getSpaceEvents(store, space), [store, space]);
}

export function getSpaceEvents(store: GlobalStore, space: SpaceStore) {
  const state = { store, currentSpace: space };
  return {
    onClientAdded: (clientId: string, clientState: ClientState) => {
      actions.subscribeClient(state, { clientId, clientState });
    },

    onClientRemoved: (clientId: string) => {
      actions.unsubscribeClient(state, { clientId });
    },

    onZoomToFitClick: () => {
      actions.zoomToFit(state);
    },

    onDrag: (info: TLDragInfo, e: DragEvent | React.DragEvent) => {
      console.debug('drag', info, e);
      // actions.startDrag(store, info);
    },

    onDragEnter: (info: TLDragInfo, e: DragEvent | React.DragEvent) => {
      console.debug('dragEnter', info, e);
      // actions.startDrag(store, info);
      // actions.startDrag(store, info);
    },

    onDragLeave: (info: TLDragInfo, e: DragEvent | React.DragEvent) => {
      console.debug('dragLeave', info, e);
      // actions.startDrag(store, info);
    },

    onDragStart: (info: TLDragInfo, e: DragEvent | React.DragEvent) => {
      console.debug('dragStart', info, e);
      // actions.startDrag(store, info);
    },

    onDragEnd: (info: TLDragInfo, e: DragEvent | React.DragEvent) => {
      console.debug('dragEnd', info, e);
      // actions.startDrag(store, info);
    },

    onDrop: (info: TLDragInfo, e: DragEvent | React.DragEvent) => {
      console.debug('drop', info, e);
      actions.drop(state, info);
      if (info.file) {
        // actions.upload(store, info);
      }
      // actions.startDrag(store, info);
    },

    onHoverShape: (info: TLPointerInfo<TLTarget>, e: React.PointerEvent) => {
      switch (store.uiState) {
        case 'table.column.translating':
        case 'table.row.translating':
        case 'card.idle':
        case 'table.idle':
        case 'text.idle':
        case 'sticky.idle':
        case 'sticky.pointing': {
          return;
        }
        case 'link.idle':
          actions.enter(state, 'link.hovering');
          actions.setHovered(state, info);
          break;
        default: {
          actions.setHovered(state, info);
        }
      }
    },

    onUnhoverShape: (info: TLPointerInfo<TLTarget>, e: React.PointerEvent) => {
      switch (store.uiState) {
        case 'link.hovering': {
          actions.enter(state, 'link.idle');
        }
      }
      actions.clearHovered(state, info);
    },

    onPointShape: (info: TLPointerInfo<TLTarget>, e: React.PointerEvent) => {
      const target = info.target as Target;
      store.editing.pointingId = target;

      if (e.target instanceof HTMLAnchorElement) {
        const cardId = e.target.getAttribute('data-card-id');
        if (cardId) {
          // @todo make a new action goToCard
          // rewrite target to be the link id
          const itemId = findItemIdByDocId(state.currentSpace, cardId);
          if (itemId && target.type === 'shape') {
            actions.goToShape(state, { ...info, target });
            return;
          } else {
            console.warn('[onPointShape] no item found for card', cardId);
          }
        }
      }

      switch (store.uiState) {
        case 'panning.idle': {
          return;
        }
        case 'editing': {
          if (!isTargetSelected(state, target)) {
            actions.stopEditing(state);
            actions.hideAutocomplete(state);
            if (
              target.type === 'shape' ||
              target.type === 'tableCell' ||
              target.type === 'tableColumn' ||
              target.type == 'tableRow' ||
              target.type === 'card'
            ) {
              actions.select(state, { ...info, target });
            }
            // we are in the same overall 'shape', i.e. selecting a
            // table column when we had a table cell selected
            switch (target.type) {
              case 'tableColumn':
                actions.enter(state, 'pointing.table.column');
                break;

              case 'tableRow':
                actions.enter(state, 'pointing.table.row');
                break;

              default: {
                actions.enter(state, 'idle');
              }
            }
          }

          return;
        }
        case 'pointing.bounds':
        case 'idle': {
          if (!isTargetSelected(state, target)) {
            if (
              target.type === 'shape' ||
              target.type === 'tableCell' ||
              target.type === 'tableColumn' ||
              target.type == 'tableRow'
            ) {
              actions.stopEditing(state);
              actions.hideAutocomplete(state);
              actions.select(state, { ...info, target });
            }
            mutables.pointId = info.pointId;
          } else if (info.shiftKey) {
            actions.deselectShape(state, target);
          }

          break;
        }
        case 'contextMenu.showing': {
          actions.hideContextMenu(state);
          break;
        }
        case 'card.idle':
        case 'table.idle':
        case 'text.idle':
        case 'sticky.idle':
        case 'sticky.pointing': {
          return;
        }
        case 'link.hovering': {
          actions.enter(state, 'link.pointing');
          return;
        }
        default: {
          actions.setHovered(state, info);
        }
      }

      switch (target.type) {
        case 'tableColumn': {
          actions.enter(state, 'pointing.table.column');
          break;
        }
        case 'tableRow': {
          actions.enter(state, 'pointing.table.row');
          break;
        }
        default: {
          actions.enter(state, 'pointing.shape');
        }
      }
    },

    onReleaseShape: (info: TLPointerInfo<TLTarget>, e: React.PointerEvent) => {
      const target = info.target as Target;
      const editorContext: EditorContextType = { target: { type: 'space', id: space.docId } };

      switch (store.uiState) {
        case 'pointing.shape': {
          if (isTargetSelected(state, target) && !e.shiftKey && !isConsecutiveClick(info)) {
            if (state.store.editing.selectedIds.length > 1) {
              if (target.type === 'tableCell' || target.type === 'shape') {
                actions.deselectAllButGivenShape(state, target);
              }
            }
            if (target.type === 'tableCell' || target.type === 'shape') {
              actions.startEditing(state, { ...info, target, editorContext });
            }
          }
          break;
        }
      }
    },

    onPointCanvas: (info: TLPointerInfo<{ type: 'canvas' }>, e: React.PointerEvent) => {
      switch (store.uiState) {
        case 'idle': {
          actions.enter(state, 'pointing.canvas');
          if (!info.shiftKey) {
            actions.deselectAll(state);
          }
          break;
        }
        case 'contextMenu.showing': {
          actions.hideContextMenu(state);
          break;
        }
        case 'editing.toolbar.colorPicker.showing':
        case 'editing.autocomplete.showing':
        case 'editing.toolbar.formats.showing':
        case 'editing': {
          actions.stopEditing(state);
          actions.deselectAll(state);
          actions.enter(state, 'pointing.canvas');
          break;
        }
        case 'link.idle': {
          actions.enter(state, 'idle');
          break;
        }
        default: {
          actions.stopEditing(state);
          actions.deselectAll(state);
          break;
        }
      }
    },

    onPointBounds: (info: TLPointerInfo<TLBoundsTarget>, e: React.PointerEvent) => {
      switch (store.uiState) {
        case 'idle': {
          actions.enter(state, 'pointing.bounds');
        }
      }
    },

    onClickFace: (e: React.MouseEvent, clientId: string) => {
      // todo move this check elsewhere
      if (clientId !== space.pageState.followingId && clientId !== store.clientId) {
        actions.startFollowing(state, clientId);
      } else if (state.store.uiState === 'following') {
        actions.stopFollowing(state);
      }
    },

    onPan: (info: TLPointerInfo<{ type: 'wheel' }>, e: React.WheelEvent<Element> | WheelEvent) => {
      if (store.uiState === 'contextMenu.showing') {
        return;
      }

      if (store.uiState === 'editing.autocomplete.showing') {
        return;
      }

      actions.panCamera(space, info);
      if (store.uiState === 'following') {
        actions.stopFollowing(state);
      }
      updatePointingOperation(state, info);
      updateTranslatingOperations(state, info);
    },

    onPinchStart: (
      info: TLPointerInfo<{ type: 'pinch' }>,
      e:
        | React.WheelEvent<Element>
        | WheelEvent
        | React.TouchEvent<Element>
        | TouchEvent
        | React.PointerEvent<Element>
        | PointerEventInit
    ) => {},

    onPinch: (
      info: TLPointerInfo<{ type: 'pinch' }>,
      e:
        | React.WheelEvent<Element>
        | WheelEvent
        | React.TouchEvent<Element>
        | TouchEvent
        | React.PointerEvent<Element>
        | PointerEventInit
    ) => {
      if (state.store.uiState === 'editing.autocomplete.showing') return;
      if (isNaN(info.delta[0]) || isNaN(info.delta[1])) return;
      actions.pinchCamera(space, info);
      if (state.store.uiState === 'following') {
        actions.stopFollowing(state);
      }
    },

    onPinchEnd: (
      info: TLPointerInfo<{ type: 'pinch' }>,
      e:
        | React.WheelEvent<Element>
        | WheelEvent
        | React.TouchEvent<Element>
        | TouchEvent
        | React.PointerEvent<Element>
        | PointerEventInit
    ) => {},

    onPointBoundsHandle: (
      info: TLPointerInfo<TLBoundsHandleTarget>,
      e:
        | React.WheelEvent<Element>
        | WheelEvent
        | React.TouchEvent<Element>
        | TouchEvent
        | React.PointerEvent<Element>
        | PointerEventInit
    ) => {
      actions.setPointedBoundsHandle(state, info);
      actions.enter(state, 'pointing.boundsHandle');
    },

    onBoundsChange: (bounds: TLBounds) => {
      actions.setViewport(state, { bounds });
    },

    onAutoResizeShape: (payload: TLAutoResizeInfo<ShapeTarget>) => {
      actions.autoResizeShape(space, payload);
    },
  };
}
