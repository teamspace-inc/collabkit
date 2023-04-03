import React from 'react'
import { useBoundsHandleEvents } from '~hooks'
import { TLBoundsCorner, TLBounds } from '~types'

const cornerBgClassnames = {
  [TLBoundsCorner.TopLeft]: 'tl-cursor-nwse',
  [TLBoundsCorner.TopRight]: 'tl-cursor-nesw',
  [TLBoundsCorner.BottomRight]: 'tl-cursor-nwse',
  [TLBoundsCorner.BottomLeft]: 'tl-cursor-nesw',
}

interface CornerHandleProps {
  size: number
  targetSize: number
  bounds: TLBounds
  corner: TLBoundsCorner
  isHidden?: boolean
  isEnabled?: boolean
}

const labels = {
  [TLBoundsCorner.TopLeft]: 'top left corner handle',
  [TLBoundsCorner.TopRight]: 'top right corner handle',
  [TLBoundsCorner.BottomRight]: 'bottom right corner handle',
  [TLBoundsCorner.BottomLeft]: 'bottom left corner handle',
}

export const CornerHandle = React.memo(function CornerHandle({
  size,
  targetSize,
  isHidden = false,
  isEnabled = true,
  corner,
  bounds,
}: CornerHandleProps): JSX.Element {
  const events = useBoundsHandleEvents(corner)

  const isTop = corner === TLBoundsCorner.TopLeft || corner === TLBoundsCorner.TopRight
  const isLeft = corner === TLBoundsCorner.TopLeft || corner === TLBoundsCorner.BottomLeft

  return (
    <g opacity={isHidden ? 0 : 1}>
      <rect
        className={'tl-transparent ' + (isEnabled ? cornerBgClassnames[corner] : '')}
        data-testid="corner-transparent"
        aria-label={labels[corner]}
        x={(isLeft ? -1 : bounds.width + 1) - targetSize}
        y={(isTop ? -1 : bounds.height + 1) - targetSize}
        width={targetSize * 2}
        height={targetSize * 2}
        pointerEvents={isEnabled ? 'all' : 'none'}
        {...events}
      />
      <rect
        className="tl-corner-handle"
        data-testid="corner-handle"
        x={(isLeft ? -1 : bounds.width + 1) - size / 2}
        y={(isTop ? -1 : bounds.height + 1) - size / 2}
        width={size}
        height={size}
        pointerEvents="none"
      />
    </g>
  )
})
