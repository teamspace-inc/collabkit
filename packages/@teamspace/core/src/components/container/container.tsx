import * as React from 'react'
import type { TLBounds } from '~types'
import { usePosition } from '~hooks'

interface ContainerProps {
  id?: string
  bounds: TLBounds
  rotation?: number
  isHidden?: boolean
  hasSize?: boolean
  className?: string
  dataTestId?: string
  children: React.ReactNode
}

export const Container = React.memo(function Container({
  id,
  bounds,
  rotation = 0,
  isHidden = false,
  hasSize,
  className,
  dataTestId,
  children,
}: ContainerProps) {
  const rPositioned = usePosition(bounds, rotation)
  return (
    <div
      id={id}
      ref={rPositioned}
      data-test-id={dataTestId}
      className={['tl-positioned', className || '', !hasSize || isHidden ? 'tl-hidden' : ''].join(
        ' '
      )}
    >
      {children}
    </div>
  )
})
