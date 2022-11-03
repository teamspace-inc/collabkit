import { docDemoContainer } from '../../styles/Docs.css';
import { AdvancedProps } from '../advanced/AdvancedCommon';
import { renderCodeSnippet } from '../CodeEditor';
import { ThreadDemo } from '../demos/ThreadDemo';
import { DocLink } from '../Doc';

export function ThreadDoc() {
  return (
    <>
      <h2>A comment thread that can be rendered anywhere in your app</h2>
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
        <br />
        <h4>Sizing</h4>
        <p>
          Threads fill the container they are rendered in. Wrap your <code>{'<Thread />'}</code> in
          a container like a <code>{'<div />'}</code> to control its size.
        </p>
        {renderCodeSnippet(`<div style={{ width: '280px', height: '320px' }}>
  <Thread threadId={'my-thread-id'} />
</div>`)}
        <p>
          You can also let it fill the space in the element it's given, an explicit size is
          optional.
        </p>
      </div>

      <div>
        <h3>Props</h3>
        <AdvancedProps
          rows={[
            ['threadId', 'string', 'A unique ID that represents this thread.'],
            [
              'name',
              'string | undefined',
              'A name for the thread. Used in email notifications to refer to the thread.',
            ],
            [
              'url',
              'string | undefined',
              <>
                The URL of the page where the thread is rendered. Used in email notifications and
                the Inbox to <DocLink href="/docs/inbox">link</DocLink> to the thread.
              </>,
            ],
            [
              'showHeader',
              'boolean | undefined',
              <>
                Defaults to <code>false</code>. <br />
                Set this to <code>true</code> to show the header.
              </>,
            ],
            [
              'autoFocus',
              'boolean | undefined',
              <>
                Defaults to <code>true</code>. <br />
                Set this to <code>false</code> to prevent focusing the composer on mount.
              </>,
            ],
            [
              'hideComposer',
              'boolean | undefined',
              <>
                Defaults to <code>false</code>. <br />
                Set this to <code>true</code> to hide the composer.
              </>,
            ],
          ]}
        />
        {/* <Markdown body={ThreadMarkdown} /> */}
      </div>
    </>
  );
}
