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
        <h3>Props</h3>
        <h4>threadId: string</h4>
        <p>A unique ID that represents this thread.</p>
        <h4>name?: string</h4>
        <p>
          A name for the thread. Used in email notifications to refer to the thread. e.g. if you set
          name to ‘Task 1’ and ‘John’ writes a comment, the email subject will be ‘John left a
          comment on Task 1’
        </p>
        <h4>url?: string</h4>
        <p>
          The URL of the webpage this thread is rendered on. Used in email notifications and the
          <DocLink href="/docs/inbox">Inbox</DocLink> to help a user get back to a thread. <br />
          Defaults to <code>window.location.href</code>
        </p>
        <h4>autoFocus?: boolean</h4>
        <p>
          Set this to automatically focus the composer input on render. <br />
          Defaults to <code>true</code>
        </p>
        <h4>hideComposer?: boolean</h4>
        <p>
          Hide the composer. <br />
          Defaults to <code>false</code>
        </p>
        <br />
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
