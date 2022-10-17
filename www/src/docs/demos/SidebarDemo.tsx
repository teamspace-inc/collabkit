import { Inbox, SidebarInboxButton, Sidebar } from '@collabkit/react';

export function SidebarDemo(props: { className?: string }) {
  return (
    <div
      className={props.className}
      style={{
        padding: 0,
        justifyContent: 'flex-end',
        height: '720px',
        display: 'flex',
        flex: 'unset',
        position: 'relative',
        alignItems: 'flex-start',
        clipPath: 'inset(0px round 6px 6px 6px 6px)',
      }}
    >
      <div style={{ position: 'absolute', top: 12, left: 12 }}>
        <SidebarInboxButton />
      </div>
      <Sidebar strategy="absolute">
        <Inbox />
      </Sidebar>
    </div>
  );
}
