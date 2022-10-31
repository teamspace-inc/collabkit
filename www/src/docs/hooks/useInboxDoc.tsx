import { renderCodeSnippet } from '../CodeEditor';
import Usage from './useInboxDocUsage.tsx?raw';

export function UseInboxDoc() {
  return (
    <>
      <h2>Subscribe to a users inbox</h2>
      <div>
        <h3>Usage</h3>
        <p>
          <code>useInbox</code> lets you subscribe to threads in a users inbox.
        </p>
        <p>
          Must be called within a <code>CollabKitProvider</code>
        </p>

        {renderCodeSnippet(Usage)}
      </div>

      <div>
        <h3>Props</h3>
        <h4>filter: 'all' | 'open'</h4>

        <p>Return all or just open (unresolved) threads.</p>
      </div>

      <div>
        <h3>Returns</h3>
        <h4>{'{ [threadId: string]: InboxItem }'}</h4>
        <p>Object keys are sorted to show latest threads first.</p>
        {/* find a better way to show types in our documentation */}
        {renderCodeSnippet(`type InboxItem = {  
  latestComment: {
    body: string, 
    createdAt: timestamp, 
    id: string, 
    type: "message" 
  },
  isResolved: boolean
}`)}
      </div>
    </>
  );
}
