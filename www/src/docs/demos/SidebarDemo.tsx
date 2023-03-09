import { ToggleSidebarCommentsButton, SidebarComments } from '@collabkit/react';
import { useEffect } from 'react';

export function SidebarCommentsDemo() {
  return (
    <>
      <div style={{ position: 'absolute', top: 12, left: 12 }}>
        <ToggleSidebarCommentsButton />
      </div>
      <SidebarComments />
    </>
  );
}

export function SidebarCommentsBarOnlyDemo() {
  return (
    <div
      style={{
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        height: '50vh',
        background: 'red',
      }}
    >
      <SidebarComments defaultOpen />
    </div>
  );
}
