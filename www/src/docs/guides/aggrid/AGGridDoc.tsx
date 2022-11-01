import { docStep } from '../../../styles/Docs.css';
import { DataGridDemo } from '../../../components/SimpleDataGridDemo';
import { renderCodeSnippet } from '../../CodeEditor';
import { DocDemoContainer, DocLink } from '../../Doc';
import SetupAgGrid from './SetupAgGrid.tsx?raw';
import Usage from './AGGridUsage.tsx?raw';
import UsageWithIndicator from './ThreadIndicator.tsx?raw';

export function AGGridDoc() {
  return (
    <>
      <div>
        <h2>Add commenting to AG Grid</h2>
        <p>
          Use CollabKit to add commenting to AG Data Grid by implementing a custom{' '}
          <code>CellRenderer</code> for your AG Grid cells.
        </p>
        <h3>Demo</h3>
        <DocDemoContainer>
          <DataGridDemo />
        </DocDemoContainer>
      </div>

      <div>
        <h3 className={docStep}>Setup an AgGrid</h3>
        <p>
          Render an AgGrid with a placeholder custom <code>CellRenderer</code>. We'll replace this
          in the next step with a <code>CellRenderer</code> that enables commenting.
        </p>
        {renderCodeSnippet(SetupAgGrid)}
      </div>

      <div>
        <h3 className={docStep}>Implement a custom CellRenderer</h3>
        <p>
          Replace the CellRenderer from the last step with one which uses{' '}
          <code>usePopoverThread</code> and <code>PopoverTrigger</code> to set up CollabKit
          correctly.
          <br />
          <h4>How it works</h4>
          Wrap your cell with <code>{'<PopoverTrigger>'}</code> to enable the popover thread. This
          handles showing a preview of the first comment on hover (if present).
          <br />
          <br />
          To show the thread on click we add an <code>onClick</code> handler to the{' '}
          <code>{'<div>'}</code> inside
        </p>
        {renderCodeSnippet(Usage)}
      </div>

      <div>
        <h3 className={docStep}>Add a thread indicator</h3>
        <p>An indicator to show if there is a comment thread for the given cell. </p>
        {renderCodeSnippet(UsageWithIndicator)}
        <p>
          In our custom <code>CellRenderer</code> fetch <code>hasThread</code> from{' '}
          <code>usePopoverThread</code>.
        </p>
        {renderCodeSnippet(`const { hasThread, popoverState, setPopoverState, context } = usePopoverThread({
    name: props.colDef!.headerName,
    cellId,
    _viewId: 'table-demo',
});`)}
        <p>
          Then also inside <code>CellRenderer</code>. Conditionally render{' '}
          <code>{'<ThreadIndicator />'}</code>
        </p>
        {renderCodeSnippet(`{hasThread && <ThreadIndicator />}`)}
      </div>

      <div>
        <h3 className={docStep}>Done</h3>
        <p>
          Next, add an <DocLink href="/docs/components/inbox">Inbox</DocLink> to your app so users
          can see all comment threads they are participating in, in one place.
        </p>
      </div>
    </>
  );
}
