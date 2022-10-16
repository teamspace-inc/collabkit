import { renderCodeSnippet } from '../CodeEditor';

export function UseSidebarDoc() {
  return (
    <>
      <h2>.</h2>
      <div>
        <h3>Usage</h3>
        <p>
          Must be called within a <code>CollabKit.Provider</code>
        </p>
        {renderCodeSnippet(`import { useSidebar } from '@collabkit/react';

const { sidepaneState, setSidepaneState } = useSidepane();

setSidepaneState('open');
setSidepaneState('closed');

`)}
      </div>
    </>
  );
}
