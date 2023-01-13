import React from 'react';
import { SidebarThreads } from './SidebarThreads';
import { ThreadsInbox } from './ThreadsInbox';

export function SidebarThreadsInbox() {
  return (
    <SidebarThreads>
      <ThreadsInbox maxHeight='93.5%'/>
    </SidebarThreads>
  );
}
