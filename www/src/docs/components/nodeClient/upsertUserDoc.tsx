import { renderCodeSnippet } from '../../CodeEditor';
import NodeClientUpsertUserSnippet from './NodeClientUpsertUserSnippet?raw';

export function UpsertUserDoc() {
  return (
    <>
      <div>
        <h2>Create / Update User</h2>
        <p>
          Use this function to create a new user or update an existing one.
        </p>
      </div>
          {renderCodeSnippet(NodeClientUpsertUserSnippet)}
      <br />
    </>
  );
}
