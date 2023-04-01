/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as React from 'react'
import type { TLBounds } from '~types'
import { useBoundsEvents } from '~hooks'
import { Container } from '~components/container'
import { SVGContainer } from '~components/svg-container'
import { css } from '@stitches/react'

const tlBoundsBgCss = css('rect', {
  stroke: 'none',
  fill: 'var(--tl-selectFill)',
  contain: 'layout style size',
  pointerEvents: 'all',
})

interface BoundsBgProps {
  bounds: TLBounds
  rotation: number
  isHidden: boolean
  shouldRound: boolean
}

export const BoundsBg = React.memo(function BoundsBg({
  bounds,
  rotation,
  isHidden,
}: BoundsBgProps): JSX.Element {
  const events = useBoundsEvents()
  return (
    <Container hasSize={true} bounds={bounds} rotation={rotation} dataTestId="Bounds">
      <SVGContainer>
        <rect
          className={tlBoundsBgCss()}
          aria-label="bounds bg"
          width={bounds.width}
          height={bounds.height}
          opacity={isHidden ? 0 : 1}
          {...events}
        />
      </SVGContainer>
    </Container>
  )
})
