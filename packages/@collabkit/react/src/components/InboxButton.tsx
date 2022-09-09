import React from 'react';
import { useSnapshot } from 'valtio';
import { useApp } from '../hooks/useApp';
import { useUserContext } from '../hooks/useUserContext';
import { useWorkspaceStore } from '../hooks/useWorkspaceStore';
import { Button } from './Button';

export function InboxButton() {
  const { store } = useApp();
  const { workspaceId } = useUserContext();
  const workspace = store.workspaces[workspaceId];

  return (
    <Button
      type={'primary'}
      onPointerDown={function (e: React.PointerEvent<Element>): void {
        throw new Error('Function not implemented.');
      }}
      text={'Comments'}
    ></Button>
  );
}
