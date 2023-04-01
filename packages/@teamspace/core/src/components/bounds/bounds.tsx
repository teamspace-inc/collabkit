/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as React from 'react'
import { TLBoundsEdge, TLBoundsCorner, TLBounds } from '~types'
import { CenterHandle } from './center-handle'
import { RotateHandle } from './rotate-handle'
import { CornerHandle } from './corner-handle'
import { EdgeHandle } from './edge-handle'
import { CloneButtons } from './clone-buttons'
import { Container } from '~components/container'
import { SVGContainer } from '~components/svg-container'
import { LinkHandle } from './link-handle'

interface BoundsProps {
  zoom: number
  bounds: TLBounds
  rotation: number
  isLocked: boolean
  isHidden: boolean
  isEditing: boolean
  hideCloneHandles: boolean
  hideRotateHandle: boolean
  hideBoundsHandles: boolean
  hideBindingHandles: boolean
  enableBoundsHandles: boolean
  shouldRound: boolean
  viewportWidth: number
  children?: React.ReactNode
}

export const Bounds = React.memo(function Bounds({
  zoom,
  bounds,
  viewportWidth,
  rotation,
  isHidden,
  isLocked,
  isEditing,
  shouldRound,
  hideCloneHandles,
  hideBoundsHandles,
  hideRotateHandle,
  hideBindingHandles,
  enableBoundsHandles,
}: BoundsProps): JSX.Element {
  // Touch target size
  const targetSize = (viewportWidth < 768 ? 16 : 8) / zoom
  // Handle size
  const size = 8 / zoom

  const smallDimension = Math.min(bounds.width, bounds.height) * zoom
  // If the bounds are small, don't show the rotate handle
  const showRotateHandle = !hideRotateHandle && !isHidden && !isLocked && smallDimension > 32
  // If the bounds are very small, don't show the edge handles
  const showEdgeHandles = !hideBoundsHandles && !isHidden && !isLocked && smallDimension > 24
  // If the bounds are very very small, don't show the corner handles
  const showCornerHandles = !hideBoundsHandles && !isHidden && !isLocked && smallDimension > 20
  // If the bounds are very small, don't show the clone handles
  const showCloneHandles = !hideCloneHandles && smallDimension > 24

  return (
    <Container hasSize={true} bounds={bounds} rotation={rotation}>
      <SVGContainer>
        <CenterHandle
          isEditing={isEditing}
          bounds={bounds}
          isLocked={isLocked}
          isHidden={isHidden}
          shouldRound={shouldRound}
        />
        {enableBoundsHandles &&
          Object.values(TLBoundsEdge).map((edge) => (
            <EdgeHandle
              key={edge}
              targetSize={targetSize}
              size={size}
              bounds={bounds}
              edge={edge}
              isHidden={!showEdgeHandles}
            />
          ))}
        {enableBoundsHandles &&
          Object.values(TLBoundsCorner).map((corner) => (
            <CornerHandle
              key={corner}
              targetSize={targetSize}
              size={size}
              bounds={bounds}
              corner={corner}
              isHidden={isHidden || !showCornerHandles}
            />
          ))}
        {showRotateHandle && (
          <RotateHandle
            targetSize={targetSize}
            size={size}
            bounds={bounds}
            isHidden={!showEdgeHandles}
          />
        )}
        {showCloneHandles && <CloneButtons bounds={bounds} targetSize={targetSize} size={size} />}
        {!hideBindingHandles && (
          <LinkHandle
            targetSize={targetSize}
            size={size}
            bounds={bounds}
            isHidden={!showEdgeHandles}
          />
        )}
      </SVGContainer>
    </Container>
  )
})
