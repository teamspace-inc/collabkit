import { renderCodeSnippet } from '../../CodeEditor';
import NodeClientDeleteUserSnippet from './NodeClientDeleteUserSnippet?raw';

export function DeleteUserDoc() {
  return (
    <>
      <div>
        <h2>Delete User</h2>
        <p>Use this function to delete an existing user.</p>
      </div>
      {renderCodeSnippet(NodeClientDeleteUserSnippet)}
      <br />
    </>
  );
}
