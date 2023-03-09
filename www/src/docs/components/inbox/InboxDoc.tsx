import { AdvancedProps } from '../../advanced/AdvancedCommon';
import { renderCodeSnippet } from '../../CodeEditor';
import { InboxDemo } from '../../demos/InboxDemo';
import { Demo } from '../../Doc';
import Usage from './InboxUsage.tsx?raw';

export function InboxDoc() {
  return (
    <>
      <h2>See all comment threads in one place.</h2>
      <Demo style={{ padding: '20px 0px' }}>
        <InboxDemo />
      </Demo>
      <div>
        <h3>Usage</h3>
        <p>
          A users inbox of all recent comments in their workspace. Clicking on a comment thread from
          the inbox navigates the user to the URL of that thread.
        </p>
        {renderCodeSnippet(Usage)}
      </div>
      <div>
        <h3>Props</h3>
        <AdvancedProps
          props={[]}
          optionalProps={[
            [
              'formatTimestamp',
              '((timestamp: number) => string) | undefined',
              'A function that formats the timestamp of a comment. By default, timestamps from the same day are shown using a short relative time (e.g. "2h") and older timestamps using the calendar date (e.g. "Sep 15").',
            ],
            ['maxHeight', 'string | undefined', 'The maximum height of the inbox as a CSS value.'],
            [
              'threadIds',
              'string[] | undefined',
              'An array of thread IDs to show in the inbox. If not provided, all threads in the workspace will be shown.',
            ],
          ]}
        />
      </div>
    </>
  );
}
