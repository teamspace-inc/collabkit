/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import type { TLComponentProps, TLShape } from '~types'
import type { TLShapeUtil } from '~shape-utils'

interface RenderedShapeProps<T extends TLShape, E extends Element, M>
  extends TLComponentProps<T, E, M> {
  shape: T
  utils: TLShapeUtil<T, E, M>
}

export const RenderedShape = React.memo(
  function RenderedShape<T extends TLShape, E extends Element, M>({
    shape,
    utils,
    isEditing,
    isBinding,
    isHovered,
    isSelected,
    isDragging,
    isResizing,
    hasSize,
    onShapeChange,
    onShapeBlur,
    events,
    meta,
  }: RenderedShapeProps<T, E, M>) {
    const ref = utils.getRef(shape)

    // consider using layout effect to update bounds cache if the ref is filled

    return (
      <utils.Component
        ref={ref}
        shape={shape}
        hasSize={hasSize}
        isEditing={isEditing}
        isBinding={isBinding}
        isHovered={isHovered}
        isSelected={isSelected}
        isDragging={isDragging}
        isResizing={isResizing}
        meta={meta}
        events={events}
        onShapeChange={onShapeChange}
        onShapeBlur={onShapeBlur}
      />
    )
  },
  (prev, next) => {
    // If these have changed, then definitely render
    if (
      prev.isHovered !== next.isHovered ||
      prev.isSelected !== next.isSelected ||
      prev.isEditing !== next.isEditing ||
      prev.isBinding !== next.isBinding ||
      prev.isDragging !== next.isDragging ||
      prev.isResizing !== next.isResizing ||
      prev.hasSize !== next.hasSize ||
      prev.meta !== next.meta
    ) {
      return false
    }

    // If not, and if the shape has changed, ask the shape's class
    // whether it should render
    if (next.shape !== prev.shape) {
      return !next.utils.shouldRender(next.shape, prev.shape)
    }

    return true
  }
)
