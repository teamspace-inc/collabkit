/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import { useShapeEvents } from '~hooks'
import type { IShapeTreeNode, TLShape } from '~types'
import { RenderedShape } from './rendered-shape'
import { Container } from '~components/container'
import { useTLContext } from '~hooks'
import { useForceUpdate } from '~hooks/useForceUpdate'
import type { TLShapeUtil } from '~shape-utils'
import equal from 'fast-deep-equal'

interface ShapeProps<T extends TLShape, M> extends IShapeTreeNode<T, M> {
  utils: TLShapeUtil<T>
}

export const Shape = React.memo(function Shape<T extends TLShape, M>({
  shape,
  utils,
  isEditing,
  isBinding,
  isHovered,
  isSelected,
  isDragging,
  isResizing,
  hasSize,
  meta,
}: ShapeProps<T, M>) {
  const { callbacks } = useTLContext()
  const bounds = utils.getBounds(shape)
  const events = useShapeEvents(shape.id)

  useForceUpdate()

  return (
    <Container id={shape.id} bounds={bounds} rotation={shape.rotation} hasSize={hasSize}>
      <RenderedShape
        hasSize={hasSize}
        shape={shape}
        isBinding={isBinding}
        isEditing={isEditing}
        isHovered={isHovered}
        isSelected={isSelected}
        isDragging={isDragging}
        isResizing={isResizing}
        utils={utils as any}
        meta={meta}
        events={events}
        onShapeChange={callbacks.onShapeChange}
        onShapeBlur={callbacks.onShapeBlur}
      />
    </Container>
  )
},
equal)
