import { renderCodeSnippet } from '../CodeEditor';

// this should show and hide the inbox side pane
// maybe a better name is SidepaneButton

export function UseSidepane() {
  return (
    <>
      <h2>.</h2>
      <div>
        <h3>Usage</h3>
        <p>
          Must be called within a <code>CollabKit.Provider</code>
        </p>
        {renderCodeSnippet(`import { useSidepane } from '@collabkit/react';

const { sidepaneState, setSidepaneState } = useSidepane();

setSidepaneState('open');
setSidepaneState('closed');

`)}
      </div>
    </>
  );
}
