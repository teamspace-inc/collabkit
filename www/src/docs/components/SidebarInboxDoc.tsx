import { renderCodeSnippet } from '../CodeEditor';
import { SidebarDemo } from '../demos/SidebarDemo';
import { DocDemoContainer } from '../Doc';

export function SidebarInboxDoc() {
  return (
    <>
      <h2>Inbox rendered in a Sidebar.</h2>
      <DocDemoContainer
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
        <SidebarDemo />
      </DocDemoContainer>
      <div>
        <h3>Usage</h3>
        <p>
          A sidebar component that can automatically show and hide the users inbox of comments. Use
          with a <code>{'<SidebarInboxButton>'}</code> to easily add a comments inbox to your app.
        </p>
        {renderCodeSnippet(`import { 
  SidebarInboxButton, 
  SidebarInbox, 
} from '@collabkit/react';

export function App() {
  return <div>
    <SidebarInboxButton />
    <SidebarInbox />
  </div>;
}`)}
      </div>
    </>
  );
}
