import { docDemoContainer } from '../../styles/Docs.css';
import { renderCodeSnippet } from '../CodeEditor';
import { InboxDemo } from '../demos/InboxDemo';

export function InboxDoc() {
  return (
    <>
      <h2>See all comment threads in one place.</h2>
      <InboxDemo className={docDemoContainer} />
      <div>
        <h3>Usage</h3>
        <p>
          A users inbox of all recent comments in their workspace. Clicking on a comment thread from
          the inbox navigates the user to the URL of that thread.
        </p>
        {renderCodeSnippet(`import { Inbox } from '@collabkit/react';

export function App() {
  // position the Inbox on the right side of the screen
  const style = {
    display: 'flex', 
    flex: 1, 
    justifyContent: 'flex-end', 
    height: '500px'
  }

  return <div style={style}>
    <Inbox />
  </div>;
}
`)}
      </div>
    </>
  );
}
