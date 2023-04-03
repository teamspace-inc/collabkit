import React from 'react'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ShapeIndicator } from '~components/shape-indicator'
import type { TLPage, TLShape, TLUser } from '~types'

interface UserIndicatorProps<T extends TLShape> {
  page: TLPage<any, any>
  usersList: TLUser<T>[]
  meta: any
  userId: string
}

export function UsersIndicators<T extends TLShape>({
  userId,
  usersList,
  meta,
  page,
}: UserIndicatorProps<T>) {
  return (
    <>
      {usersList
        .filter((user) => user.id !== userId && user.selectedIds.length > 0)
        .map((user) => {
          const shapes = user.selectedIds.map((id) => page.shapes[id]).filter(Boolean)

          if (shapes.length === 0) return null

          return (
            <React.Fragment key={user.id + '_shapes'}>
              {shapes.map((shape) => (
                <ShapeIndicator
                  key={`${user.id}_${shape.id}_indicator`}
                  shape={shape}
                  user={user}
                  meta={meta}
                  isHovered
                />
              ))}
            </React.Fragment>
          )
        })}
    </>
  )
}
