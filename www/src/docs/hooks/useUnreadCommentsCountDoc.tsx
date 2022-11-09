import { AdvancedProps } from '../advanced/AdvancedCommon';
import { renderCodeSnippet } from '../CodeEditor';

export function UseUnreadCommentsCountDoc() {
  return (
    <>
      <h2>Returns the number of unread comments for a thread</h2>
      <div>
        <h3>Usage</h3>
        {renderCodeSnippet(`import { useUnreadCommentsCount } from '@collabkit/react';

const count = useUnreadCommentsCount({ threadId: 'unique-thread-id' });`)}
      </div>

      <div>
        <h3>Props</h3>
        <AdvancedProps
          props={[
            [
              'threadId',
              'string',
              <>
                The <code>threadId</code> to retrieve unread count for.
              </>,
            ],
          ]}
        />
      </div>
    </>
  );
}
