import { renderCodeSnippet } from '../CodeEditor';
import { Doc } from '../Doc';

export function InboxDoc() {
  return (
    <Doc title="Inbox">
      <p style={{ fontSize: 20, lineHeight: '28px' }}>
        Shows comment threads visible to the authenticated user &amp; workspace. Only open threads
        are shown by default.
      </p>

      <div
        style={{
          background: 'cyan',
          height: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Live demo here
        {/* <Thread threadId="1234"></Thread> */}
      </div>

      <h3>Usage</h3>
      {renderCodeSnippet(`import { Inbox } from '@collabkit/react';

<Inbox />`)}
    </Doc>
  );
}
