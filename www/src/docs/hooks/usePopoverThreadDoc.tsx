import { renderCodeSnippet } from '../CodeEditor';
import { Markdown } from '../Markdown';

export function UsePopoverThreadDoc() {
  return (
    <>
      <h2>Control a Popover Thread.</h2>
      <div>
        <h3>Usage</h3>
        <p>
          <code>usePopoverThread</code> lets you open, close or show the preview by calling the{' '}
          <code>setPopoverState</code> function it returns.
        </p>
        <p>
          Must be called within a <code>CollabKit.Provider</code>
        </p>

        {renderCodeSnippet(`import { usePopoverThread, PopoverTrigger } from '@collabkit/react';

export function App() {
  const { context, setPopoverState } = usePopoverThread({ threadId: 'unique-thread-id' });

  return <div>
    <button onClick={() => setPopoverState('open')}>Open Sesame</button>
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

      <Markdown
        body={`### Returns

#### setPopoverState: (state: 'open' | 'close' | 'preview') => void

Sets the popover state.

#### context: PopoverContext

The Popover Context. Pass this to \`PopoverTrigger\` to anchor the Popover Thread to a component.`}
      />
    </>
  );
}
