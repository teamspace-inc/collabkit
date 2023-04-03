import React from 'react'
import type { TLPage, TLShape, TLUser } from '~types'
import Utils from '~utils'
import { useTLContext } from '~hooks'

interface UserSelectionProps<T extends TLShape> {
  page: TLPage<any, any>
  userId: string
  usersList: TLUser<T>[]
}

export function UsersSelection<T extends TLShape>({
  userId,
  usersList,
  page,
}: UserSelectionProps<T>) {
  const { shapeUtils } = useTLContext()

  return (
    <>
      {usersList
        .filter((user) => user.id !== userId && user.selectedIds.length > 0)
        .map((user) => {
          const shapes = user.selectedIds.map((id) => page.shapes[id]).filter(Boolean)

          if (shapes.length === 0) return null

          const bounds = Utils.getCommonBounds(
            shapes.map((shape) => shapeUtils[shape.type].getBounds(shape))
          )

          return (
            <React.Fragment key={user.id + '_shapes'}>
              <div
                className="tl-absolute tl-user-indicator-bounds"
                style={{
                  // backgroundColor: user.selectionColor,
                  borderColor: user.color,
                  transform: `translate(${bounds.minX - 6}px, ${bounds.minY - 6}px)`,
                  border: 'none',
                  width: bounds.width + 12,
                  height: bounds.height + 12,
                  // borderRadius: '7.5px',
                  pointerEvents: 'none',
                }}
              />
            </React.Fragment>
          )
        })}
    </>
  )
}
