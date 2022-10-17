import { renderCodeSnippet } from '../CodeEditor';

export function UseUnreadThreadsCountDoc() {
  return (
    <>
      <h2>Returns the number of unread threads.</h2>
      <div>
        <h3>Usage</h3>
        <p>
          Must be called within a <code>CollabKit.Provider</code>
        </p>
        {renderCodeSnippet(`import { useUnreadThreadsCount } from '@collabkit/react';

const count = useUnreadThreadsCount();

console.log({ count })
// count is 1`)}
      </div>
    </>
  );
}
