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
      <H3>Implementing a thread</H3>
      <p>1. Install @collabkit/react</p>
      {renderCodeSnippet(installCode)}
      <p>2. Wrap your app in a `Provider`</p>
      <p>Be sure to pass in `user` and `workspace` details.</p>
      {renderCodeSnippet(providerCode)}
      <p>3. Add a Thread to your app</p>
      {renderCodeSnippet(threadCode)}
      <p>4. Try it out</p>
      <p>
        Load the page with the Thread on it, send some messages, invite your coworkers to try it out
        too.
      </p>
      <p>5. Turn on secure mode</p>
      <p>
        Before going live, enable secure mode which requires generating a per user token for each
        request.
      </p>
    </div>
  );
}
