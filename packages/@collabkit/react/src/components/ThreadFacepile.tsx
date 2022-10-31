import React from 'react';
import { Facepile } from './Facepile';
import { useThreadUsers } from '../hooks/public/useThreadUsers';

export function ThreadFacepile(props: { size?: string } & React.ComponentPropsWithoutRef<'div'>) {
  const users = useThreadUsers();
  return users ? <Facepile users={users} {...props} /> : null;
}
