import { docDemoContainer } from '../../styles/Docs.css';
import { H2, H3 } from '../../UIKit';
import { renderCodeSnippet } from '../CodeEditor';
import { InboxDemo } from '../demos/InboxDemo';

export function InboxDoc() {
  return (
    <>
      <H2>See all comment threads in one place.</H2>
      <InboxDemo className={docDemoContainer} />
      <div>
        <H3>Usage</H3>
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
