import { renderCodeSnippet } from '../CodeEditor';

export function UseUnreadThreadsCountDoc() {
  return (
    <>
      <h2>Returns the number of unread threads</h2>
      <div>
        <h3>Usage</h3>

        {renderCodeSnippet(`import { useUnreadThreadsCount } from '@collabkit/react';

const count = useUnreadThreadsCount();`)}
      </div>
    </>
  );
}
