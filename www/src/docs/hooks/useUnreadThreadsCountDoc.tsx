import { renderCodeSnippet } from '../CodeEditor';
import { Doc } from '../Doc';

export function UseUnreadThreadsCountDoc() {
  return (
    <div>
      <p style={{ fontSize: 20, lineHeight: '28px' }}>
        Gets the number of threads with unread comments for the authenticated user.
      </p>
      <h3>Usage</h3>
      <p>
        Must be called within a <code>CollabKit.Provider</code>
      </p>
      {renderCodeSnippet(`import { useUnreadThreadsCount } from '@collabkit/react';

const count = useUnreadThreadsCount();

// count is 1`)}
    </div>
  );
}
