import React from 'react'
import {
  usePreventNavigation,
  useZoomEvents,
  useSafariFocusOutFix,
  useCanvasEvents,
  useCameraCss,
} from '~hooks'

import type { TLBinding, TLBounds, TLPage, TLPageState, TLShape, TLSnapLine, TLUsers } from '~types'

import { ErrorFallback } from '~components/error-fallback'
import { ErrorBoundary } from '~components/error-boundary'
import { Brush } from '~components/brush'
import { Page } from '~components/page'
import { Users } from '~components/users'
import { useResizeObserver } from '~hooks/useResizeObserver'
import { inputs } from '~inputs'
import { UsersIndicators } from '~components/users-indicators'
import { SnapLines } from '~components/snap-lines/snap-lines'
import { Overlay } from '~components/overlay'
import { UsersBrush } from '~components/users-brush'
import { UsersSelection } from '~components/users-selection'
// import { useDragEvents } from '~hooks/useDragEvents'

function resetError() {
  void null
}

interface CanvasProps<T extends TLShape, M extends Record<string, unknown>> {
  page: TLPage<T, TLBinding>
  pageState: TLPageState<T>
  contextMenu?: JSX.Element
  snapLines?: TLSnapLine[]
  tools?: JSX.Element
  users?: TLUsers<T>
  userId?: string
  hideBounds: boolean
  hideIndicators: boolean
  hideBindingHandles: boolean
  hideCloneHandles: boolean
  hideHoveredIndicator: boolean
  hideRotateHandle: boolean
  externalContainerRef?: React.RefObject<HTMLElement>
  meta?: M
  id?: string
  onBoundsChange: (bounds: TLBounds) => void
}

export function Canvas<T extends TLShape, M extends Record<string, unknown>>({
  id,
  page,
  pageState,
  snapLines,
  users,
  userId,
  tools,
  meta,
  externalContainerRef,
  hideBounds,
  hideIndicators,
  hideBindingHandles,
  hideHoveredIndicator,
  hideCloneHandles,
  hideRotateHandle,
  onBoundsChange,
}: CanvasProps<T, M>): JSX.Element {
  const rCanvas = React.useRef<HTMLDivElement>(null)
  const rContainer = React.useRef<HTMLDivElement>(null)
  const rLayer = React.useRef<HTMLDivElement>(null)

  inputs.zoom = pageState.camera.zoom

  useResizeObserver(rCanvas, onBoundsChange)

  useZoomEvents(pageState.camera.zoom, externalContainerRef || rCanvas)

  useSafariFocusOutFix()

  usePreventNavigation(rCanvas)

  useCameraCss(rLayer, rContainer, pageState)

  const events = useCanvasEvents()

  // const dragEvents = useDragEvents({ ref: rCanvas })

  const usersList = users ? Object.values(users).filter(Boolean) : []

  return (
    <div id={id} className="tl-container" ref={rContainer}>
      <div
        id="canvas"
        className="tl-absolute tl-canvas"
        ref={rCanvas}
        {...events}
        // {...dragEvents}
        style={{ willChange: pageState.camera.zoom < 1 ? 'transform' : 'unset' }}
      >
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={resetError}>
          <div ref={rLayer} className="tl-absolute tl-layer">
            {tools}
            {usersList && userId && (
              <UsersSelection userId={userId} usersList={usersList} page={page} />
            )}
            <Page
              page={page}
              hideHoveredIndicator={hideHoveredIndicator}
              pageState={pageState}
              hideBounds={hideBounds}
              hideIndicators={hideIndicators}
              hideBindingHandles={hideBindingHandles}
              hideCloneHandles={hideCloneHandles}
              hideRotateHandle={hideRotateHandle}
              meta={meta}
            />
            {usersList && userId && (
              <UsersIndicators userId={userId} usersList={usersList} page={page} meta={meta} />
            )}
            {users && userId && <UsersBrush userId={userId} users={users} />}
            {pageState.brush && <Brush brush={pageState.brush} />}
            {users && <Users userId={userId} users={users} zoom={pageState.camera.zoom} />}
          </div>
        </ErrorBoundary>
        <Overlay camera={pageState.camera}>
          {snapLines && <SnapLines snapLines={snapLines} />}
        </Overlay>
      </div>
    </div>
  )
}
