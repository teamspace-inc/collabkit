import { H2, H3 } from '../../UIKit';
import { renderCodeSnippet } from '../CodeEditor';
import { Markdown } from '../Markdown';

export function UseUnreadCommentsCountDoc() {
  return (
    <>
      <H2>Returns the number of unread comments for a thread.</H2>
      <div>
        <H3>Usage</H3>
        <p>
          Must be called within a <code>CollabKit.Provider</code>
        </p>
        {renderCodeSnippet(`import { useUnreadCommentsCount } from '@collabkit/react';

const count = useUnreadCommentsCount({ threadId: 'unique-thread-id' });

// count is 1`)}
      </div>

      <Markdown
        body={`### Props

#### threadId: string

The thread ID to retrieve unread count for.`}
      />
    </>
  );
}
