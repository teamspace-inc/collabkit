import { docDemoContainer } from '../../styles/Docs.css';
import { renderCodeSnippet } from '../CodeEditor';
import { SidebarDemo } from '../demos/SidebarDemo';

export function SidebarInboxButtonDoc() {
  return (
    <>
      <h2>A button that opens the SidebarInbox</h2>
      <SidebarDemo className={docDemoContainer} />
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
