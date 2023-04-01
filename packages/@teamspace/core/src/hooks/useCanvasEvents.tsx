import * as React from 'react'
import { useTLContext } from './useTLContext'

export function useCanvasEvents() {
  const { callbacks, inputs } = useTLContext()
  const target = { type: 'canvas' } as const

  const onContextMenu = React.useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      e.preventDefault()
      const info = inputs.contextMenu(e, target)
      callbacks.onContextMenu?.(info, e)
    },
    [callbacks, inputs]
  )

  const onPointerDown = React.useCallback(
    (e: React.PointerEvent) => {
      if (e.button !== 0) return
      if (!inputs.pointerIsValid(e)) return
      e.currentTarget.setPointerCapture(e.pointerId)

      const info = inputs.pointerDown(e, target)

      if (e.button === 0) {
        callbacks.onPointCanvas?.(info, e)
        callbacks.onPointerDown?.(info, e)
      }
    },
    [callbacks, inputs]
  )

  const onPointerMove = React.useCallback(
    (e: React.PointerEvent) => {
      if (!inputs.pointerIsValid(e)) return
      const info = inputs.pointerMove(e, target)

      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        callbacks.onDragCanvas?.(info, e)
      }

      callbacks.onPointerMove?.(info, e)
    },
    [callbacks, inputs]
  )

  const onPointerUp = React.useCallback(
    (e: React.PointerEvent) => {
      if (e.button !== 0) return
      if (!inputs.pointerIsValid(e)) return
      const isDoubleClick = inputs.isDoubleClick()
      const info = inputs.pointerUp(e, target)

      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget?.releasePointerCapture(e.pointerId)
      }
      if (isDoubleClick && !(info.altKey || info.metaKey)) {
        callbacks.onDoubleClickCanvas?.(info, e)
      }

      callbacks.onReleaseCanvas?.(info, e)
      callbacks.onPointerUp?.(info, e)
    },
    [callbacks, inputs]
  )

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onContextMenu,
  }
}
