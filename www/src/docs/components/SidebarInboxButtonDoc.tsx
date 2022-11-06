import { AdvancedProps } from '../advanced/AdvancedCommon';
import { renderCodeSnippet } from '../CodeEditor';
import { SidebarDemo } from '../demos/SidebarDemo';
import { DocDemoContainer } from '../Doc';

export function SidebarInboxButtonDoc() {
  return (
    <>
      <h2>A button that opens the SidebarInbox.</h2>
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
        <AdvancedProps
          rows={[
            [
              'children',
              'React.ReactNode | undefined',
              'Optional children to render inside the button and replace default contents.',
            ],
          ]}
        />
      </div>
    </>
  );
}
