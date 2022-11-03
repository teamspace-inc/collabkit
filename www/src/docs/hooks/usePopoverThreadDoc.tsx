import { AdvancedProps } from '../advanced/AdvancedCommon';
import { renderCodeSnippet } from '../CodeEditor';

export function UsePopoverThreadDoc() {
  return (
    <>
      <h2>Control a Popover Thread</h2>
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
}`)}
      </div>

      <div>
        <h3>API</h3>
        <h4>Props</h4>
        <AdvancedProps
          rows={[['threadId', 'string', 'A unique ID that represents this thread.']]}
        />
        <br />
        <h4>Returns</h4>
        <AdvancedProps
          rows={[
            [
              'setPopoverState',
              `(state: 'open' | 'close' | 'preview') => void`,
              'Sets the popover state.',
            ],
            ['context', 'PopoverThreadContext', ''],
          ]}
        />
      </div>
    </>
  );
}
