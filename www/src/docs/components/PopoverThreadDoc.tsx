import { AdvancedProps } from '../advanced/AdvancedCommon';
import { renderCodeSnippet } from '../CodeEditor';
import { DocLink } from '../Doc';
import { PopoverThreadDemo } from './PopoverThreadDemo';

export function PopoverThreadDoc() {
  return (
    <>
      <h2>A comment thread that anchors to a component in your app</h2>
      <PopoverThreadDemo />
      <div>
        <h3>Usage</h3>
        {renderCodeSnippet(`import { PopoverTrigger, usePopoverThread } from '@collabkit/react'

function YourComponent(props: { onClick: () => void}) {
  return <div 
    onClick={props.onClick} 
    style={
      { 
        padding: 20, 
        background: 'white',
        cursor: 'pointer'
      }
    }>
    Component
  </div>
}

export function App() {
  const { setPopoverState, context } = usePopoverThread({
    threadId: 'unique-thread-id-here'
    name: 'Name of the thread';
  });

  return <div>
    <PopoverTrigger context={context}>
      <YourComponent onClick={() => setPopoverState('open')} />
    </PopoverTrigger>
  </div>
}`)}
        <p>
          Wrap the component you wish to anchor the PopoverThread to with a PopoverTrigger. And
          configure its <code>context</code> using <code>usePopoverThread</code>.{' '}
        </p>
      </div>
      <div>
        <h2>usePopoverThread</h2>
        <br />
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

        <h2>PopoverTrigger</h2>
        <br />
        <h3>Props</h3>
        <h4>Context: {`ReturnType<typeof usePopoverThread>['context']`}</h4>
        <p>
          Context from <code>usePopoverThread</code> to pass to <code>PopoverTrigger</code>
        </p>
      </div>
    </>
  );
}
