import { docDemoContainer } from '../../styles/Docs.css';
import { renderCodeSnippet } from '../CodeEditor';
import { ThreadDemo } from '../demos/ThreadDemo';
import { Markdown } from '../Markdown';
import ThreadMarkdown from '../markdown/Thread.md?raw';

export function ThreadDoc() {
  return (
    <>
      <h2>A comment thread that can be rendered anywhere in your app.</h2>
      <ThreadDemo className={docDemoContainer} />
      <div>
        <h3>Usage</h3>
        <p>
          Render a comment thread in your app with <code>{'<Thread />'}</code>. Pass a unique{' '}
          <code>threadId</code> to identify the thread.
        </p>
        {renderCodeSnippet(`import { Thread } from '@collabkit/react';

export function App() {
  return <Thread threadId={'my-thread-id'} />;
}`)}
        <h4>Sizing</h4>
        <p>
          Threads fill the container they are given. Wrap your <code>{'<Thread />'}</code> in a{' '}
          <code>{'<div />'}</code> to control its size.
        </p>
        {renderCodeSnippet(`<div style={{ width: '280px', height: '320px' }}>
  <Thread threadId={'my-thread-id'} />
</div>`)}
      </div>

      <div>
        <h3>Props</h3>
        <Markdown body={ThreadMarkdown} />
      </div>
    </>
  );
}
