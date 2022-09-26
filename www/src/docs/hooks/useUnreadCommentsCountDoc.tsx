import { renderCodeSnippet } from '../CodeEditor';
import { Doc } from '../Doc';
import { Markdown } from '../Markdown';

export function UseUnreadCommentsCountDoc() {
  return (
    <div>
      <p style={{ fontSize: 20, lineHeight: '28px' }}>
        Gets the number of unread comments in a thread for the authenticated user.
      </p>
      <h3>Usage</h3>
      <p>
        Must be called within a <code>CollabKit.Provider</code>
      </p>
      {renderCodeSnippet(`import { useUnreadCommentsCount } from '@collabkit/react';

const count = useUnreadCommentsCount({ threadId: 'unique-thread-id' });

// count is 1`)}

      <Markdown
        body={`## Props

### threadId: string

The thread ID to retrieve unread count for.`}
      />
    </div>
  );
}
