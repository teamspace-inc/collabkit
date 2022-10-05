import { H2, H3 } from '../../UIKit';
import { renderCodeSnippet } from '../CodeEditor';

export function UseUnreadThreadsCountDoc() {
  return (
    <>
      <H2>Gets the number of threads with unread comments for the authenticated user.</H2>
      <div>
        <H3>Usage</H3>
        <p>
          Must be called within a <code>CollabKit.Provider</code>
        </p>
      </div>
      {renderCodeSnippet(`import { useUnreadThreadsCount } from '@collabkit/react';

const count = useUnreadThreadsCount();

console.log({ count })
// count is 1`)}
    </>
  );
}
