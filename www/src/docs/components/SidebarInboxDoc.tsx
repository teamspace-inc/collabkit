import { docDemoContainer } from '../../styles/Docs.css';
import { renderCodeSnippet } from '../CodeEditor';
import { SidebarDemo } from '../demos/SidebarDemo';

export function SidebarInboxDoc() {
  return (
    <>
      <h2>Inbox rendered in a Sidebar.</h2>
      <SidebarDemo className={docDemoContainer} />
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
