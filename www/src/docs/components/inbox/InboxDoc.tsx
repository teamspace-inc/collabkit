import { renderCodeSnippet } from '../../CodeEditor';
import { InboxDemo } from '../../demos/InboxDemo';
import { DocDemoContainer } from '../../Doc';
import Usage from './InboxUsage.tsx?raw';

export function InboxDoc() {
  return (
    <>
      <h2>See all comment threads in one place.</h2>
      <DocDemoContainer style={{ padding: '20px 0px' }}>
        <InboxDemo />
      </DocDemoContainer>
      <div>
        <h3>Usage</h3>
        <p>
          A users inbox of all recent comments in their workspace. Clicking on a comment thread from
          the inbox navigates the user to the URL of that thread.
        </p>
        {renderCodeSnippet(Usage)}
      </div>
    </>
  );
}
