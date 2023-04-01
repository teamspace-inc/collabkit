import * as React from 'react'
import { TLBoundsTarget } from '~types'
import { useTLContext } from './useTLContext'

export function useBoundsEvents() {
  const { callbacks, inputs } = useTLContext()

  const onContextMenu = React.useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      e.preventDefault()
      const info = inputs.contextMenu(e, { type: 'bounds' })
      callbacks.onContextMenu?.(info, e)
    },
    [callbacks, inputs]
  )

  const onPointerDown = React.useCallback(
    (e: React.PointerEvent) => {
      if (e.button !== 0) return
      if (!inputs.pointerIsValid(e)) return

      e.stopPropagation()
      e.currentTarget?.setPointerCapture(e.pointerId)
      const info = inputs.pointerDown<TLBoundsTarget>(e, { type: 'bounds' })

      callbacks.onPointBounds?.(info, e)
      callbacks.onPointerDown?.(info, e)
    },
    [callbacks, inputs]
  )

  const onPointerUp = React.useCallback(
    (e: React.PointerEvent) => {
      if (e.button !== 0) return
      if (!inputs.pointerIsValid(e)) return
      e.stopPropagation()
      const isDoubleClick = inputs.isDoubleClick()
      const info = inputs.pointerUp<TLBoundsTarget>(e, { type: 'bounds' })

      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget?.releasePointerCapture(e.pointerId)
      }

      if (isDoubleClick && !(info.altKey || info.metaKey)) {
        callbacks.onDoubleClickBounds?.(info, e)
      }

      callbacks.onReleaseBounds?.(info, e)
      callbacks.onPointerUp?.(info, e)
    },
    [callbacks, inputs]
  )

  const onPointerMove = React.useCallback(
    (e: React.PointerEvent) => {
      if (!inputs.pointerIsValid(e)) return
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        callbacks.onDragBounds?.(inputs.pointerMove(e, { type: 'bounds' }), e)
      }
      const info = inputs.pointerMove(e, { type: 'bounds' })
      callbacks.onPointerMove?.(info, e)
    },
    [callbacks, inputs]
  )

  const onPointerEnter = React.useCallback(
    (e: React.PointerEvent) => {
      if (!inputs.pointerIsValid(e)) return
      callbacks.onHoverBounds?.(inputs.pointerEnter(e, { type: 'bounds' }), e)
    },
    [callbacks, inputs]
  )

  const onPointerLeave = React.useCallback(
    (e: React.PointerEvent) => {
      if (!inputs.pointerIsValid(e)) return
      callbacks.onUnhoverBounds?.(inputs.pointerEnter(e, { type: 'bounds' }), e)
    },
    [callbacks, inputs]
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
