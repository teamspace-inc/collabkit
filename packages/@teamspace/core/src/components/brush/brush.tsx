import { SVGContainer } from '~components'
import { Container } from '~components/container'
import type { TLBounds } from '~types'
import React from 'react'

export const Brush = React.memo(function Brush({
  brush,
  color,
}: {
  brush: TLBounds
  color?: string
}): JSX.Element | null {
  return (
    <Container bounds={brush} rotation={0}>
      <SVGContainer>
        <rect
          className="tl-brush"
          opacity={1}
          x={0}
          y={0}
          width={brush.width}
          height={brush.height}
          style={color ? { fill: color, fillOpacity: 0.05 } : undefined}
        />
      </SVGContainer>
    </Container>
  )
})
