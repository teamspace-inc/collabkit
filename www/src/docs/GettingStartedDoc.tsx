import { docDemoContainer, docStep } from '../styles/Docs.css';
import { renderCodeSnippet } from './CodeEditor';
import { ThreadDemo } from './demos/ThreadDemo';
import { DocLink } from './Doc';

export function GettingStartedDoc() {
  return (
    <>
      <h2>A quick tutorial to get you up and running with CollabKit</h2>
      <p>
        In this tutorial we'll show you how to add a comment thread to your app. Set aside 5 to 10
        minutes to get this done.
      </p>
      <div>
        <h3 className={docStep}>Install @collabkit/react</h3>
        <p>With npm:</p>
        {renderCodeSnippet(`npm install @collabkit/react`, [], 'shell')}
        <p>Or with yarn:</p>
        {renderCodeSnippet(`yarn add @collabkit/react`, [], 'shell')}
      </div>
      <div>
        <h3 className={docStep}>Import styles</h3>
        <p>In a JS module:</p>
        {renderCodeSnippet(`import '@collabkit/react/dist/style.css';`)}
        <p>Or in CSS file:</p>
        {renderCodeSnippet(`@import '@collabkit/react/dist/style.css';`, [], 'css')}
      </div>
      <div>
        <h3 className={docStep}>Wrap your app in a CollabKitProvider</h3>
        <p>
          Be sure to pass in <code>user</code> and <code>workspace</code> details.
        </p>
        {renderCodeSnippet(`import { CollabKitProvider } from '@collabkit/react';

export default function App() {
  return (
    <CollabKitProvider 
      appId={'your APP ID here'} 
      apiKey={'your API Key here'}
      user={{
        id: 'jane',
        name: 'Jane Doe',
        email: 'jane@example.com'
      }}
      workspace={{
        id: 'acme',
        name: 'ACME Corporation'
      }}>
      mentionableUsers={[]}
      {/* your app code here */}
    </CollabKitProvider>
  );
}`)}
      </div>
      <div>
        <h3 className={docStep}>Add a Thread to your app</h3>
        {renderCodeSnippet(`import { Thread } from '@collabkit/react';

<div style={{ width: 280, height: 320 }}>
  <Thread threadId={'unique ID here'} />
</div>;`)}
        <div>
          <br />
          <p>
            You should see a <code>{'<Thread />'}</code>
          </p>
          <ThreadDemo className={docDemoContainer} />
        </div>
      </div>

      <div>
        <h3 className={docStep}>Try it out!</h3>
        <p>
          Load the page with the <code>{'<Thread />'}</code> on it and send some messages. Deploy to
          staging and share a link with your coworkers so they can try it out.
        </p>
      </div>
      <div>
        <h3 className={docStep}>Turn on Secure Mode</h3>
        <p>
          Before going live, enable <DocLink href="/docs/securemode">Secure Mode</DocLink> which
          requires generating a per user token for each request.
        </p>
      </div>
    </>
  );
}
