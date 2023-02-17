/// <reference types="react" />
import { CommentableTarget, ShowSidebarButtonTarget } from '@collabkit/core';
import * as React from 'react';
import React__default, { ReactNode } from 'react';

declare const colors = {
  amber: 'hsla(41, 95%, 66%, 1)',
  blue: 'hsla(211, 94%, 62%, 1)',
  brown: 'hsla(28, 36%, 54%, 1)',
  crimson: 'hsla(342, 70%, 62%, 1)',
  cyan: 'hsla(192, 55%, 50%, 1)',
  grass: 'hsla(124, 30%, 53%, 1)',
  green: 'hsla(146, 34%, 49%, 1)',
  indigo: 'hsla(225, 70%, 59%, 1)',
  lime: 'hsla(74, 78%, 64%, 1)',
  mint: 'hsla(162, 71%, 78%, 1)',
  orange: 'hsla(23, 90%, 60%, 1)',
  pink: 'hsla(325, 60%, 59%, 1)',
  plum: 'hsla(291, 43%, 55%, 1)',
  purple: 'hsla(268, 50%, 58%, 1)',
  red: 'hsla(2, 73%, 62%, 1)',
  sky: 'hsla(194, 96%, 78%, 1)',
  teal: 'hsla(173, 45%, 46%, 1)',
  tomato: 'hsla(11, 71%, 58%, 1)',
  violet: 'hsla(11, 71%, 58%, 1)',
  yellow: 'hsla(52, 100%, 71%, 1)',
};

type Color = keyof typeof colors;

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

declare type SerializedElementNode = Spread<
  {
    children: Array<SerializedLexicalNode>;
    direction: 'ltr' | 'rtl' | null;
    format: ElementFormatType;
    indent: number;
  },
  SerializedLexicalNode
>;
declare type ElementFormatType = 'left' | 'center' | 'right' | 'justify' | '';
/** @noInheritDoc */
declare class ElementNode extends LexicalNode {
  /** @internal */
  __children: Array<NodeKey>;
  /** @internal */
  __format: number;
  /** @internal */
  __indent: number;
  /** @internal */
  __dir: 'ltr' | 'rtl' | null;
  constructor(key?: NodeKey);
  getFormat(): number;
  getFormatType(): ElementFormatType;
  getIndent(): number;
  getChildren<T extends LexicalNode>(): Array<T>;
  getChildrenKeys(): Array<NodeKey>;
  getChildrenSize(): number;
  isEmpty(): boolean;
  isDirty(): boolean;
  isLastChild(): boolean;
  getAllTextNodes(includeInert?: boolean): Array<TextNode>;
  getFirstDescendant<T extends LexicalNode>(): null | T;
  getLastDescendant<T extends LexicalNode>(): null | T;
  getDescendantByIndex<T extends LexicalNode>(index: number): null | T;
  getFirstChild<T extends LexicalNode>(): null | T;
  getFirstChildOrThrow<T extends LexicalNode>(): T;
  getLastChild<T extends LexicalNode>(): null | T;
  getChildAtIndex<T extends LexicalNode>(index: number): null | T;
  getTextContent(includeInert?: boolean, includeDirectionless?: false): string;
  getDirection(): 'ltr' | 'rtl' | null;
  hasFormat(type: ElementFormatType): boolean;
  select(_anchorOffset?: number, _focusOffset?: number): RangeSelection;
  selectStart(): RangeSelection;
  selectEnd(): RangeSelection;
  clear(): this;
  append(...nodesToAppend: LexicalNode[]): this;
  setDirection(direction: 'ltr' | 'rtl' | null): this;
  setFormat(type: ElementFormatType): this;
  setIndent(indentLevel: number): this;
  splice(start: number, deleteCount: number, nodesToInsert: Array<LexicalNode>): this;
  exportJSON(): SerializedElementNode;
  insertNewAfter(selection: RangeSelection): null | LexicalNode;
  canInsertTab(): boolean;
  canIndent(): boolean;
  collapseAtStart(selection: RangeSelection): boolean;
  excludeFromCopy(destination?: 'clone' | 'html'): boolean;
  canExtractContents(): boolean;
  canReplaceWith(replacement: LexicalNode): boolean;
  canInsertAfter(node: LexicalNode): boolean;
  canBeEmpty(): boolean;
  canInsertTextBefore(): boolean;
  canInsertTextAfter(): boolean;
  isInline(): boolean;
  canMergeWith(node: ElementNode): boolean;
  extractWithChild(
    child: LexicalNode,
    selection: RangeSelection | NodeSelection | GridSelection | null,
    destination: 'clone' | 'html'
  ): boolean;
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

declare type SerializedTextNode = Spread<
  {
    detail: number;
    format: number;
    mode: TextModeType;
    style: string;
    text: string;
  },
  SerializedLexicalNode
>;
declare type TextFormatType =
  | 'bold'
  | 'underline'
  | 'strikethrough'
  | 'italic'
  | 'code'
  | 'subscript'
  | 'superscript';
declare type TextDetailType = 'directionless' | 'unmergable';
declare type TextModeType = 'normal' | 'token' | 'segmented' | 'inert';
/** @noInheritDoc */
declare class TextNode extends LexicalNode {
  __text: string;
  __format: number;
  __style: string;
  __mode: 0 | 1 | 2 | 3;
  __detail: number;
  static getType(): string;
  static clone(node: TextNode): TextNode;
  constructor(text: string, key?: NodeKey);
  getFormat(): number;
  getDetail(): number;
  getMode(): TextModeType;
  getStyle(): string;
  isToken(): boolean;
  isComposing(): boolean;
  isSegmented(): boolean;
  isInert(): boolean;
  isDirectionless(): boolean;
  isUnmergeable(): boolean;
  hasFormat(type: TextFormatType): boolean;
  isSimpleText(): boolean;
  getTextContent(includeInert?: boolean, includeDirectionless?: false): string;
  getFormatFlags(type: TextFormatType, alignWithFormat: null | number): number;
  createDOM(config: EditorConfig): HTMLElement;
  updateDOM(prevNode: TextNode, dom: HTMLElement, config: EditorConfig): boolean;
  static importDOM(): DOMConversionMap | null;
  static importJSON(serializedNode: SerializedTextNode): TextNode;
  exportJSON(): SerializedTextNode;
  selectionTransform(
    prevSelection: null | RangeSelection | NodeSelection | GridSelection,
    nextSelection: RangeSelection
  ): void;
  setFormat(format: TextFormatType | number): this;
  setDetail(detail: TextDetailType | number): this;
  setStyle(style: string): this;
  toggleFormat(type: TextFormatType): this;
  toggleDirectionless(): this;
  toggleUnmergeable(): this;
  setMode(type: TextModeType): this;
  setTextContent(text: string): this;
  select(_anchorOffset?: number, _focusOffset?: number): RangeSelection;
  spliceText(offset: number, delCount: number, newText: string, moveSelection?: boolean): TextNode;
  canInsertTextBefore(): boolean;
  canInsertTextAfter(): boolean;
  splitText(...splitOffsets: Array<number>): Array<TextNode>;
  mergeWithSibling(target: TextNode): TextNode;
  isTextEntity(): boolean;
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

declare type TextPointType = {
  _selection: RangeSelection | GridSelection;
  getNode: () => TextNode;
  is: (point: PointType) => boolean;
  isAtNodeEnd: () => boolean;
  isBefore: (point: PointType) => boolean;
  key: NodeKey;
  offset: number;
  set: (key: NodeKey, offset: number, type: 'text' | 'element') => void;
  type: 'text';
};
declare type ElementPointType = {
  _selection: RangeSelection | GridSelection;
  getNode: () => ElementNode;
  is: (point: PointType) => boolean;
  isAtNodeEnd: () => boolean;
  isBefore: (point: PointType) => boolean;
  key: NodeKey;
  offset: number;
  set: (key: NodeKey, offset: number, type: 'text' | 'element') => void;
  type: 'element';
};
declare type PointType = TextPointType | ElementPointType;
interface BaseSelection {
  clone(): BaseSelection;
  dirty: boolean;
  extract(): Array<LexicalNode>;
  getNodes(): Array<LexicalNode>;
  getTextContent(): string;
  insertRawText(text: string): void;
  is(selection: null | RangeSelection | NodeSelection | GridSelection): boolean;
}
declare class NodeSelection implements BaseSelection {
  _nodes: Set<NodeKey>;
  dirty: boolean;
  _cachedNodes: null | Array<LexicalNode>;
  constructor(objects: Set<NodeKey>);
  is(selection: null | RangeSelection | NodeSelection | GridSelection): boolean;
  add(key: NodeKey): void;
  delete(key: NodeKey): void;
  clear(): void;
  has(key: NodeKey): boolean;
  clone(): NodeSelection;
  extract(): Array<LexicalNode>;
  insertRawText(text: string): void;
  insertText(): void;
  getNodes(): Array<LexicalNode>;
  getTextContent(): string;
}
declare type GridSelectionShape = {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
};
declare class GridSelection implements BaseSelection {
  gridKey: NodeKey;
  anchor: PointType;
  focus: PointType;
  dirty: boolean;
  _cachedNodes: Array<LexicalNode> | null;
  constructor(gridKey: NodeKey, anchor: PointType, focus: PointType);
  is(selection: null | RangeSelection | NodeSelection | GridSelection): boolean;
  set(gridKey: NodeKey, anchorCellKey: NodeKey, focusCellKey: NodeKey): void;
  clone(): GridSelection;
  isCollapsed(): boolean;
  isBackward(): boolean;
  getCharacterOffsets(): [number, number];
  extract(): Array<LexicalNode>;
  insertRawText(text: string): void;
  insertText(): void;
  getShape(): GridSelectionShape;
  getNodes(): Array<LexicalNode>;
  getTextContent(): string;
}
declare class RangeSelection implements BaseSelection {
  anchor: PointType;
  focus: PointType;
  dirty: boolean;
  format: number;
  _cachedNodes: null | Array<LexicalNode>;
  constructor(anchor: PointType, focus: PointType, format: number);
  is(selection: null | RangeSelection | NodeSelection | GridSelection): boolean;
  isBackward(): boolean;
  isCollapsed(): boolean;
  getNodes(): Array<LexicalNode>;
  setTextNodeRange(
    anchorNode: TextNode,
    anchorOffset: number,
    focusNode: TextNode,
    focusOffset: number
  ): void;
  getTextContent(): string;
  applyDOMRange(range: StaticRange): void;
  clone(): RangeSelection;
  toggleFormat(format: TextFormatType): void;
  hasFormat(type: TextFormatType): boolean;
  insertRawText(text: string): void;
  insertText(text: string): void;
  removeText(): void;
  formatText(formatType: TextFormatType): void;
  insertNodes(nodes: Array<LexicalNode>, selectStart?: boolean): boolean;
  insertParagraph(): void;
  insertLineBreak(selectStart?: boolean): void;
  getCharacterOffsets(): [number, number];
  extract(): Array<LexicalNode>;
  modify(
    alter: 'move' | 'extend',
    isBackward: boolean,
    granularity: 'character' | 'word' | 'lineboundary'
  ): void;
  deleteCharacter(isBackward: boolean): void;
  deleteLine(isBackward: boolean): void;
  deleteWord(isBackward: boolean): void;
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

declare type NodeMap = Map<NodeKey, LexicalNode>;
declare type SerializedLexicalNode = {
  type: string;
  version: number;
};
declare type DOMConversion<T extends HTMLElement = HTMLElement> = {
  conversion: DOMConversionFn<T>;
  priority: 0 | 1 | 2 | 3 | 4;
};
declare type DOMConversionFn<T extends HTMLElement = HTMLElement> = (
  element: T,
  parent?: Node
) => DOMConversionOutput | null;
declare type DOMChildConversion = (
  lexicalNode: LexicalNode,
  parentLexicalNode: LexicalNode | null | undefined
) => LexicalNode | null | undefined;
declare type DOMConversionMap<T extends HTMLElement = HTMLElement> = Record<
  NodeName,
  (node: T) => DOMConversion<T> | null
>;
declare type NodeName = string;
declare type DOMConversionOutput = {
  after?: (childLexicalNodes: Array<LexicalNode>) => Array<LexicalNode>;
  forChild?: DOMChildConversion;
  node: LexicalNode | null;
};
declare type DOMExportOutput = {
  after?: (generatedElement: HTMLElement | null | undefined) => HTMLElement | null | undefined;
  element: HTMLElement | null;
};
declare type NodeKey = string;
declare class LexicalNode {
  [x: string]: any;
  /** @internal */
  __type: string;
  /** @internal */
  __key: string;
  /** @internal */
  __parent: null | NodeKey;
  static getType(): string;
  static clone(_data: unknown): LexicalNode;
  constructor(key?: NodeKey);
  getType(): string;
  isAttached(): boolean;
  isSelected(): boolean;
  getKey(): NodeKey;
  getIndexWithinParent(): number;
  getParent<T extends ElementNode>(): T | null;
  getParentOrThrow<T extends ElementNode>(): T;
  getTopLevelElement(): ElementNode | this | null;
  getTopLevelElementOrThrow(): ElementNode | this;
  getParents(): Array<ElementNode>;
  getParentKeys(): Array<NodeKey>;
  getPreviousSibling<T extends LexicalNode>(): T | null;
  getPreviousSiblings<T extends LexicalNode>(): Array<T>;
  getNextSibling<T extends LexicalNode>(): T | null;
  getNextSiblings<T extends LexicalNode>(): Array<T>;
  getCommonAncestor<T extends ElementNode = ElementNode>(node: LexicalNode): T | null;
  is(object: LexicalNode | null | undefined): boolean;
  isBefore(targetNode: LexicalNode): boolean;
  isParentOf(targetNode: LexicalNode): boolean;
  getNodesBetween(targetNode: LexicalNode): Array<LexicalNode>;
  isDirty(): boolean;
  getLatest(): this;
  getWritable(): this;
  getTextContent(_includeInert?: boolean, _includeDirectionless?: false): string;
  getTextContentSize(includeInert?: boolean, includeDirectionless?: false): number;
  createDOM(_config: EditorConfig, _editor: LexicalEditor): HTMLElement;
  updateDOM(_prevNode: unknown, _dom: HTMLElement, _config: EditorConfig): boolean;
  exportDOM(editor: LexicalEditor): DOMExportOutput;
  exportJSON(): SerializedLexicalNode;
  static importJSON(_serializedNode: SerializedLexicalNode): LexicalNode;
  remove(preserveEmptyParent?: boolean): void;
  replace<N extends LexicalNode>(replaceWith: N): N;
  insertAfter(nodeToInsert: LexicalNode): LexicalNode;
  insertBefore(nodeToInsert: LexicalNode): LexicalNode;
  selectPrevious(anchorOffset?: number, focusOffset?: number): RangeSelection;
  selectNext(anchorOffset?: number, focusOffset?: number): RangeSelection;
  markDirty(): void;
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

declare type SerializedRootNode = SerializedElementNode;

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

interface SerializedEditorState {
  root: SerializedRootNode;
}
declare class EditorState {
  _nodeMap: NodeMap;
  _selection: null | RangeSelection | NodeSelection | GridSelection;
  _flushSync: boolean;
  _readOnly: boolean;
  constructor(nodeMap: NodeMap, selection?: RangeSelection | NodeSelection | GridSelection | null);
  isEmpty(): boolean;
  read<V>(callbackFn: () => V): V;
  clone(selection?: RangeSelection | NodeSelection | GridSelection | null): EditorState;
  toJSON(): SerializedEditorState;
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

declare type Spread<T1, T2> = Omit<T2, keyof T1> & T1;
declare type Klass<T extends LexicalNode> = {
  new (...args: any[]): T;
} & Omit<LexicalNode, 'constructor'>;
declare type EditorThemeClassName = string;
declare type TextNodeThemeClasses = {
  base?: EditorThemeClassName;
  bold?: EditorThemeClassName;
  code?: EditorThemeClassName;
  italic?: EditorThemeClassName;
  strikethrough?: EditorThemeClassName;
  subscript?: EditorThemeClassName;
  superscript?: EditorThemeClassName;
  underline?: EditorThemeClassName;
  underlineStrikethrough?: EditorThemeClassName;
};
declare type EditorUpdateOptions = {
  onUpdate?: () => void;
  skipTransforms?: true;
  tag?: string;
};
declare type EditorSetOptions = {
  tag?: string;
};
declare type EditorFocusOptions = {
  defaultSelection?: 'rootStart' | 'rootEnd';
};
declare type EditorThemeClasses = {
  characterLimit?: EditorThemeClassName;
  code?: EditorThemeClassName;
  codeHighlight?: Record<string, EditorThemeClassName>;
  hashtag?: EditorThemeClassName;
  heading?: {
    h1?: EditorThemeClassName;
    h2?: EditorThemeClassName;
    h3?: EditorThemeClassName;
    h4?: EditorThemeClassName;
    h5?: EditorThemeClassName;
    h6?: EditorThemeClassName;
  };
  image?: EditorThemeClassName;
  link?: EditorThemeClassName;
  list?: {
    ul?: EditorThemeClassName;
    ulDepth?: Array<EditorThemeClassName>;
    ol?: EditorThemeClassName;
    olDepth?: Array<EditorThemeClassName>;
    listitem?: EditorThemeClassName;
    listitemChecked?: EditorThemeClassName;
    listitemUnchecked?: EditorThemeClassName;
    nested?: {
      list?: EditorThemeClassName;
      listitem?: EditorThemeClassName;
    };
  };
  ltr?: EditorThemeClassName;
  mark?: EditorThemeClassName;
  markOverlap?: EditorThemeClassName;
  paragraph?: EditorThemeClassName;
  quote?: EditorThemeClassName;
  root?: EditorThemeClassName;
  rtl?: EditorThemeClassName;
  table?: EditorThemeClassName;
  tableCell?: EditorThemeClassName;
  tableCellHeader?: EditorThemeClassName;
  tableRow?: EditorThemeClassName;
  text?: TextNodeThemeClasses;
  embedBlock?: {
    base?: EditorThemeClassName;
    focus?: EditorThemeClassName;
  };
  [key: string]: any;
};
declare type EditorConfig = {
  disableEvents?: boolean;
  namespace: string;
  theme: EditorThemeClasses;
};
declare type RegisteredNodes = Map<string, RegisteredNode>;
declare type RegisteredNode = {
  klass: Klass<LexicalNode>;
  transforms: Set<Transform<LexicalNode>>;
};
declare type Transform<T extends LexicalNode> = (node: T) => void;
declare type ErrorHandler = (error: Error) => void;
declare type MutationListeners = Map<MutationListener, Klass<LexicalNode>>;
declare type NodeMutation = 'created' | 'updated' | 'destroyed';
declare type UpdateListener = (arg0: {
  dirtyElements: Map<NodeKey, IntentionallyMarkedAsDirtyElement>;
  dirtyLeaves: Set<NodeKey>;
  editorState: EditorState;
  normalizedNodes: Set<NodeKey>;
  prevEditorState: EditorState;
  tags: Set<string>;
}) => void;
declare type DecoratorListener<T = never> = (decorator: Record<NodeKey, T>) => void;
declare type RootListener = (
  rootElement: null | HTMLElement,
  prevRootElement: null | HTMLElement
) => void;
declare type TextContentListener = (text: string) => void;
declare type MutationListener = (
  nodes: Map<NodeKey, NodeMutation>,
  payload: {
    updateTags: Set<string>;
    dirtyLeaves: Set<string>;
  }
) => void;
declare type CommandListener<P> = (payload: P, editor: LexicalEditor) => boolean;
declare type EditableListener = (editable: boolean) => void;
declare type CommandListenerPriority = 0 | 1 | 2 | 3 | 4;
declare type LexicalCommand<TPayload> = Record<string, never>;
/**
 * Type helper for extracting the payload type from a command.
 *
 * @example
 * ```ts
 * const MY_COMMAND = createCommand<SomeType>();
 *
 * // ...
 *
 * editor.registerCommand(MY_COMMAND, payload => {
 *   // Type of `payload` is inferred here. But lets say we want to extract a function to delegate to
 *   handleMyCommand(editor, payload);
 *   return true;
 * });
 *
 * function handleMyCommand(editor: LexicalEditor, payload: CommandPayloadType<typeof MY_COMMAND>) {
 *   // `payload` is of type `SomeType`, extracted from the command.
 * }
 * ```
 */
declare type CommandPayloadType<TCommand extends LexicalCommand<unknown>> =
  TCommand extends LexicalCommand<infer TPayload> ? TPayload : never;
declare type Commands = Map<LexicalCommand<unknown>, Array<Set<CommandListener<unknown>>>>;
declare type Listeners = {
  decorator: Set<DecoratorListener>;
  mutation: MutationListeners;
  editable: Set<EditableListener>;
  root: Set<RootListener>;
  textcontent: Set<TextContentListener>;
  update: Set<UpdateListener>;
};
declare type IntentionallyMarkedAsDirtyElement = boolean;
declare type DOMConversionCache = Map<string, Array<(node: Node) => DOMConversion | null>>;
declare type SerializedEditor = {
  editorState: SerializedEditorState;
};
declare class LexicalEditor {
  _headless: boolean;
  _parentEditor: null | LexicalEditor;
  _rootElement: null | HTMLElement;
  _editorState: EditorState;
  _pendingEditorState: null | EditorState;
  _compositionKey: null | NodeKey;
  _deferred: Array<() => void>;
  _keyToDOMMap: Map<NodeKey, HTMLElement>;
  _updates: Array<[() => void, EditorUpdateOptions | undefined]>;
  _updating: boolean;
  _listeners: Listeners;
  _commands: Commands;
  _nodes: RegisteredNodes;
  _decorators: Record<NodeKey, unknown>;
  _pendingDecorators: null | Record<NodeKey, unknown>;
  _config: EditorConfig;
  _dirtyType: 0 | 1 | 2;
  _cloneNotNeeded: Set<NodeKey>;
  _dirtyLeaves: Set<NodeKey>;
  _dirtyElements: Map<NodeKey, IntentionallyMarkedAsDirtyElement>;
  _normalizedNodes: Set<NodeKey>;
  _updateTags: Set<string>;
  _observer: null | MutationObserver;
  _key: string;
  _onError: ErrorHandler;
  _htmlConversions: DOMConversionCache;
  _window: null | Window;
  _editable: boolean;
  constructor(
    editorState: EditorState,
    parentEditor: null | LexicalEditor,
    nodes: RegisteredNodes,
    config: EditorConfig,
    onError: ErrorHandler,
    htmlConversions: DOMConversionCache,
    editable: boolean
  );
  isComposing(): boolean;
  registerUpdateListener(listener: UpdateListener): () => void;
  registerEditableListener(listener: EditableListener): () => void;
  registerDecoratorListener<T>(listener: DecoratorListener<T>): () => void;
  registerTextContentListener(listener: TextContentListener): () => void;
  registerRootListener(listener: RootListener): () => void;
  registerCommand<P>(
    command: LexicalCommand<P>,
    listener: CommandListener<P>,
    priority: CommandListenerPriority
  ): () => void;
  registerMutationListener(klass: Klass<LexicalNode>, listener: MutationListener): () => void;
  registerNodeTransform<T extends LexicalNode>(klass: Klass<T>, listener: Transform<T>): () => void;
  hasNodes<T extends Klass<LexicalNode>>(nodes: Array<T>): boolean;
  dispatchCommand<
    TCommand extends LexicalCommand<unknown>,
    TPayload extends CommandPayloadType<TCommand>
  >(type: TCommand, payload: TPayload): boolean;
  getDecorators<T>(): Record<NodeKey, T>;
  getRootElement(): null | HTMLElement;
  getKey(): string;
  setRootElement(nextRootElement: null | HTMLElement): void;
  getElementByKey(key: NodeKey): HTMLElement | null;
  getEditorState(): EditorState;
  setEditorState(editorState: EditorState, options?: EditorSetOptions): void;
  parseEditorState(
    maybeStringifiedEditorState: string | SerializedEditorState,
    updateFn?: () => void
  ): EditorState;
  update(updateFn: () => void, options?: EditorUpdateOptions): void;
  focus(callbackFn?: () => void, options?: EditorFocusOptions): void;
  blur(): void;
  isEditable(): boolean;
  setEditable(editable: boolean): void;
  toJSON(): SerializedEditor;
}

/**
 * Firebase Realtime Database
 *
 * @packageDocumentation
 */

/**
 * A `DatabaseReference` represents a specific location in your Database and can be used
 * for reading or writing data to that Database location.
 *
 * You can reference the root or child location in your Database by calling
 * `ref()` or `ref("child/path")`.
 *
 * Writing is done with the `set()` method and reading can be done with the
 * `on*()` method. See {@link
 * https://firebase.google.com/docs/database/web/read-and-write}
 */
declare interface DatabaseReference extends Query {
  /**
   * The last part of the `DatabaseReference`'s path.
   *
   * For example, `"ada"` is the key for
   * `https://<DATABASE_NAME>.firebaseio.com/users/ada`.
   *
   * The key of a root `DatabaseReference` is `null`.
   */
  readonly key: string | null;
  /**
   * The parent location of a `DatabaseReference`.
   *
   * The parent of a root `DatabaseReference` is `null`.
   */
  readonly parent: DatabaseReference | null;
  /** The root `DatabaseReference` of the Database. */
  readonly root: DatabaseReference;
}
/**
 * A `DataSnapshot` contains data from a Database location.
 *
 * Any time you read data from the Database, you receive the data as a
 * `DataSnapshot`. A `DataSnapshot` is passed to the event callbacks you attach
 * with `on()` or `once()`. You can extract the contents of the snapshot as a
 * JavaScript object by calling the `val()` method. Alternatively, you can
 * traverse into the snapshot by calling `child()` to return child snapshots
 * (which you could then call `val()` on).
 *
 * A `DataSnapshot` is an efficiently generated, immutable copy of the data at
 * a Database location. It cannot be modified and will never change (to modify
 * data, you always call the `set()` method on a `Reference` directly).
 */
declare class DataSnapshot {
  /**
   * The location of this DataSnapshot.
   */
  readonly ref: DatabaseReference;
  private constructor();
  /**
   * Gets the priority value of the data in this `DataSnapshot`.
   *
   * Applications need not use priority but can order collections by
   * ordinary properties (see
   * {@link https://firebase.google.com/docs/database/web/lists-of-data#sorting_and_filtering_data |Sorting and filtering data}
   * ).
   */
  get priority(): string | number | null;
  /**
   * The key (last part of the path) of the location of this `DataSnapshot`.
   *
   * The last token in a Database location is considered its key. For example,
   * "ada" is the key for the /users/ada/ node. Accessing the key on any
   * `DataSnapshot` will return the key for the location that generated it.
   * However, accessing the key on the root URL of a Database will return
   * `null`.
   */
  get key(): string | null;
  /** Returns the number of child properties of this `DataSnapshot`. */
  get size(): number;
  /**
   * Gets another `DataSnapshot` for the location at the specified relative path.
   *
   * Passing a relative path to the `child()` method of a DataSnapshot returns
   * another `DataSnapshot` for the location at the specified relative path. The
   * relative path can either be a simple child name (for example, "ada") or a
   * deeper, slash-separated path (for example, "ada/name/first"). If the child
   * location has no data, an empty `DataSnapshot` (that is, a `DataSnapshot`
   * whose value is `null`) is returned.
   *
   * @param path - A relative path to the location of child data.
   */
  child(path: string): DataSnapshot;
  /**
   * Returns true if this `DataSnapshot` contains any data. It is slightly more
   * efficient than using `snapshot.val() !== null`.
   */
  exists(): boolean;
  /**
   * Exports the entire contents of the DataSnapshot as a JavaScript object.
   *
   * The `exportVal()` method is similar to `val()`, except priority information
   * is included (if available), making it suitable for backing up your data.
   *
   * @returns The DataSnapshot's contents as a JavaScript value (Object,
   *   Array, string, number, boolean, or `null`).
   */
  exportVal(): any;
  /**
   * Enumerates the top-level children in the `DataSnapshot`.
   *
   * Because of the way JavaScript objects work, the ordering of data in the
   * JavaScript object returned by `val()` is not guaranteed to match the
   * ordering on the server nor the ordering of `onChildAdded()` events. That is
   * where `forEach()` comes in handy. It guarantees the children of a
   * `DataSnapshot` will be iterated in their query order.
   *
   * If no explicit `orderBy*()` method is used, results are returned
   * ordered by key (unless priorities are used, in which case, results are
   * returned by priority).
   *
   * @param action - A function that will be called for each child DataSnapshot.
   * The callback can return true to cancel further enumeration.
   * @returns true if enumeration was canceled due to your callback returning
   * true.
   */
  forEach(action: (child: DataSnapshot) => boolean | void): boolean;
  /**
   * Returns true if the specified child path has (non-null) data.
   *
   * @param path - A relative path to the location of a potential child.
   * @returns `true` if data exists at the specified child path; else
   *  `false`.
   */
  hasChild(path: string): boolean;
  /**
   * Returns whether or not the `DataSnapshot` has any non-`null` child
   * properties.
   *
   * You can use `hasChildren()` to determine if a `DataSnapshot` has any
   * children. If it does, you can enumerate them using `forEach()`. If it
   * doesn't, then either this snapshot contains a primitive value (which can be
   * retrieved with `val()`) or it is empty (in which case, `val()` will return
   * `null`).
   *
   * @returns true if this snapshot has any children; else false.
   */
  hasChildren(): boolean;
  /**
   * Returns a JSON-serializable representation of this object.
   */
  toJSON(): object | null;
  /**
   * Extracts a JavaScript value from a `DataSnapshot`.
   *
   * Depending on the data in a `DataSnapshot`, the `val()` method may return a
   * scalar type (string, number, or boolean), an array, or an object. It may
   * also return null, indicating that the `DataSnapshot` is empty (contains no
   * data).
   *
   * @returns The DataSnapshot's contents as a JavaScript value (Object,
   *   Array, string, number, boolean, or `null`).
   */
  val(): any;
}

/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A `Query` sorts and filters the data at a Database location so only a subset
 * of the child data is included. This can be used to order a collection of
 * data by some attribute (for example, height of dinosaurs) as well as to
 * restrict a large list of items (for example, chat messages) down to a number
 * suitable for synchronizing to the client. Queries are created by chaining
 * together one or more of the filter methods defined here.
 *
 * Just as with a `DatabaseReference`, you can receive data from a `Query` by using the
 * `on*()` methods. You will only receive events and `DataSnapshot`s for the
 * subset of the data that matches your query.
 *
 * See {@link https://firebase.google.com/docs/database/web/lists-of-data#sorting_and_filtering_data}
 * for more information.
 */
declare interface Query {
  /** The `DatabaseReference` for the `Query`'s location. */
  readonly ref: DatabaseReference;
  /**
   * Returns whether or not the current and provided queries represent the same
   * location, have the same query parameters, and are from the same instance of
   * `FirebaseApp`.
   *
   * Two `DatabaseReference` objects are equivalent if they represent the same location
   * and are from the same instance of `FirebaseApp`.
   *
   * Two `Query` objects are equivalent if they represent the same location,
   * have the same query parameters, and are from the same instance of
   * `FirebaseApp`. Equivalent queries share the same sort order, limits, and
   * starting and ending points.
   *
   * @param other - The query to compare against.
   * @returns Whether or not the current and provided queries are equivalent.
   */
  isEqual(other: Query | null): boolean;
  /**
   * Returns a JSON-serializable representation of this object.
   *
   * @returns A JSON-serializable representation of this object.
   */
  toJSON(): string;
  /**
   * Gets the absolute URL for this location.
   *
   * The `toString()` method returns a URL that is ready to be put into a
   * browser, curl command, or a `refFromURL()` call. Since all of those expect
   * the URL to be url-encoded, `toString()` returns an encoded URL.
   *
   * Append '.json' to the returned URL when typed into a browser to download
   * JSON-formatted data. If the location is secured (that is, not publicly
   * readable), you will get a permission-denied error.
   *
   * @returns The absolute URL for this location.
   */
  toString(): string;
}

interface SyncAdapter {
  shouldAuthenticate(): boolean;

  serverTimestamp(): object;

  getUser(params: { userId: string; appId: string }): Promise<DataSnapshot>;

  saveThreadInfo(params: {
    appId: string;
    workspaceId: string;
    threadId: string;
    isOpen: boolean;
    info?: ThreadInfo;
  }): Promise<void>;

  saveWorkspace(params: {
    appId: string;
    workspaceId: string;
    workspace?: OptionalWorkspaceProps | null;
  }): Promise<void>;

  getProfile(params: {
    appId: string;
    userId: string;
  }): Promise<
    undefined | null | { name?: string; email?: string; color?: string; avatar?: string }
  >;

  saveProfile(params: {
    appId: string;
    userId: string;
    workspaceId: string;
    profile: ServerProfile;
  }): Promise<void>;

  saveEvent(params: {
    appId: string;
    workspaceId: string;
    threadId: string;
    event: Event;
  }): Promise<{ id: string }>;

  markResolved(params: { appId: string; workspaceId: string; threadId: string }): Promise<void>;

  markSeen(params: {
    appId: string;
    userId: string;
    workspaceId: string;
    threadId: string;
    eventId: string;
  }): Promise<void>;

  startTyping(params: {
    appId: string;
    userId: string;
    workspaceId: string;
    threadId: string;
  }): Promise<void>;

  stopTyping(params: {
    appId: string;
    userId: string;
    workspaceId: string;
    threadId: string;
  }): Promise<void>;

  sendMessage(params: {
    appId: string;
    userId: string;
    workspaceId: string;
    threadId: string;
    body: string;
    event: Event;
  }): Promise<{ id: string }>;

  subscribeSeen(
    params: {
      appId: string;
      userId: string;
      workspaceId: string;
      subs: Subscriptions;
    },
    onSeenChange: SeenEventHandler
  ): void;

  subscribeOpenThreads(
    params: {
      appId: string;
      workspaceId: string;
      subs: Subscriptions;
    },
    onThreadChange: OpenThreadEventHandler
  ): void;

  subscribeThread(props: {
    appId: string;
    userId?: string;
    workspaceId: string;
    threadId: string;
    subs: Subscriptions;
    onTimelineEventAdded: (event: TimelineChangeEvent) => void;
    onThreadTypingChange: (event: TypingEvent) => void;
    onThreadSeenByUser: (event: ThreadSeenEvent) => void;
    onThreadInfo: (props: ThreadInfoChangeEvent) => void;
  }): void;

  subscribeThreadInfo(props: {
    appId: string;
    workspaceId: string;
    threadId: string;
    subs: Subscriptions;
    onThreadInfo: (props: ThreadInfoChangeEvent) => void;
  }): void;
}

type ServerProfile = Partial<UserProps> & { color?: Color };
type SeenEventHandler = (event: { threadId: string; seenUntilId: string }) => void;
type OpenThreadEventHandler = (event: {
  threadId: string;
  info: { meta: ThreadMeta } | null;
}) => void;

type ThreadInfoChangeEvent = {
  threadId: string;
  info: { meta: ThreadMeta } | null;
  workspaceId: string;
};

type TimelineChangeEvent = {
  threadId: string;
  workspaceId: string;
  eventId: string;
  event: Event;
};

type TypingEvent = {
  threadId: string;
  workspaceId: string;
  userId: string;
  isTyping: boolean;
};

type ThreadSeenEvent = {
  workspaceId: string;
  threadId: string;
  userId: string;
  data: { seenUntilId: string; seenAt: number };
};

interface ThreadMeta {}

type ThreadInfo = {
  name?: string | null;
  url?: string | null;
  meta?: ThreadMeta | null;
};

type SecureProps = {
  appId: string;
  token: string;
};

type UserProps = {
  id: string;
  userId?: string;
} & OptionalUserProps;

type OptionalUserProps = {
  name?: string | null;
  email?: string | null;
  avatar?: string | null;
};

type WorkspaceProps = {
  id: string;
} & OptionalWorkspaceProps;

type OptionalWorkspaceProps = {
  name?: string | null;
};

type UnsecureProps = {
  apiKey: string;
  appId: string;
  user?: UserProps | null;
  workspace?: WorkspaceProps | null;
};

type Callbacks = {
  onCommentSend?: (data: {
    userId: string;
    workspaceId: string;
    threadId: string;
    event: WithID<Event>;
  }) => void;
  onTimestampClick?: (data: {
    userId: string;
    workspaceId: string;
    threadId: string;
    event: WithID<Event> | null;
    timestamp: string;
  }) => void;
  onMentionClick?: (data: {
    userId: string;
    workspaceId: string;
    threadId: string;
    event: WithID<Event> | null;
    mention: MentionWithColor;
  }) => void;
  onInboxThreadClick?: (data: {
    userId: string;
    workspaceId: string;
    threadId: string;
    info: ThreadInfo;
  }) => void;
  onInboxCloseButtonClick?: (data: { userId: string; workspaceId: string }) => void;
};

type ConfigProps = {
  mentionableUsers: MentionProps;
  onAuthenticationRequired?: () => void;
  colorScheme?: 'light' | 'dark' | 'auto';
  callbacks?: Callbacks;
  readOnly?: boolean;
  _demoStore?: Store;
  _isDemo?: boolean;
  _test?: boolean;
};

type FirebaseConfig = {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
};

type Config = (SecureProps | UnsecureProps) & ConfigProps;

type Target =
  | ComposerTarget
  | ThreadTarget
  | CommentableTarget
  | CommentButtonTarget
  | CommentTarget
  | CommentReactionTarget
  | ThreadResolveButtonTarget
  | ThreadCloseButtonTarget
  | ReopenThreadButtonTarget
  | FloatingCommentButtonTarget
  | PinTarget
  | CommentEditButtonTarget
  | CommentDeleteButtonTarget
  | ShowSidebarButtonTarget
  | HideSidebarButtonTarget;

type FloatingCommentButtonTarget = { type: 'floatingCommentButton' };

type ComposerTarget = { type: 'composer'; threadId: string; workspaceId: string };

type ThreadTarget = { type: 'thread'; threadId: string; workspaceId: string };

type CommentButtonTarget = { type: 'commentButton'; threadId: string; workspaceId: string };

type ShowInboxButtonTarget = { type: 'showInboxButton'; workspaceId: string };

type HideSidebarButtonTarget = {
  type: 'hideSidebarButton';
  workspaceId: string;
};

type CommentReactionTarget = {
  type: 'commentReaction';
  emoji: string;
  comment: CommentTarget;
};

type CommentEditButtonTarget = {
  type: 'commentEditButton';
  comment: CommentTarget;
};

type CommentDeleteButtonTarget = {
  type: 'commentDeleteButton';
  comment: CommentTarget;
};

type ThreadResolveButtonTarget = {
  type: 'resolveThreadButton';
  threadId: string;
  workspaceId: string;
};

type ReopenThreadButtonTarget = {
  type: 'reopenThreadButton';
  threadId: string;
  workspaceId: string;
};

type ThreadCloseButtonTarget = {
  type: 'closeThreadButton';
  threadId: string;
  workspaceId: string;
};

type CommentTarget = {
  type: 'comment';
  threadId: string;
  workspaceId: string;
  eventId: string;
  treeId: string;
};

// TODO: this should be a union of different message types
type Event = {
  type: 'message' | 'reaction' | 'adminMessage' | 'system' | 'delete' | 'edit';
  body: string;
  system?: 'resolve' | 'reopen';
  createdAt: number | object;
  createdById: string;
  parentId?: string;
  mentions?: {
    [userId: string]: boolean;
  } | null;
};

type WithName<T> = T & {
  name: string;
};

type WithID<T> = T & {
  id: string;
};

type MentionProps = readonly Mention[] | 'allWorkspace';

interface Mention extends BasicProfile {
  workspaceId: string;
  id: string;
}

interface MentionWithColor extends Mention {
  color: Color;
}

type BasicProfile = {
  name?: string | null;
  avatar?: string | null;
  email?: string | null;
};

interface Profile extends BasicProfile {
  color: Color;
  id: string;
}

interface Timeline {
  [eventId: string]: WithID<Event>;
}

interface Composer {
  editor: LexicalEditor | null;
  $$body: string;
  mentions: string[];
  sendButtonDisabled: boolean;
  isTypingTimeoutID?: ReturnType<typeof setTimeout>;
  isTyping: { [endUserId: string]: boolean };
}

interface SeenBy {
  [userId: string]: { seenAt: number; seenUntilId: string };
}

interface Pin {
  selector: string;
  offset: { x: number; y: number };
  url: string;
  createdById: string;
  createdAt: number;
  state: 'new' | 'pending' | 'open' | 'resolved' | 'deleted';
}

interface Workspace {
  profiles: { [userId: string]: boolean };
  name: string;
  openThreads: { [threadId: string]: { meta: ThreadMeta } };
  inbox: { [threadId: string]: WithID<WithName<Event>> };
  timeline: { [threadId: string]: Timeline };
  composers: { [threadId: string]: Composer };
  seen: { [threadId: string]: string }; // lastSeenEventId
  seenBy: { [threadId: string]: SeenBy };
  threadInfo: { [threadId: string]: ThreadInfo };
}

interface UnconfiguredStore {
  sync: null | SyncAdapter;
  isReadOnly: boolean;
  isConnected: boolean;
  isSignedIn: boolean;
  isInboxOpen: boolean;
  isDemo: boolean;
  userId: string | null;
  user: UserProps | null;
  workspaceId: string | null;
  focusedId: null | Target;
  hoveringId: null | Target;
  reactingId: null | Target;
  composingId: null | ThreadTarget;
  viewingId: null | Target;
  previewingId: null | Target;
  editingId: null | CommentTarget;
  config: null | Config;
  profiles: { [profileId: string]: Profile };
  workspaces: {
    [workspaceId: string]: Workspace;
  };
  mentionableUsers: { [userId: string]: MentionWithColor };
  appState: 'blank' | 'config' | 'ready';
  uiState: 'idle' | 'selecting' | 'continuous';
  subs: Subscriptions;
  callbacks?: Callbacks;
}

interface Store extends UnconfiguredStore {
  sync: SyncAdapter;
  config: Config;
}

type Unsubscribe = () => void;
type Subscriptions = { [subId: string]: Unsubscribe };

interface Theme {
  fontSize: {
    0: string;
    1: string;
    2: string;
    3: string;
    mentionDropdownItemFontSize: string;
    sendButtonFontSize: string;
    button: string;
    indicatorText: string;
  };
  lineHeights: {
    0: string;
    1: string;
    2: string;
    3: string;
    mentionDropdownItemLineHeight: string;
    button: string;
    indicatorText: string;
  };
  fontWeights: {
    0: number;
    1: number;
    2: number;
    3: number;
    mentionDropdownItemFontWeight: string;
    mentionDropdownItemMark: number;
    sendButtonTextFontWeight: number;
    indicatorText: number;
    profileNameText: number;
    button: number;
    mention: number;
  };
  radii: {
    0: string;
    1: string;
    2: string;
    pin: string;
    mentionDropdownBorderRadius: string;
    avatar: string;
    iconButton: string;
    composer: string;
    popoverThread: string;
  };
  padding: {
    composer: string;
    commentTop: string | number;
    commentLeft: string | number;
    commentRight: string | number;
    commentBottom: string | number;
    mentionDropdownItemPadding: string;
    composerContainer: string;

    0: string;
    1: string;
    2: string;
    3: string;
    4: string;
  };
  sizes: {
    sendButton: string;
    threadWidth: string;
    threadPreviewWidth: string;
    pin: string;
    avatar: string;
    pinBorderWidth: string;
    popoverThreadWidth: string;
    iconButton: string;
  };
  space: {
    0: string;
    1: string;
    2: string;
    3: string;
    4: string;
    commentHeaderBodyGap: string;
  };
  borders: {
    composer: string;
    buttonPrimary: string;
    buttonSecondary: string;
    buttonTertiary: string;

    buttonPrimaryActive: string;
    buttonSecondaryActive: string;
    buttonTertiaryActive: string;

    buttonPrimaryHover: string;
    buttonSecondaryHover: string;
    buttonTertiaryHover: string;
  };
  offsets: {
    composerSendButtonTop: string;
    composerSendButtonRight: string;
  };
  shadows: {
    mentionDropdownBoxShadow: string;
  };
  colors: {
    // text
    primaryText: string;
    secondaryText: string;

    badgeColor: string;
    primaryButtonBackground: string;

    bubbleHoverBackground: string;
    selectionBackground: string;
    borderColor: string;
    pinBorderColor: string;
    backgroundColor: string;
    popoverThreadBackgroundColor: string;

    // unread indicator
    indicatorLineColor: string;
    indicatorText: string;

    // typing indicator
    typingDot: string;

    // comment
    commentHoverBackgroundColor: string;
    commentUnseenBackgroundColor: string;
    commentUnseenHoverBackgroundColor: string;
    caretColor: string;

    // composer
    composerBackground: string;
    composerPlaceholder: string;
    composerButtonBackground: string;
    composerButtonIconColor: string;

    sendButtonDisabledColor: string;
    sendButtonColor: string;
    sendButtonTextColor: string;
    sendButtonDisabledTextColor: string;

    // button
    buttonPrimaryBackground: string;
    buttonPrimaryHoverBackground: string;
    buttonPrimaryHoverText: string;
    buttonPrimaryActiveBackground: string;
    buttonPrimaryText: string;
    buttonPrimaryActiveText: string;

    buttonSecondaryBackground: string;
    buttonSecondaryHoverBackground: string;
    buttonSecondaryHoverText: string;
    buttonSecondaryActiveBackground: string;
    buttonSecondaryText: string;

    buttonTertiaryBackground: string;
    buttonTertiaryHoverBackground: string;
    buttonTertiaryHoverText: string;
    buttonTertiaryActiveBackground: string;
    buttonTertiaryText: string;

    buttonDisabledBackground: string;
    buttonDisabledText: string;

    // mentions
    mentionText: string;
    mentionTextBackground: string;

    mentionDropdownBackgroundColor: string;

    mentionDropdownTextColor: string;
    mentionDropdownMarkText: string;
    mentionDropdownMarkBackground: string;

    mentionDropdownItemHoverBackgroundColor: string;
    mentionDropdownItemHoverTextColor: string;

    mentionDropdownItemSelectedBackgroundColor: string;
    mentionDropdownItemSelectedTextColor: string;
  };
}

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

type CustomTheme = DeepPartial<Theme>;

declare type AvatarProps = {
  profile: Profile;
  size?: number;
};

declare type ProviderProps = {
  children: React__default.ReactNode;
  theme?: CustomTheme;
  renderAvatar?: (props: AvatarProps) => ReactNode;
  renderThreadContextPreview?: (props: {
    threadId: string;
    workspaceId: string;
    userId: string;
    info?: ThreadInfo;
  }) => ReactNode;
} & (SecureProps | UnsecureProps) &
  ConfigProps;
declare function CollabKitProvider({
  children,
  colorScheme,
  theme,
  renderAvatar,
  renderThreadContextPreview,
  ...config
}: ProviderProps): JSX.Element | null;

declare type Alignment = 'start' | 'end';
declare type Side = 'top' | 'right' | 'bottom' | 'left';
declare type AlignedPlacement = `${Side}-${Alignment}`;
declare type Placement = Side | AlignedPlacement;
declare type Strategy = 'absolute' | 'fixed';
declare type Axis = 'x' | 'y';
declare type Length = 'width' | 'height';
declare type Coords = {
  [key in Axis]: number;
};
declare type SideObject = {
  [key in Side]: number;
};
interface MiddlewareData {
  [key: string]: any;
  arrow?: Partial<Coords> & {
    centerOffset: number;
  };
  autoPlacement?: {
    index?: number;
    overflows: Array<{
      placement: Placement;
      overflows: Array<number>;
    }>;
  };
  flip?: {
    index?: number;
    overflows: Array<{
      placement: Placement;
      overflows: Array<number>;
    }>;
  };
  hide?: {
    referenceHidden?: boolean;
    escaped?: boolean;
    referenceHiddenOffsets?: SideObject;
    escapedOffsets?: SideObject;
  };
  offset?: Coords;
  shift?: Coords;
}
interface ComputePositionReturn extends Coords {
  placement: Placement;
  strategy: Strategy;
  middlewareData: MiddlewareData;
}
declare type Dimensions = {
  [key in Length]: number;
};
declare type Rect = Coords & Dimensions;
declare type ClientRectObject = Rect & SideObject;

/**
 * Custom positioning reference element.
 * @see https://floating-ui.com/docs/virtual-elements
 */
interface VirtualElement {
  getBoundingClientRect(): ClientRectObject;
  contextElement?: Element;
}

declare type UseFloatingData = Omit<ComputePositionReturn, 'x' | 'y'> & {
  x: number | null;
  y: number | null;
};
declare type ReferenceType$1 = Element | VirtualElement;
declare type UseFloatingReturn<RT extends ReferenceType$1 = ReferenceType$1> = UseFloatingData & {
  update: () => void;
  reference: (node: RT | null) => void;
  floating: (node: HTMLElement | null) => void;
  refs: {
    reference: React.MutableRefObject<RT | null>;
    floating: React.MutableRefObject<HTMLElement | null>;
  };
};

interface ExtendedRefs<RT extends ReferenceType = ReferenceType> {
  reference: React.MutableRefObject<RT | null>;
  floating: React.MutableRefObject<HTMLElement | null>;
  domReference: React.MutableRefObject<Element | null>;
}
interface FloatingEvents {
  emit(event: string, data?: any): void;
  on(event: string, handler: (data?: any) => void): void;
  off(event: string, handler: (data?: any) => void): void;
}
interface ContextData {
  openEvent?: MouseEvent | PointerEvent | FocusEvent;
  typing?: boolean;
  [key: string]: any;
}
interface FloatingContext<RT extends ReferenceType = ReferenceType> extends UseFloatingReturn<RT> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  events: FloatingEvents;
  dataRef: React.MutableRefObject<ContextData>;
  nodeId: string | undefined;
  refs: ExtendedRefs<RT>;
}
declare type ReferenceType = Element | VirtualElement;

interface Props {
  children: JSX.Element;
  context: ReturnType<typeof usePopoverThread>['context'];
}
declare const PopoverTrigger: ({ children, context }: Props) => JSX.Element;

declare type ThreadProps = {
  threadId: string;
  info?: ThreadInfo;
  style?: React__default.CSSProperties;
  composerPrompt?: string;
  showHeader?: boolean;
  autoFocus?: boolean;
};
declare function Thread(
  props: ThreadProps & {
    className?: string;
    children?: React__default.ReactNode;
  }
): JSX.Element;

declare function useUnreadCommentsCount(props: { threadId: string }): number;

declare function useUnreadThreadsCount(): number;

declare function createValtioStore(config: Config, sync: SyncAdapter): Store;

declare function Inbox(): JSX.Element | null;

declare function InboxButton(): JSX.Element;

declare function SidePane(props: { children: React__default.ReactNode }): JSX.Element | null;

export {
  AvatarProps,
  CollabKitProvider,
  Config,
  CustomTheme,
  Inbox,
  InboxButton,
  Mention,
  MentionProps,
  PopoverTrigger,
  CollabKitProvider as Provider,
  SidePane,
  Store,
  Subscriptions,
  Thread,
  Workspace,
  createValtioStore as internal_createStore,
  usePopoverThread,
  useUnreadCommentsCount as useUnreadCount,
  useUnreadThreadsCount,
};
