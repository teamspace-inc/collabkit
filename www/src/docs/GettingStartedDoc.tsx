import { docStep, inset } from '../styles/Docs.css';
import { renderCodeSnippet } from './CodeEditor';
import { ThreadDemo } from './demos/ThreadDemo';
import { DocDemoContainer, DocLink } from './Doc';
import GettingStartedDocProviderSnippet from './GettingStartedDocProviderSnippet?raw';
import GettingStartedDocThreadSnippet from './GettingStartedDocThreadSnippet?raw';

export function GettingStartedDoc() {
  return (
    <>
      <div>
        <h2>A quick tutorial to get you up and running with CollabKit</h2>
        <p>
          In this tutorial we'll show you how to add a comment thread to your app. <br />
          <br />
          Once you complete this you'll be ready to integrate other components and start customising
          CollabKit. <br />
          <br />
          Set aside 5 to 10 minutes to get this done.
        </p>
      </div>
      <div className={inset}>
        <h3 className={docStep}>Install @collabkit/react</h3>
        <p>With npm:</p>
        {renderCodeSnippet(`npm install @collabkit/react`, [], 'shell')}
        <p>Or with yarn:</p>
        {renderCodeSnippet(`yarn add @collabkit/react`, [], 'shell')}
      </div>
      <div className={inset}>
        <h3 className={docStep}>Import styles</h3>
        <p>In a JS module:</p>
        {renderCodeSnippet(`import '@collabkit/react/dist/style.css';`)}
        <p>Or in CSS file:</p>
        {renderCodeSnippet(`@import '@collabkit/react/dist/style.css';`, [], 'css')}
      </div>
      <div className={inset}>
        <h3 className={docStep}>Wrap your app in a CollabKitProvider</h3>
        <p>
          Be sure to pass in <code>user</code> and <code>workspace</code> details.
        </p>
        {renderCodeSnippet(GettingStartedDocProviderSnippet)}
      </div>
      <div className={inset}>
        <h3 className={docStep}>Add a Thread to your app</h3>
        {renderCodeSnippet(GettingStartedDocThreadSnippet)}
        <div>
          <p>
            You should see a <code className="ReactNode">{'<Thread />'}</code> like the one below:
          </p>
          <DocDemoContainer>
            <ThreadDemo />
          </DocDemoContainer>
        </div>
      </div>

      <div className={inset}>
        <h3 className={docStep}>Try it out!</h3>
        <p>
          Load the page with the <code className="ReactNode">{'<Thread />'}</code> on it and send
          some messages. Deploy to staging and share a link with your coworkers so they can try it
          out.
        </p>
      </div>
      <div className={inset}>
        <h3 className={docStep}>Turn on Secure Mode</h3>
        <p>
          Before going live, enable <DocLink href="/docs/securemode">Secure Mode</DocLink> which
          requires generating a per user token for each request.
        </p>
      </div>
    </>
  );
}
