import { proxy, ref } from 'valtio/vanilla';
import { devtools } from 'valtio/utils';
import Fuse from 'fuse.js';

import { INITIAL_PAGE_STATE, SpaceStore, GlobalStore } from './constants';
import { DEV } from '../environment';

import setupLocalStorage from '../utils/setupLocalStorage';
import shuffle from '../utils/shuffle';

// pick a random client color
import { ClientColor, ClientColors } from '../utils/Colors';
import { nanoid } from 'utils/nanoid';
const colors = shuffle(Object.keys(ClientColors)) as ClientColor[];
export const color = colors[0];

export const store = createGlobalStore();

export function createGlobalStore() {
  return proxy<GlobalStore>({
    clientId: nanoid(),
    uiState: 'idle',
    spaces: {},
    cards: {},
    isSidebarOpen: false,
    connectionState: 'new',
    savedSpaces: [],
    lastOpenedSpaceId: null,
    focusModeId: undefined,
    clients: {},
    search: {
      query: undefined,
      results: undefined,
      engine: ref(
        new Fuse([], { keys: ['text', 'title'], findAllMatches: true, ignoreLocation: true })
      ),
      selectedId: null,
      indexedItems: {},
    },
    editing: {
      editingId: null,

      // Text
      autocomplete: {
        point: [0, 0],
        from: 0,
        query: '',
        scrollTop: 0,
        navigatedBy: 'keyboard', // autocomplete is triggered by keyboard so we start in this state.
        results: [],
        hoveredId: null,
        selectedId: null,
        isHidden: true,
      },
      formatting: null,
      editors: {},
      texts: {},
      yCursors: {},
      localYCursors: {},

      // Table
      tables: {},
      selectedIds: [],
      translating: null,
      hoveringId: null,
      pointingId: null,
    },
    color,
    promptToRefresh: false,
    readOnly: false,
    contextMenu: {
      menuItems: [],
      labels: {
        divider: '',
        selectAll: 'Select All',
        paste: 'Paste',
        copy: 'Copy',
        cut: 'Cut',
        delete: 'Delete',
        duplicate: 'Duplicate',
        undo: 'Undo',
        redo: 'Redo',
        deleteTableRow: 'Delete Row',
        deleteTableColumn: 'Delete Column',
        addTableRow: 'Add Row',
        addTableColumn: 'Add Column',
        insertTableRowAbove: 'Insert Above',
        insertTableRowBelow: 'Insert Below',
        insertTableColumnLeft: 'Insert Left',
        insertTableColumnRight: 'Insert Right',
        hideSpace: 'Hide',
        link: 'Link',
        unlink: 'Unlink',
        startLinking: 'Link to',
      },
      point: [0, 0],
      canvasPoint: [0, 0],
    },
  });
}

setupLocalStorage(store);

if (DEV) {
  devtools(store, 'store');
}

export function getSpaceStore(docId: string): SpaceStore {
  if (store.spaces[docId] == null) {
    store.spaces[docId] = createSpaceStore(docId);
  }
  return store.spaces[docId];
}

export function createSpaceStore(docId: string): SpaceStore {
  return {
    items: {},
    sizes: {},
    subs: {},
    pageState: INITIAL_PAGE_STATE,
    doc: null,
    docIsLoading: true,
    docId,
    realtime: {},
    optimistic: {},
    transactionId: undefined,
    overlays: {
      snapLines: [],
    },
    binding: null,
    appliedTransactions: {},
    links: [],
    cursor: [0, 0],
    linkedDocs: [],
    undoManager: undefined,
  };
}
