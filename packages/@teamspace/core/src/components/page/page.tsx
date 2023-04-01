/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react'
import type { TLBinding, TLPage, TLPageState, TLShape } from '~types'
import { useSelection, useShapeTree, useTLContext } from '~hooks'
import { Bounds } from '~components/bounds'
import { BoundsBg } from '~components/bounds/bounds-bg'
import { ShapeNode } from '~components/shape'
import { ShapeIndicator } from '~components/shape-indicator'
import type { TLShapeUtil } from '~shape-utils'
import { ToolPreview } from '~components/tool-preview'

interface PageProps<T extends TLShape, M extends Record<string, unknown>> {
  page: TLPage<T, TLBinding>
  pageState: TLPageState<T>
  hideBounds: boolean
  hideIndicators: boolean
  hideBindingHandles: boolean
  hideCloneHandles: boolean
  hideRotateHandle: boolean
  hideHoveredIndicator: boolean
  meta?: M
}

/**
 * The Page component renders the current page.
 */
export const Page = React.memo(function Page<T extends TLShape, M extends Record<string, unknown>>({
  page,
  pageState,
  hideBounds,
  hideIndicators,
  hideBindingHandles,
  hideCloneHandles,
  hideRotateHandle,
  hideHoveredIndicator,
  meta,
}: PageProps<T, M>): JSX.Element {
  const { bounds: rendererBounds, shapeUtils } = useTLContext()

  const shapeTree = useShapeTree(page, pageState, meta)

  const { bounds, isLinked, isLocked, rotation } = useSelection(page, pageState, shapeUtils)

  const {
    selectedIds,
    hoveredId,
    hiddenIds,
    camera: { zoom },
  } = pageState

  let _hideCloneHandles = true

  let _hideBoundsHandles = false

  let _enableBoundsHandles = true

  let _enableBounds = true

  // Does the selected shape have handles?
  let shapeWithHandles: TLShape | undefined = undefined

  let _isEditing = false

  let _shouldRound = false

  const selectedShapes = selectedIds.map((id) => page.shapes[id]).filter(Boolean)

  // can at least one of the shapes be resized?
  _enableBoundsHandles = selectedShapes.some((shape) => shapeUtils[shape.type].canResize)

  if (selectedShapes.length === 1 && selectedShapes[0]) {
    const shape = selectedShapes[0]

    const hasSize = !!pageState.hasSizes[shape.id]

    const utils = shapeUtils[shape.type] as TLShapeUtil<any, any>

    _hideCloneHandles = !hasSize || hideCloneHandles || !utils.showCloneHandles

    _hideBoundsHandles = !hasSize || !utils.showBoundsHandles

    _enableBoundsHandles = hasSize && utils.enableBoundsHandles

    if (shape.handles !== undefined) {
      shapeWithHandles = shape
    }

    _enableBounds = hasSize

    _isEditing = pageState.editingId === shape.id

    _shouldRound = utils.shouldRound
  }

  return (
    <>
      {pageState.toolPreview ? <ToolPreview {...pageState.toolPreview} utils={shapeUtils} /> : null}
      {bounds && _enableBounds && !_isEditing && (
        <BoundsBg
          shouldRound={_shouldRound}
          bounds={bounds}
          rotation={rotation}
          isHidden={hideBounds}
        />
      )}
      {shapeTree.map((node) => (
        <ShapeNode key={node.shape.id} utils={shapeUtils} {...node} />
      ))}
      {!hideIndicators &&
        !_isEditing &&
        selectedShapes
          .filter((shape) => shape && !hiddenIds.includes(shape.id) && pageState.hasSizes[shape.id])
          .map((shape) => (
            <ShapeIndicator key={'selected_' + shape.id} shape={shape} meta={meta} isSelected />
          ))}
      {!hideIndicators &&
        !hideHoveredIndicator &&
        hoveredId &&
        !_isEditing &&
        page.shapes[hoveredId] && (
          <ShapeIndicator
            key={'hovered_' + hoveredId}
            shape={page.shapes[hoveredId]}
            meta={meta}
            isHovered
          />
        )}
      {bounds && _enableBounds && (
        <Bounds
          zoom={zoom}
          bounds={bounds}
          viewportWidth={rendererBounds.width}
          isLocked={isLocked}
          isEditing={_isEditing}
          rotation={rotation}
          isHidden={hideBounds}
          shouldRound={_shouldRound}
          enableBoundsHandles={_enableBoundsHandles}
          hideBoundsHandles={_hideBoundsHandles}
          hideRotateHandle={hideRotateHandle}
          hideBindingHandles={hideBindingHandles || !isLinked}
          hideCloneHandles={_hideCloneHandles}
        />
      )}
    </>
  )
})
