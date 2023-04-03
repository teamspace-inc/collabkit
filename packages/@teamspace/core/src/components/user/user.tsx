import React from 'react'
import type { TLShape, TLUser } from '~types'
import { CursorSVG } from './CursorSVG'

interface UserProps {
  user: TLUser<TLShape>
}

export function User({ user }: UserProps) {
  const rUser = React.useRef<HTMLDivElement>(null)

  return (
    <div
      ref={rUser}
      key={user.id}
      className="tl-absolute tl-user"
      style={{
        transform: `translate(
          calc(${user.point[0]}px - (7px * var(--tl-scale))), 
          calc(${user.point[1]}px - (7px * var(--tl-scale)))
        ) scale(var(--tl-scale))`,
      }}
    >
      <CursorSVG color={user.color} />
    </div>
  )
}
