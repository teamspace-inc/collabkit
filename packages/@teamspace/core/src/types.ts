/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* --------------------- Primary -------------------- */

import type React from 'react'

export type Patch<T> = Partial<{ [P in keyof T]: T | Partial<T> | Patch<T[P]> }>

export type TLForwardedRef<T> =
  | ((instance: T | null) => void)
  | React.MutableRefObject<T | null>
  | null

export interface TLPage<T extends TLShape = TLShape, B extends TLBinding = TLBinding> {
  id: string
  name?: string
  childIndex?: number
  shapes: Record<string, T>
  bindings: Record<string, B>
}

export type ClipboardState = 'cut' | 'copy' | 'idle'

export type ToolPreview<T extends TLShape> = {
  point?: number[] | null
  size: number[]
  type: T['type']
}

export interface TLContextMenu {
  id: string | null
  point: number[]
}

export interface TLClipboard {
  state: ClipboardState
  ids: string[]
  count: number
}

export type TLCamera = {
  point: number[]
  zoom: number
  animate?: boolean
}

export interface TLPageState<T extends TLShape> {
  id: string
  isDragging: boolean
  isResizing: boolean
  selectedIds: string[]
  camera: TLCamera
  clipboard: TLClipboard
  brush?: TLBounds | null
  followingId: string | null
  pointedId?: string | null
  hoveredId?: string | null
  editingId?: string | null
  bindingId?: string | null
  hiddenIds: string[]
  toolPreview?: ToolPreview<T> | null
  hasSizes: Record<string, any>
}

export interface TLUser<T extends TLShape> {
  id: string
  color: string
  selectionColor: string
  point: number[]
  selectedIds: string[]
  selectBox?: number[]
}

export type TLAutoResizeConstraints = 'growHeight' | 'shrinkHeight' | 'growWidth' | 'shrinkWidth'

export type TLUsers<T extends TLShape, U extends TLUser<T> = TLUser<T>> = Record<string, U>

export type TLSnapLine = number[][]

export interface TLHandle {
  id: string
  index: number
  point: number[]
}

export interface TLShape {
  id: string
  type: string
  parentId: string
  childIndex: number
  name: string
  point: number[]
  rotation?: number
  children?: string[]
  handles?: Record<string, TLHandle>
  isLocked?: boolean
  isEditing?: boolean
  isGenerated?: boolean
  isAspectRatioLocked?: boolean
  fileUploadProgress?: number
}

export interface TLComponentProps<T extends TLShape, E = any, M = any> {
  shape: T
  isEditing: boolean
  isBinding: boolean
  isHovered: boolean
  isSelected: boolean
  isDragging: boolean
  isResizing: boolean
  hasSize: boolean
  meta: M extends any ? M : never
  onShapeChange?: TLCallbacks<T>['onShapeChange']
  onShapeBlur?: TLCallbacks<T>['onShapeBlur']
  events: {
    onPointerDown: (e: React.PointerEvent<E>) => void
    onPointerUp: (e: React.PointerEvent<E>) => void
    onPointerEnter: (e: React.PointerEvent<E>) => void
    onPointerMove: (e: React.PointerEvent<E>) => void
    onPointerLeave: (e: React.PointerEvent<E>) => void
  }
  ref?: React.Ref<E> | undefined
}

export interface TLShapeProps<T extends TLShape, E = any, M = any>
  extends TLComponentProps<T, E, M> {
  ref: TLForwardedRef<E>
  shape: T
}

export interface TLBinding {
  id: string
  toId: string
  fromId: string
}

export interface TLTheme {
  accent?: string
  brushFill?: string
  brushStroke?: string
  selectFill?: string
  selectStroke?: string
  background?: string
  editingStroke?: string
  foreground?: string
}

export type TLWheelEventHandler = (
  info: TLPointerInfo<{ type: 'wheel' }>,
  e: React.WheelEvent<Element> | WheelEvent
) => void

export type TLPinchEventHandler = (
  info: TLPointerInfo<{ type: 'pinch' }>,
  e:
    | React.WheelEvent<Element>
    | WheelEvent
    | React.TouchEvent<Element>
    | TouchEvent
    | React.PointerEvent<Element>
    | PointerEventInit
) => void

export type TLShapeChangeHandler<T, K = any> = (
  shape: { id: string } & Partial<T>,
  info?: K
) => void

export type TLShapeBlurHandler<K = any> = (info?: K) => void

export type TLKeyboardEventHandler = (
  key: string,
  info: TLKeyboardInfo,
  e: KeyboardEvent | React.KeyboardEvent<any>
) => void

export type TLUndoEventHandler = (info: TLUndoInfo) => void
export type TLDragEventHandler = (info: TLDragInfo, e: DragEvent | React.DragEvent) => void

export type TLPointerEventHandler = (info: TLPointerInfo, e: React.PointerEvent) => void

export type TLContextMenuHandler<T extends TLTarget = TLTarget> = (
  info: TLContextMenuInfo<T>,
  e: React.MouseEvent
) => void

export type TLFocusEventHandler = (info: TLFocusInfo, e: FocusEvent) => void

export type TLShapeCloneHandler = (
  info: TLPointerInfo<TLShapeCloneHandleTarget>,
  e: React.PointerEvent
) => void

export type TLShapeAutoResizeEventHandler = (info: TLAutoResizeInfo) => void

export type TLShapeLinkHandler = (
  info: TLPointerInfo<{ type: 'link' }>,
  e: React.PointerEvent
) => void

export type TLCanvasEventHandler = (
  info: TLPointerInfo<{ type: 'canvas' }>,
  e: React.PointerEvent
) => void

export type TLBoundsTarget = { type: 'bounds' }
export type TLBoundsEventHandler = (
  info: TLPointerInfo<TLBoundsTarget>,
  e: React.PointerEvent
) => void

export type TLBoundsHandleTarget = {
  type: 'boundsHandle'
  id: TLBoundsHandle
}
export type TLBoundsHandleEventHandler = (
  info: TLPointerInfo<TLBoundsHandleTarget>,
  e: React.PointerEvent
) => void

export type TLShapeCloneHandleTarget = {
  type: 'shapeCloneHandle'
  id: 'top' | 'right' | 'bottom' | 'left' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'
}

export interface TLTarget {
  type: string
  id?: string
  docId?: string
  rowId?: string
  columnId?: string
}

export interface TLCallbacks<T extends TLShape> {
  // Camera events
  onPan: TLWheelEventHandler
  onZoom: TLPinchEventHandler
  onPinchStart: TLPinchEventHandler
  onPinch: TLPinchEventHandler
  onPinchEnd: TLPinchEventHandler

  // Pointer Events
  onPointerMove: TLPointerEventHandler
  onPointerUp: TLPointerEventHandler
  onPointerDown: TLPointerEventHandler

  // Context Menu
  onContextMenu: TLContextMenuHandler

  // Canvas (background)
  onPointCanvas: TLCanvasEventHandler
  onDoubleClickCanvas: TLCanvasEventHandler
  onRightPointCanvas: TLCanvasEventHandler
  onDragCanvas: TLCanvasEventHandler
  onReleaseCanvas: TLCanvasEventHandler

  // Shape
  onPointShape: TLPointerEventHandler
  onDoubleClickShape: TLPointerEventHandler
  onRightPointShape: TLPointerEventHandler
  onDragShape: TLPointerEventHandler
  onHoverShape: TLPointerEventHandler
  onUnhoverShape: TLPointerEventHandler
  onReleaseShape: TLPointerEventHandler

  onFocusShape: TLFocusEventHandler
  onBlurShape: TLFocusEventHandler

  // Bounds (bounding box background)
  onPointBounds: TLBoundsEventHandler
  onDoubleClickBounds: TLBoundsEventHandler
  onRightPointBounds: TLBoundsEventHandler
  onDragBounds: TLBoundsEventHandler
  onHoverBounds: TLBoundsEventHandler
  onUnhoverBounds: TLBoundsEventHandler
  onReleaseBounds: TLBoundsEventHandler

  // Bounds handles (corners, edges)
  onPointBoundsHandle: TLBoundsHandleEventHandler
  onDoubleClickBoundsHandle: TLBoundsHandleEventHandler
  onRightPointBoundsHandle: TLBoundsHandleEventHandler
  onDragBoundsHandle: TLBoundsHandleEventHandler
  onHoverBoundsHandle: TLBoundsHandleEventHandler
  onUnhoverBoundsHandle: TLBoundsHandleEventHandler
  onReleaseBoundsHandle: TLBoundsHandleEventHandler

  // Handles (ie the handles of a selected arrow)
  onPointHandle: TLPointerEventHandler
  onDoubleClickHandle: TLPointerEventHandler
  onRightPointHandle: TLPointerEventHandler
  onDragHandle: TLPointerEventHandler
  onHoverHandle: TLPointerEventHandler
  onUnhoverHandle: TLPointerEventHandler
  onReleaseHandle: TLPointerEventHandler

  // Misc
  onShapeChange: TLShapeChangeHandler<T, any>
  onShapeBlur: TLShapeBlurHandler<any>
  onShapeClone: TLShapeCloneHandler
  onRenderCountChange: (ids: string[]) => void
  onError: (error: Error) => void
  onBoundsChange: (bounds: TLBounds) => void

  // Drop
  onDrag: TLDragEventHandler
  onDragEnd: TLDragEventHandler
  onDragEnter: TLDragEventHandler
  onDragLeave: TLDragEventHandler
  onDragOver: TLDragEventHandler
  onDragStart: TLDragEventHandler
  onDrop: TLDragEventHandler

  // File
  // onFile: TLDragEventHandler
  // onFileReadStart: TLDragEventHandler
  // onFileReadEnd: TLDragEventHandler

  // Keyboard event handlers
  onKeyDown: TLKeyboardEventHandler
  onKeyUp: TLKeyboardEventHandler

  // Undo
  onUndo: TLUndoEventHandler
  onRedo: TLUndoEventHandler
}

export interface TLBounds {
  minX: number
  minY: number
  maxX: number
  maxY: number
  width: number
  height: number
  rotation?: number
}

export interface TLBoundsWithCenter extends TLBounds {
  midX: number
  midY: number
}

export enum TLBoundsEdge {
  Top = 'top_edge',
  Right = 'right_edge',
  Bottom = 'bottom_edge',
  Left = 'left_edge',
}

export enum TLBoundsCorner {
  TopLeft = 'top_left_corner',
  TopRight = 'top_right_corner',
  BottomRight = 'bottom_right_corner',
  BottomLeft = 'bottom_left_corner',
}

export type TLBoundsHandle = TLBoundsCorner | TLBoundsEdge | 'rotate' | 'center' | 'left' | 'right'

export interface TLFocusInfo<T extends TLTarget = TLTarget> {
  target: T
}

export interface TLAutoResizeInfo<T extends TLTarget = TLTarget> {
  constraints: TLAutoResizeConstraints[]
  target: T
  width?: number
  height?: number
}

export interface TLDragInfo<T extends TLTarget = TLTarget> {
  target: T
  point: number[]
  shiftKey: boolean
  ctrlKey: boolean
  metaKey: boolean
  altKey: boolean
  spaceKey: boolean
  pointId?: number
  isWithinTarget: boolean
  file?: File | null
  data?: string | ArrayBuffer | null
}

export interface TLFileInfo<T extends TLTarget = TLTarget> {
  target: T
  file: File | null
  data: string | ArrayBuffer | null
}

export interface TLPointerInfo<T extends TLTarget = TLTarget> {
  target: T
  pointerId: number
  origin: number[]
  point: number[]
  delta: number[]
  pressure: number
  shiftKey: boolean
  ctrlKey: boolean
  metaKey: boolean
  altKey: boolean
  spaceKey: boolean
  pointId?: number
}

export interface TLContextMenuInfo<T extends TLTarget> {
  target: T
  origin: number[]
  point: number[]
  pagePoint: number[]
  delta: number[]
  shiftKey: boolean
  ctrlKey: boolean
  metaKey: boolean
  altKey: boolean
  spaceKey: boolean
}

export interface TLKeyboardInfo {
  origin: number[]
  point: number[]
  key: string
  keys: string[]
  shiftKey: boolean
  ctrlKey: boolean
  metaKey: boolean
  altKey: boolean
}

export interface TLUndoInfo {
  target: string
  // stackItem: any
  // origin: any
  // type: 'redo' | 'undo'
  // changedParentTypes: any
}

export interface TLTransformInfo<T extends TLShape> {
  type: TLBoundsEdge | TLBoundsCorner
  initialShape: T
  scaleX: number
  scaleY: number
  transformOrigin: number[]
}

// TODO: Remove me and the rest of the bezier curve content
export interface TLBezierCurveSegment {
  start: number[]
  tangentStart: number[]
  normalStart: number[]
  pressureStart: number
  end: number[]
  tangentEnd: number[]
  normalEnd: number[]
  pressureEnd: number
}

// TODO: Move snaps into its own repo
export enum SnapPoints {
  minX = 'minX',
  midX = 'midX',
  maxX = 'maxX',
  minY = 'minY',
  midY = 'midY',
  maxY = 'maxY',
}

export type Snap =
  | { id: SnapPoints; isSnapped: false }
  | {
      id: SnapPoints
      isSnapped: true
      to: number
      B: TLBoundsWithCenter
      distance: number
    }

/* -------------------- Internal -------------------- */

export interface IShapeTreeNode<T extends TLShape, M = any> {
  shape: T
  children?: IShapeTreeNode<TLShape, M>[]
  isEditing: boolean
  hasSize: boolean
  isBinding: boolean
  isHovered: boolean
  isDragging: boolean
  isSelected: boolean
  isResizing: boolean
  meta?: M extends any ? M : never
}

/* -------------------------------------------------- */
/*                    Utility Types                   */
/* -------------------------------------------------- */

export type MappedByType<K extends string, T extends { type: K }> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [P in T['type']]: T extends any ? (P extends T['type'] ? T : never) : never
}

export type RequiredKeys<T> = {
  [K in keyof T]-?: Record<string, unknown> extends Pick<T, K> ? never : K
}[keyof T]
