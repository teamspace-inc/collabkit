import React from 'react'
import type { TLBounds } from '~types'
import { css } from '@stitches/react'

const boundsCenterCss = css({
  fill: 'transparent',
  pointerEvents: 'none',
  variants: {
    isEditing: {
      true: {
        stroke: 'var(--tl-editingStroke)',
        strokeWidth: 'calc(1.5px * var(--tl-scale))',
      },
      false: {
        strokeWidth: 'calc(1.5px * var(--tl-scale))',
        stroke: 'var(--tl-selectStroke)',
      },
    },
    shouldRound: {
      true: {
        rx: 'calc($radii$2 + 1px)',
      },
    },
  },
})

export interface CenterHandleProps {
  bounds: TLBounds
  isLocked: boolean
  isHidden: boolean
  isEditing: boolean
  shouldRound: boolean
}

export const CenterHandle = React.memo(function CenterHandle({
  bounds,
  isLocked,
  isHidden,
  isEditing,
  shouldRound,
}: CenterHandleProps): JSX.Element {
  return (
    <rect
      className={boundsCenterCss({ isEditing, shouldRound })}
      x={-1}
      y={-1}
      width={bounds.width + 2}
      height={bounds.height + 2}
      opacity={isHidden ? 0 : 1}
      pointerEvents="none"
      aria-label="center handle"
    />
  )
})
