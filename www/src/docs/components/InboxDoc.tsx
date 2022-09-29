import { H2, H3 } from '../../UIKit';
import { renderCodeSnippet } from '../CodeEditor';
import { DocDemoContainer } from '../Doc';

export function InboxDoc() {
  return (
    <>
      <H2>
        Shows comment threads visible to the authenticated user &amp; workspace. Only open threads
        are shown by default.
      </H2>
      <DocDemoContainer />
      <div>
        <H3>Usage</H3>
        {renderCodeSnippet(`import { Inbox } from '@collabkit/react';

<Inbox />`)}
      </div>
    </>
  );
}
