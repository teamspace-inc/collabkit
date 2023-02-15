import { Inbox, SidebarInboxButton, Sidebar } from '@collabkit/react';

export function SidebarDemo() {
  return (
    <>
      <div style={{ position: 'absolute', top: 12, left: 12 }}>
        <SidebarInboxButton />
      </div>
      <Sidebar>
        <Inbox />
      </Sidebar>
    </>
  );
}
