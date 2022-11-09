import { vars } from '../../styles/Theme.css';
import { AdvancedProps } from '../advanced/AdvancedCommon';
import { renderCodeSnippet } from '../CodeEditor';
import { ThreadDemo } from '../demos/ThreadDemo';
import { DocHeroDemoContainer, DocLink } from '../Doc';

export function ThreadDoc() {
  return (
    <>
      <h2>A flexible comment thread that can be rendered anywhere in your app.</h2>
      <DocHeroDemoContainer>
        <ThreadDemo />
      </DocHeroDemoContainer>
      <div>
        <h3>Usage</h3>
        <p>
          Render a comment thread in your app with <code className="ReactNode">{'<Thread />'}</code>
          . Pass a unique <code>threadId</code> to identify the thread.
        </p>
        {renderCodeSnippet(`import { Thread } from '@collabkit/react';

export function App() {
  return <Thread threadId={'my-thread-id'} />;
}`)}
        <br />
        <h3>Sizing</h3>
        <p>
          Threads fill the container they are rendered in. <br />
          <br />
          So if you would like to give it a fixed size wrap your{' '}
          <code className="ReactNode">{'<Thread />'}</code> in a{' '}
          <code className="ReactNode">{'<div />'}</code> or similar container with a fixed width and
          height to control its size.
        </p>
        {renderCodeSnippet(`<div style={{ width: '280px', height: '320px' }}>
  <Thread threadId={'my-thread-id'} />
</div>`)}
      </div>

      <div>
        <h3>Props</h3>
        <AdvancedProps
          props={[['threadId', 'string', 'A unique ID that represents this thread.']]}
          optionalProps={[
            [
              'name',
              'string | undefined',
              'A name for the thread. Used in email notifications to refer to the thread.',
            ],
            [
              'url',
              'string | undefined',
              <>
                The URL of the page the Thread lives on. Used to help the user get back to the
                Thread from email notifications and the{' '}
                <DocLink to="/docs/components/inbox">Inbox</DocLink>.
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
      </div>
    </>
  );
}
