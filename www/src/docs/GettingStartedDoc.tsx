import { H2, H3 } from '../UIKit';
import { renderCodeSnippet } from './CodeEditor';

const installCode = `# with npm
npm install @collabkit/react
        
# or with yarn
yarn add @collabkit/react`;

const providerCode = `import { Provider } from '@collabkit/react';

export default function App() {
  return (
    <Provider appId={'your APP ID here'} apiKey={'your API Key here'}>
      {/* your app code here */}
    </Provider>
  );
}`;

const threadCode = `import { Thread } from '@collabkit/react';

<Thread threadId={'unique ID here'} />;`;

export function GettingStartedDoc() {
  return (
    <div>
      <H2>A quick tutorial to get you up and running with CollabKit.</H2>
      <p>
        In this tutorial we'll show you how to add a comment thread to your app. Set aside 5 to 10
        minutes to get this done.
      </p>
      <H3>1. Install @collabkit/react</H3>
      {renderCodeSnippet(installCode)}
      <H3>2. Wrap your app in a `Provider`</H3>
      <p>Be sure to pass in `user` and `workspace` details.</p>
      {renderCodeSnippet(providerCode)}
      <H3>3. Add a Thread to your app</H3>
      {renderCodeSnippet(threadCode)}
      <H3>4. Try it out</H3>
      <p>
        Load the page with the Thread on it, send some messages, invite your coworkers to try it out
        too.
      </p>
      <H3>5. Turn on secure mode</H3>
      <p>
        Before going live, enable secure mode which requires generating a per user token for each
        request.
      </p>
    </div>
  );
}
