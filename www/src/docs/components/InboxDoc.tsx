import { H2 } from '../../UIKit';
import { renderCodeSnippet } from '../CodeEditor';

export function InboxDoc() {
  return (
    <div>
      <H2>
        Shows comment threads visible to the authenticated user &amp; workspace. Only open threads
        are shown by default.
      </H2>
      <h3>Usage</h3>
      {renderCodeSnippet(`import { Inbox } from '@collabkit/react';

<Inbox />`)}
    </div>
  );
}
