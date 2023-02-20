import { renderCodeSnippet } from '../../CodeEditor';
import NodeClientUpsertWorkspaceSnippet from './NodeClientUpsertWorkspaceSnippet?raw';

export function UpsertWorkspaceDoc() {
  return (
    <>
      <div>
        <h2>Create / Update Workspace</h2>
        <p>
          Use this function to create a new workspace or update an existing one.
        </p>
      </div>
          {renderCodeSnippet(NodeClientUpsertWorkspaceSnippet)}
      <br />
    </>
  );
}
