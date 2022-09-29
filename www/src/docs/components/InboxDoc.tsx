import { H2, H3 } from '../../UIKit';
import { renderCodeSnippet } from '../CodeEditor';
import { DocDemoContainer } from '../Doc';

export function InboxDoc() {
  return (
    <>
      <H2>
        Shows open comment threads, so a user can see which conversations are happening and what
        they need to respond to in one place.
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
