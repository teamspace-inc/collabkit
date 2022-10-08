import { H2, H3 } from '../UIKit';
import { renderCodeSnippet } from './CodeEditor';
import { DocDemoContainer } from './Doc';

export function WorkspacesDoc() {
  return (
    <>
      <H2>A way to group comment threads by team or company.</H2>
      {/* <div>
        <DocDemoContainer>illustration showing the concept of workspaces</DocDemoContainer>
      </div> */}
      <div>
        <p>
          Workspaces group comment threads by team/company name. e.g. if some of our users belong to
          the company ACME.
        </p>
        <p>
          When you provide user information to CollabKit, you should also provide their associated
          Workspace.
        </p>
        <br />
        <div>
          <h3>Usage</h3>
          {renderCodeSnippet(`import { CollabKitProvider } from '@collabkit/react';

export const App() {
  return <CollabKitProvider 
    appId={APP_ID} 
    apiKey={API_KEY} 
    workspace={{ 
      id: 'acme', 
      name: 'ACME Corporation' 
    }} 
    user={{ 
      id: 'jane', 
      name: 'Jane Doe', 
      email: 'jane@acme.com' 
  }}>
    {'your app code here'}
  </CollabKitProvider>
}`)}
        </div>
        {/* <p>
          Note: if you do not have the concept of Workspaces, Teams or Companies in your product,
          and instead want to provide commenting, you should follow our Workspace-Less guide.
        </p> */}
      </div>
      {/* <div>
        <H3>Notifications</H3>
        <p>
          Users in the same Workspace will be notified about new comment threads created in that
          Workspace.
        </p>
      </div>
      <H3>Usage</H3>
      <p></p> */}
    </>
  );
}
