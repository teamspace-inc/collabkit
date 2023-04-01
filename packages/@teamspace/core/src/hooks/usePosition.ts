/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as React from 'react'
import type { TLBounds } from '~types'

export function usePosition(bounds: TLBounds, rotation = 0) {
  const rBounds = React.useRef<HTMLDivElement>(null)

  React.useLayoutEffect(() => {
    const elm = rBounds.current

    const transform = `translate(calc(${bounds.minX}px - var(--tl-padding)), calc(${
      bounds.minY
    }px - var(--tl-padding))) rotate(${rotation + (bounds.rotation || 0)}rad)`

    if (elm) {
      elm.style.setProperty('transform', transform)

      elm.style.setProperty(
        'width',
        `calc(${Math.floor(bounds.width)}px + (var(--tl-padding) * 2))`
      )

      elm.style.setProperty(
        'height',
        `calc(${Math.floor(bounds.height)}px + (var(--tl-padding) * 2))`
      )
    } else {
      console.warn('[usePosition] No element to apply position to')
    }

    // elm.style.setProperty('z-index', zIndex + '')
  }, [bounds, rotation, rBounds.current])

  return rBounds
}
