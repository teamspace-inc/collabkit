import { H2, H3 } from '../../UIKit';
import { renderCodeSnippet } from '../CodeEditor';
import { Markdown } from '../Markdown';

export function UsePopoverThreadDoc() {
  return (
    <>
      <H2>Open or close a Popover Thread.</H2>
      <div>
        <H3>Usage</H3>
        <p>
          <code>usePopoverThread</code> lets you
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
