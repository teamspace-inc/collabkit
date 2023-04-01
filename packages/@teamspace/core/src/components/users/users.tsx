import * as React from 'react'
import { User } from '~components/user/user'
import type { TLShape, TLUsers } from '~types'

export interface UserProps {
  userId?: string
  users: TLUsers<TLShape>
  zoom: number
}

export function Users({ userId, users }: UserProps) {
  return (
    <>
      {Object.values(users)
        .filter((user) => user && user.id !== userId)
        .map((user) => (
          <User key={user.id} user={user} />
        ))}
    </>
  )
}
