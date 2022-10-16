import { InboxButton } from '@collabkit/react';
import { renderCodeSnippet } from '../CodeEditor';
import { DocDemoContainer } from '../Doc';

export function InboxButtonDoc() {
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
          <InboxButton />
        </div>
      </DocDemoContainer>
      <div>
        <h3>Usage</h3>
        <p>
          Handle <code>onClick</code> and display the users <code>{'<Inbox>'}</code> component.
          <br />
          Alternatively if you have rendered a <code>{'<Sidebar />'}</code> clicking this button
          will show the sidebar.
        </p>
        {renderCodeSnippet(`import { InboxButton } from '@collabkit/react';

export function App() {
  return <div>
    <InboxButton />
  </div>;
}`)}
      </div>
    </>
  );
}
