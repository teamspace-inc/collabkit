import { AdvancedProps } from '../advanced/AdvancedCommon';
import { renderCodeSnippet } from '../CodeEditor';
import { SidebarCommentsDemo } from '../demos/SidebarDemo';
import { ComponentDemo } from '../ComponentDemo';

export function SidebarInboxButtonDoc() {
  return (
    <>
      <h2>A button that opens the SidebarInbox.</h2>
      <ComponentDemo
        style={{
          padding: 0,
          justifyContent: 'flex-end',
          height: '720px',
          display: 'flex',
          flex: 'unset',
          position: 'relative',
          alignItems: 'flex-start',
        }}
      >
        <SidebarCommentsDemo />
      </ComponentDemo>
      <div>
        <h3>Usage</h3>
        <p>
          A button that displays the number of unread comments in the users inbox. Clicking the
          button will show the inbox using a <code className="ReactNode">{'<Sidebar />'}</code>{' '}
          component. <br />
          <br />
          Ensure you have rendered the <code className="ReactNode">{'<Sidebar />'}</code> component
          in your app already.
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
          props={[
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
