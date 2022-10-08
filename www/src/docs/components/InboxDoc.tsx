import { Inbox } from '@collabkit/react';
import { H2, H3 } from '../../UIKit';
import { renderCodeSnippet } from '../CodeEditor';
import { DocDemoContainer } from '../Doc';

export function InboxDoc() {
  return (
    <>
      <H2>See all comment threads in one place.</H2>
      <DocDemoContainer
        style={{
          padding: 0,
          justifyContent: 'flex-end',
          height: '500px',
          display: 'flex',
          flex: 'unset',
          alignItems: 'flex-start',
          clipPath: 'inset(0px round 6px 6px 6px 6px)',
        }}
      >
        <Inbox />
      </DocDemoContainer>
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
