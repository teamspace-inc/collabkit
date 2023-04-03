import { ClientState, OptimisticState } from 'realtime';
import { Shape } from 'shapes';
import type { MultiDocUndoManager } from 'y-utility/y-multidoc-undomanager';
import type {
  TLBounds,
  TLBoundsEdge,
  TLBoundsHandleTarget,
  TLBoundsTarget,
  TLPageState,
  TLShapeCloneHandleTarget,
  TLSnapLine,
  TLUser,
} from '@tldraw/core';
import { Doc, RelativePosition, XmlFragment } from 'yjs';
import { EditorView } from 'prosemirror-view';
import Fuse from 'fuse.js';

import type { Block, IndexItem, Mark } from '../types';
import { CardColors, ClientColor } from 'utils/Colors';
import { Unsubscribe } from '@firebase/auth';

// Feature Toggles
export const TABLE_ENABLED = false;
export const REFERENCES_ENABLED = false;
export const SHOW_GENERATE_CLIENT_ID_BUTTON = false;

export const PERSIST_DATA = true;
export const FIT_TO_SCREEN_PADDING = 220;
export const SNAP_DISTANCE = 5;
export const ITEMS_KEY = 'items';
export const ITEMS_V2_KEY = 'itemsV2';
export const UNDO_KEY = 'undo';
export const TEXTS_KEY = 'texts';
export const LINKS_KEY = 'links';
export const SPACE_NAME_KEY = 'spaceName';
export const TRANSACTION_ORIGIN = 'valtio';
export const MAX_IMAGE_SIZE = 2048; // in px
export const IMAGE_DOWNSCALE_FACTOR = 4;
export const DISABLED_TOOLS = ['text', 'image'];
export const ZOOM_STEPS = [10, 25, 50, 75, 100, 110, 125, 150, 175, 200, 250, 300, 400, 500].map(
  (zoom) => zoom / 100
);

export const COLUMN_WIDTH = 22;

export const FORMATTING_TOOLBAR_HEIGHT = 39;

export const INDICATOR_STROKE_WIDTH = 2;
export const DEFAULT_TABLE_ROW_HEIGHT = 44;
export const DEFAULT_TABLE_COLUMN_WIDTH = 11 * 14;

export const FOCUS_MODE_WIDTH = COLUMN_WIDTH * 25;

export interface User extends TLUser<Shape> {}

export const Tools = [
  'select',
  'hand',
  'text',
  'card',
  'table',
  'sticky',
  'image',
  'link',
] as const;
export type Tool = typeof Tools[number];

export const Z = {
  CANVAS: 100,
  PANE: 200,
  CANVAS_TOOL: 150,
  SYSTEM_MODAL: 500,
  SHAPE_OVERLAY: 2,
  TEXT_CURSOR: 400,
  __OVERRIDE: 9999,
};

export type PrimitiveItem = {
  id: string;
  type: 'box' | 'text' | 'sticky';
  isDeleted: boolean;
  x: number;
  y: number;
  point?: number[];
};

export type ImageItem = {
  id: string;
  type: 'image';
  size: number[];
  isDeleted: boolean;
  url: string;
  x: number;
  y: number;
  point?: number[];
};

export type CardItem = {
  id: string;
  type: 'card';
  isDeleted: boolean;
  docId: string;
  x: number;
  y: number;
  point?: number[];
  color?: 'lime' | 'yellow' | 'sky' | 'violet' | 'amber' | 'sand';
};

export type TableItem = {
  id: string;
  type: 'table';
  isDeleted: boolean;
  docId: string;
  x: number;
  y: number;
  point?: number[];
};

export type CardType = 'text' | 'table';

export type Item = PrimitiveItem | ImageItem | CardItem | TableItem;
export type ItemWithSize = Item & { size: number[] };

export const PAGE_ID = 'page1';

export type PageState = Omit<TLPageState<Shape>, 'editingId' | 'selectedIds'> & {
  tool: Tool;
};

export const INITIAL_PAGE_STATE: PageState = {
  id: PAGE_ID,
  isDragging: false,
  isResizing: false,
  clipboard: {
    state: 'idle',
    ids: [],
    count: 0,
  },
  camera: {
    point: [0, 0],
    zoom: 1,
  },
  tool: 'select',
  followingId: null,
  brush: null,
  hiddenIds: [],
  pointedId: null,
  hoveredId: null,
  toolPreview: null,
  hasSizes: {},
};

export type LiveItem = { point: number[]; size?: number[] };

export type RealtimeClients = Record<string, RealtimeClient>;

export type RealtimeClient = ClientState & { transactions?: Record<number, RealtimeTransaction> };

export type RealtimeTransaction = {
  drag: number[];
  resize: number[];
};

export type Search = {
  query?: string;
  results?: Fuse.FuseResult<IndexItem>[];
  engine: Fuse<IndexItem>;
  selectedId: TextCardTarget | null;
  indexedItems: Record<string, IndexItem>;
};

export type SpaceData = Readonly<SpaceStore>;

export type TableCellTarget = {
  type: 'tableCell';
  id: string;
  docId: string;
  rowId: string;
  columnId: string;
};

export type PaneTarget = {
  type: 'pane';
  id: string;
};

export type TableRowTarget = {
  type: 'tableRow';
  id: string;
  docId: string;
};

export type TableColumnTarget = {
  type: 'tableColumn';
  id: string;
  docId: string;
};

export type ShapeTarget = {
  type: 'shape';
  id: string;
};

export type TextCardTarget = {
  type: 'card';
  id: string;
};

export type TableTarget = {
  type: 'table';
  id: string;
};

export type ColorTarget = {
  type: 'color';
  id: keyof typeof CardColors;
};

export type SpaceTarget = {
  type: 'space';
  id: string;
};

export type SpaceNameTarget = { type: 'spaceName'; id: string; docId: string };

export type AppTarget = {
  type: 'app';
  id: 'app'; // for convenience
};

export type MenuItemTarget = {
  type: 'menuItem';
  id: MenuItem;
};

export type Target =
  | { type: 'canvas'; id: string }
  | ShapeTarget
  | TextCardTarget
  | { type: 'sidebarItem'; id: string }
  | TableCellTarget
  | TableRowTarget
  | TableColumnTarget
  | TableTarget
  | { type: 'bounds' }
  | SpaceTarget
  | MenuItemTarget
  | SpaceNameTarget
  | TLBoundsHandleTarget
  | TLBoundsTarget
  | TLShapeCloneHandleTarget
  | SidebarPointerTarget;

export type LinkableTarget = TextCardTarget;

export type SidebarPointerTarget =
  | { type: 'search' }
  | { type: 'newSpace' }
  | { type: 'space'; id: string }
  | ShapeTarget
  | { type: 'catalog' }
  | { type: 'sidebar' };

export type MenuItem =
  | 'selectAll'
  | 'paste'
  | 'copy'
  | 'cut'
  | 'delete'
  | 'duplicate'
  | 'undo'
  | 'redo'
  | 'deleteTableRow'
  | 'deleteTableColumn'
  | 'addTableRow'
  | 'addTableColumn'
  | 'insertTableRowAbove'
  | 'insertTableRowBelow'
  | 'insertTableColumnLeft'
  | 'insertTableColumnRight'
  | 'hideSpace'
  | 'link'
  | 'unlink'
  | 'startLinking'
  | 'divider';

export type ContextMenuStore = {
  menuItems: MenuItem[];
  labels: Record<MenuItem, string>;
  canvasPoint: number[]; // canvasPoint
  point: number[];
  target?: Target;
};

export type GlobalStore = UserStore & {
  clientId: string;
  uiState: UIState;
  clients: Record<string, ClientStore>;
  connectionState: ConnectionState;
  cards: Record<string, CardStore>; // docId -> ref(doc)
  spaces: Record<string, SpaceStore>;
  isSidebarOpen: boolean;
  savedSpaces: SavedSpace[];
  lastOpenedSpaceId: string | null;
  search: Search;
  editing: EditingStore;
  focusModeId?: TextCardTarget | ShapeTarget;
  promptToRefresh: boolean;
  readOnly: boolean;
  contextMenu: ContextMenuStore;
};

export type SavedSpace = {
  id: string;
  name?: string;
};

export type AutocompleteStore = {
  point: number[];
  from: number;
  query: string;
  scrollTop: number;
  navigatedBy: 'keyboard' | 'mouse';
  results: Fuse.FuseResult<IndexItem>[];
  hoveredId: TableTarget | TextCardTarget | null;
  selectedId: TableTarget | TextCardTarget | null;
  isHidden: boolean;
};

export type Version = Record<DocType, number>;

export type Formatting = {
  block: Block;
  marks?: Mark[];
  isVisible?: boolean;
};

export type Binding = {
  load: () => Promise<void>;
  subscribe: () => void;
  unsubscribe: () => void;
};

export type ClientStore = {
  uid: string;
  color: string;
  createdAt: number;
};

// Common properties of stores that have a YJS Doc backend.
export type SharedStore = {
  readonly docId: string;
  doc: Doc | null;
  docIsLoading: boolean;
  binding: Binding | null;
  linkedDocs: Doc[];
  undoManager?: MultiDocUndoManager;
  appliedTransactions: Record<string, number[]>; // clientId -> [transactionId]
};

export type LinkStore = {
  backlinks: Record<string, { type: SelectableTarget['type'] }>;
  links: Record<string, { type: SelectableTarget['type'] }>; // targetId -> { type: string }
};

/** Realtime collaboration and precence */
export type RealtimeStore = {
  realtime: RealtimeClients;
  optimistic: OptimisticState;
  cursor: number[];
  transactionId: number | undefined;
  subs: Record<string, Unsubscribe | undefined>;
};

export type TextCursor = { anchor: RelativePosition; head: RelativePosition };

export type TableCursor = { rowId: string; columnId: string };

export type TextCursors = Record<string, Record<string, TextCursor> | null>; // docId -> clientId -> cursor

export type TableCursors = Record<string, Record<string, TableCursor> | null>; // docId -> clientId -> cursor

export type TextEditingStore = {
  autocomplete: AutocompleteStore;
  formatting: Formatting | null;
  editors: Record<string, EditorView>;
  texts: Record<string, XmlFragment>;

  // other clients cursors
  yCursors: TextCursors;

  // this clients cursors, for each doc being edited
  localYCursors: Record<string, TextCursor | null>; // docId -> cursor
};

export type Cell = {
  rowIndex: number;
  columnIndex: number;
  value: any;
  target: TableCellTarget;
  bounds: TLBounds;
};

export type Row = {
  index: number;
  id: string;
  target: TableRowTarget;
  bounds: TLBounds;
  cells: Record<string, Cell>;
};

export type Column = {
  index: number;
  title: string;
  id: string;
  target: TableColumnTarget;
  bounds: TLBounds;
};

export type Table = {
  size: number[];
  rows: { [rowId: string]: Row };
  columns: Column[];
  target: TableTarget;
  bounds: TLBounds;
};

export type SelectableTarget =
  | ShapeTarget
  | TableTarget
  | TableCellTarget
  | TextCardTarget
  | TableRowTarget
  | TableColumnTarget;

export type EditableTarget =
  | ShapeTarget
  | TableTarget
  | TableCellTarget
  | TextCardTarget
  | SpaceNameTarget;

export type TableTargets = TableColumnTarget | TableRowTarget | TableCellTarget;

export type TableData = {
  cellValues: Record<string, string | undefined>;
  rows: Record<string, string>;
  columns: Record<string, string>;
  deleted: Record<string, true>;
  columnWidths: Record<string, number>;
  rowHeights: Record<string, number>;
};

export type TableOrder = {};

export type TableEditingStore = {
  tables: Record<string, TableData>; // docId -> Table

  translating: {
    delta: number[];
    target: TableColumnTarget | TableRowTarget;
    edge: TLBoundsEdge | null;
    index: number;
  } | null;

  hoveringId: Target | null;
  pointingId: Target | null;
  selectedIds: SelectableTarget[];
};

/** Text editor UI state */
export type EditingStore = {
  editingId: EditableTarget | null;
} & TextEditingStore &
  TableEditingStore;

/** User properties */
export type UserStore = {
  color: ClientColor;
};

/** Canvas state */
export type CanvasStore = {
  items: Record<string, Item>;
  sizes: Record<string, number[]>;
  links: string[][];
  pageState: PageState;
  overlays: {
    snapLines: TLSnapLine[];
  };
};

export type DocType = 'space' | 'card';

export type SpaceStore = CanvasStore & SharedStore & RealtimeStore;

export type CardStore = SharedStore & {
  props: LinkStore;
};

export type CursorStore = {
  cursor: number[];
};

export type State = {
  store: GlobalStore;
  currentSpace?: SpaceStore;
};

export type StateWithSpace = {
  store: GlobalStore;
  currentSpace: SpaceStore;
};

export type ConnectionState = 'offline' | 'online' | 'new';

export type UIState =
  | 'idle'
  | 'pointing.canvas'
  | 'pointing.boundsHandle'
  | 'pointing.bounds'
  | 'pointing.shape'
  | 'translating'
  | 'transforming'
  | 'brushSelecting'
  | 'box.idle'
  | 'box.pointing'
  | 'box.creating'
  | 'image.idle'
  | 'image.pointing'
  | 'image.creating'
  | 'text.idle'
  | 'text.pointing'
  | 'text.creating'
  | 'sticky.idle'
  | 'sticky.pointing'
  | 'card.idle'
  | 'card.pointing'
  | 'table.idle'
  | 'table.pointing'
  | 'link.idle'
  | 'link.pointing'
  | 'link.hovering'
  | 'panning.pointing'
  | 'panning.idle'
  | 'contextMenu.showing'
  | 'drag.pointing'
  | 'drag.dropped'
  | 'search.showing'
  | 'spaceName.editing'
  | 'editing'
  | 'editing.autocomplete.showing'
  | 'editing.toolbar.formats.showing'
  | 'editing.toolbar.colorPicker.showing'
  | 'pointing.table.column'
  | 'pointing.table.row'
  | 'table.column.translating'
  | 'table.column.resizing'
  | 'table.row.translating'
  | 'following';
