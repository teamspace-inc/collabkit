import { renderCodeSnippet } from '../CodeEditor';
import { Markdown } from '../Markdown';

export function UsePopoverThreadDoc() {
  return (
    <>
      <h2>Open or close a Popover Thread.</h2>
      <div>
        <h3>Usage</h3>
        <p>
          <code>usePopoverThread</code> lets you control a popover thread. It returns{' '}
          <code>setPopoverState</code> which can be used to <code>open</code> or <code>close</code>{' '}
          a thread or show its <code>preview</code>.
        </p>
        <p>
          Must be called within a <code>CollabKit.Provider</code>
        </p>
        {renderCodeSnippet(`import { usePopoverThread, PopoverTrigger } from '@collabkit/react';

export function App() {
  const { context, setPopoverState } = usePopoverThread({ threadId: 'unique-thread-id' });

  return <div>
    <PopoverTrigger context={context}>
      Hello world
    </PopoverTrigger>
  </div>
}

// count is 1`)}
      </div>

      <Markdown
        body={`### Props

#### threadId: string

The thread ID of the Popover Thread.`}
      />
    </>
  );
}
