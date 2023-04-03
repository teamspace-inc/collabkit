import React from 'react'
import type { TLShape, TLUsers } from '~types'
import Utils from '~utils'
import { Brush } from '~components/brush'

interface UserBrushProps<T extends TLShape> {
  userId: string
  users: TLUsers<T>
}

export function UsersBrush<T extends TLShape>({ userId, users }: UserBrushProps<T>) {
  return (
    <>
      {Object.values(users)
        .filter(Boolean)
        .filter((user) => user.id !== userId && user.selectBox)
        .map((user) => {
          if (!user.selectBox) return null
          const [x0, y0, x1, y1] = user.selectBox
          return (
            <Brush
              key={user.id + '_brush'}
              brush={Utils.getBoundsFromPoints([
                [x0, y0],
                [x1, y1],
              ])}
              color={user.color}
            />
          )
        })}
    </>
  )
}
