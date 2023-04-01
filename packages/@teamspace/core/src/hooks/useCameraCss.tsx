/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as React from 'react'
import type { TLPageState, TLShape } from '~types'

export function useCameraCss<T extends TLShape>(
  layerRef: React.RefObject<HTMLDivElement>,
  containerRef: React.ForwardedRef<HTMLDivElement>,
  pageState: TLPageState<T>
) {
  // Update the tl-zoom CSS variable when the zoom changes
  const rZoom = React.useRef<number>()
  const rPoint = React.useRef<number[]>()

  React.useLayoutEffect(() => {
    const { zoom, point, animate } = pageState.camera

    const didZoom = zoom !== rZoom.current
    const didPan = point !== rPoint.current

    rZoom.current = zoom
    rPoint.current = point

    if (didZoom || didPan) {
      const layer = layerRef.current
      if (containerRef && 'current' in containerRef) {
        const container = containerRef.current

        // If we zoomed, set the CSS variable for the zoom
        if (didZoom) {
          if (container) {
            container.style.setProperty('--tl-zoom', zoom.toString())
          }
        }

        // Either way, position the layer
        if (layer) {
          layer.style.setProperty(
            'transform',
            `scale(${zoom}) translate(${point[0]}px, ${point[1]}px)`
          )

          if (animate) {
            const easeInOutQuint = 'cubic-bezier(0.22, 1, 0.36, 1)'
            layer.style.setProperty('transition', `0.6s transform ${easeInOutQuint}`)
          } else {
            layer.style.removeProperty('transition')
          }
        }
      }
    }
  }, [pageState.camera])
}
