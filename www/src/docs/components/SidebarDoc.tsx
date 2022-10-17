import { docDemoContainer } from '../../styles/Docs.css';
import { renderCodeSnippet } from '../CodeEditor';
import { SidebarDemo } from '../demos/SidebarDemo';

export function SidebarDoc() {
  return (
    <>
      <h2>A sidebar you can use to show and hide the Inbox easily.</h2>
      <SidebarDemo className={docDemoContainer} />
      <div>
        <h3>Usage</h3>
        <p>
          A sidebar component that can automatically show and hide the users inbox of comments. Use
          with a <code>{'<SidebarInboxButton>'}</code> to easily add a comments inbox to your app.
        </p>
        {renderCodeSnippet(`import { 
  SidebarInboxButton, 
  Sidebar, 
  Inbox 
} from '@collabkit/react';

export function App() {
  return <div>
    <SidebarInboxButton />
    <Sidebar>
      <Inbox />
    </Sidebar>
  </div>;
}`)}
      </div>

      <div>
        <h3>Props</h3>
        <h4>children?: React.ReactNode</h4>
        <p>What to render in the Sidebar.</p>
        <h4>title?: string</h4>
        <p>
          Title of the Sidebar. Defaults to <code>'Comments'</code>.
        </p>
        <h4>strategy?: 'fixed' | 'absolute'</h4>
        <p>
          How the sidebar is positioned. Defaults to <code>fixed</code>. Set this to{' '}
          <code>'absolute'</code> if you require more control over where the sidebar shows up.
        </p>
      </div>
    </>
  );
}