import { SidebarInboxButton } from '@collabkit/react';
import { renderCodeSnippet } from '../CodeEditor';
import { DocDemoContainer } from '../Doc';

export function SidebarInboxButtonDoc() {
  return (
    <>
      <h2>A button with an unread indicator.</h2>
      <DocDemoContainer
        style={{
          padding: 0,
          height: '500px',
          display: 'flex',
          flex: 'unset',
          clipPath: 'inset(0px round 6px 6px 6px 6px)',
        }}
      >
        <div style={{ background: 'white', borderRadius: '8px' }}>
          <SidebarInboxButton />
        </div>
      </DocDemoContainer>
      <div>
        <h3>Usage</h3>
        <p>
          A button that displays the number of unread comments in the users inbox. Clicking the
          button will show the inbox using a <code>{'<Sidebar />'}</code> component. <br />
          <br />
          Ensure you have rendered the <code>{'<Sidebar />'}</code> component in your app already.
        </p>
        {renderCodeSnippet(`import { SidebarInboxButton } from '@collabkit/react';

export function App() {
  return <div>
    <SidebarInboxButton />
  </div>;
}`)}
      </div>
      <div>
        <h3>Props</h3>
        <h4>children?: React.ReactNode</h4>
        <p>Replace the contents of the button with other elements.</p>
      </div>
    </>
  );
}
