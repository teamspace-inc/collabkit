import { AdvancedProps } from "../../advanced/AdvancedCommon";
import { renderCodeSnippet } from "../../CodeEditor";

export function usePopoverUnreadCommentsCount() {
  return (
    <>
      <h2>Returns the number of unread comments for a popover thread</h2>
      <div>
        <h3>Usage</h3>
        {renderCodeSnippet(`import { usePopoverUnreadCommentsCount } from '@collabkit/react';

const count = usePopoverUnreadCommentsCount({ objectId: 'unique-object-id' });`)}
      </div>

      <div>
        <h3>Props</h3>
        <AdvancedProps
          props={[
            [
              'objectId',
              'string',
              <>
                The <code>objectId</code> to retrieve unread count for.
              </>,
            ],
          ]}
        />
      </div>
    </>
  );
}
