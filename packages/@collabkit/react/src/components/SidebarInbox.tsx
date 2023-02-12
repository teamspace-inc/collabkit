import React from 'react';
import Inbox from './Inbox';
import Sidebar from './Sidebar';

export function SidebarInbox() {
  return (
    <Sidebar>
      <Inbox maxHeight="93.5%" />
    </Sidebar>
  );
}
