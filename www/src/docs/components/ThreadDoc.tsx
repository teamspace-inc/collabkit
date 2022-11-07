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
          Render a comment thread in your app with <code>{'<Thread />'}</code>. Threads require a
          unique <code>objectId</code> to identify them. This refers to the ID of an object in your
          system that the thread is linked to. E.g. for a task management app this would be a task
          ID or for a CRM a customer ID. <br />
          <br />
          Object IDs should be stable (do not change over time for the same object) and unique (only
          one in your system).
        </p>
        {renderCodeSnippet(`import { Thread } from '@collabkit/react';

export function App() {
  return <Thread objectId={'my-thread-id'} />;
}`)}
        <br />
        <h3>Sizing</h3>
        <p>
          Threads fill the container they are rendered in. <br />
          <br />
          So if you would like to give it a fixed size wrap your <code>{'<Thread />'}</code> in a{' '}
          <code>{'<div />'}</code> or similar container with a fixed width and height to control its
          size.
        </p>
        {renderCodeSnippet(`<div style={{ width: '280px', height: '320px' }}>
  <Thread objectId={'my-thread-id'} />
</div>`)}
      </div>

      <div>
        <h3>Props</h3>
        <AdvancedProps
          props={[
            [
              'objectId',
              'string',
              'A unique ID that links this thread to an object in your system.',
            ],
          ]}
          optionalProps={[
            [
              'objectName',
              'string | undefined',
              <>
                The name of the linked object in your system. <br />
                <br />
                Used in email notifications to refer to the thread. Ex. in a task management app
                this might be "Ship Website" or in a CRM a customer called "ACME Inc".
              </>,
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
                <br />
                Set this to <code>true</code> to show the header.
              </>,
            ],
            [
              'autoFocus',
              'boolean | undefined',
              <>
                Defaults to <code>true</code>. <br />
                <br />
                Set this to <code>false</code> to prevent focusing the composer on mount.
              </>,
            ],
            [
              'hideComposer',
              'boolean | undefined',
              <>
                Defaults to <code>false</code>. <br />
                <br />
                Set this to <code>true</code> to hide the composer.
              </>,
            ],
          ]}
        />
      </div>
    </>
  );
}
