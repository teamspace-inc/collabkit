import { CodeEditor } from './CodeEditor';
import { Doc } from './Doc';
// import GettingStarted from './markdown/GettingStarted.mdx';

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

function renderCode(code: string) {
  return (
    <CodeEditor
      readOnly={true}
      code={providerCode}
      language={'typescript'}
      style={{ borderRadius: '6px', width: 'calc(100% - 40px)' }}
      scrollbar={false}
    />
  );
}

export function GettingStartedDoc() {
  return (
    <Doc title="Getting Started">
      <p style={{ fontSize: 20, lineHeight: '28px' }}>
        A quick tutorial to get you up and <br />
        running with CollabKit.
      </p>
      <h3>Implementing a thread</h3>
      <p>Install @collabkit/react</p>
      {renderCode(installCode)}
      <p>Wrap your app in a `Provider`</p>
      {renderCode(providerCode)}
      <p>Add a Thread to your app</p>
      {renderCode(threadCode)}
    </Doc>
  );
}
