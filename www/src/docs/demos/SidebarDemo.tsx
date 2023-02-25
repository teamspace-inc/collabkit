import { ToggleSidebarCommentsButton, SidebarComments } from '@collabkit/react';

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
