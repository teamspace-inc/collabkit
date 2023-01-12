import React from 'react';
import { Inbox, Sidebar } from '..';

export function SidebarInbox() {
  return (
    <Sidebar>
      <Inbox maxHeight='95%'/>
    </Sidebar>
  );
}
