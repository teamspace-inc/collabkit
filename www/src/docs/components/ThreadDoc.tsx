import { CollabKitProvider } from '@collabkit/react';
import { styled } from '../../UIKit';
import { CodeEditor } from '../CodeEditor';
import { Doc } from '../Doc';
import { Markdown } from '../Markdown';
import ThreadMarkdown from '../markdown/Thread.md?raw';

const StyledMarkdown = styled(Markdown, {
  code: {
    fontFamily: 'Monaco',
    fontSize: 14,
    color: '#a31515',
  },
});

const apiKey = import.meta.env.VITE_COLLABKIT_API_KEY;
const appId = import.meta.env.VITE_COLLABKIT_APP_ID;
const workspace = {
  id: import.meta.env.VITE_COLLABKIT_WORKSPACE_ID,
  name: import.meta.env.VITE_COLLABKIT_WORKSPACE_NAME,
};

export function ThreadDoc() {
  return (
    <Doc title="Thread">
      <p style={{ fontSize: 20, lineHeight: '28px' }}>
        Shows comment threads visible to the authenticated user &amp; workspace. Only open threads
        are shown by default.
      </p>
      <h3>Demo</h3>
      <CollabKitProvider
        appId={appId}
        apiKey={apiKey}
        workspace={workspace}
        user={{ id: '1234', email: 'namit@collabkit.dev' }}
        mentionableUsers={[]}
      >
        <div
          style={{
            background: 'cyan',
            height: '500px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Live demo here
          {/* <Thread threadId="1234"></Thread> */}
        </div>
      </CollabKitProvider>

      <h3>Usage</h3>
      <CodeEditor
        language="typescript"
        code={`
import { Thread } from '@collabkit/react';

<Thread threadId={'my-thread-id'} />`}
        scrollbar={false}
      />
      <div>
        <h3>Props</h3>
        <StyledMarkdown body={ThreadMarkdown}></StyledMarkdown>
      </div>
    </Doc>
  );
}
