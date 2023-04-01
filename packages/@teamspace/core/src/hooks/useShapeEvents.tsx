import * as React from 'react'
import { Utils } from '~utils'
import { TLContext } from '~hooks'
import { TLTarget } from '~types'

// used to track if a pointShape and releaseShape
// are from the same click action
let pointId = 1

export function useShapeEvents(id: string | TLTarget) {
  const { rPageState, rSelectionBounds, callbacks, inputs } = React.useContext(TLContext)

  const target = typeof id === 'string' ? ({ type: 'shape', id } as TLTarget) : id

  const onContextMenu = React.useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      e.preventDefault()

      const info = inputs.contextMenu(e, target)
      callbacks.onContextMenu?.(info, e)
    },
    [inputs, callbacks, id]
  )

  const onPointerDown = React.useCallback(
    (e: React.PointerEvent) => {
      if (!inputs.pointerIsValid(e)) return

      if (e.button === 2) {
        callbacks.onRightPointShape?.(inputs.pointerDown<TLTarget>(e, target, pointId), e)
        return
      }

      if (e.button !== 0) return

      const info = inputs.pointerDown<TLTarget>(e, target, pointId)

      e.stopPropagation()
      e.currentTarget?.setPointerCapture(e.pointerId)

      // If we click "through" the selection bounding box to hit a shape that isn't selected,
      // treat the event as a bounding box click. Unfortunately there's no way I know to pipe
      // the event to the actual bounds background element.
      if (
        rSelectionBounds.current &&
        Utils.pointInBounds(info.point, rSelectionBounds.current) &&
        !rPageState.current.selectedIds.includes(target.id!)
      ) {
        callbacks.onPointBounds?.(inputs.pointerDown(e, { type: 'bounds' }, pointId), e)
        pointId++
        callbacks.onPointShape?.(info, e)
        callbacks.onPointerDown?.(info, e)
        return
      }

      callbacks.onPointShape?.(info, e)
      callbacks.onPointerDown?.(info, e)
    },
    [inputs, callbacks, id]
  )

  const onPointerUp = React.useCallback(
    (e: React.PointerEvent) => {
      if (e.button !== 0) return
      if (!inputs.pointerIsValid(e)) return
      e.stopPropagation()
      const isDoubleClick = inputs.isDoubleClick()
      const info = inputs.pointerUp<TLTarget>(e, target, pointId)

      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget?.releasePointerCapture(e.pointerId)
      }

      if (isDoubleClick && !(info.altKey || info.metaKey)) {
        callbacks.onDoubleClickShape?.(info, e)
      }
      pointId++
      callbacks.onReleaseShape?.(info, e)
      callbacks.onPointerUp?.(info, e)
    },
    [inputs, callbacks, id]
  )

  const onPointerMove = React.useCallback(
    (e: React.PointerEvent) => {
      if (!inputs.pointerIsValid(e)) return

      e.stopPropagation()

      if (inputs.pointer && e.pointerId !== inputs.pointer.pointerId) return

      const info = inputs.pointerMove(e, target)

      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        callbacks.onDragShape?.(info, e)
      }

      callbacks.onPointerMove?.(info, e)
    },
    [inputs, callbacks, id]
  )

  const onPointerEnter = React.useCallback(
    (e: React.PointerEvent) => {
      if (!inputs.pointerIsValid(e)) return
      const info = inputs.pointerEnter(e, target)
      callbacks.onHoverShape?.(info, e)
    },
    [inputs, callbacks, id]
  )

  const onPointerLeave = React.useCallback(
    (e: React.PointerEvent) => {
      if (!inputs.pointerIsValid(e)) return
      const info = inputs.pointerEnter(e, target)
      callbacks.onUnhoverShape?.(info, e)
    },
    [inputs, callbacks, id]
  )

  return {
    onPointerDown,
    onPointerUp,
    onPointerEnter,
    onPointerMove,
    onPointerLeave,
    onContextMenu,
  }
}
