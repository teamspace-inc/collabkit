import { renderCodeSnippet } from './CodeEditor';
import { DocLink } from './Doc';

// How PropelAuth explains Organisations, I found this helpful.

// Organizations / Shared Accounts¶
// Organizations are groups of your users that will use your product together. These are also referred to as companies, tenants, teams, workspaces, or shared accounts. Let's say you are building a product that helps people create and share documents internally. Your customers might include:

// A two-person startup
// A fast-growing 50-person tech company
// A hobbyist using you by themselves, but who might get more employees someday
// A large enterprise
// Each of these would be an organization within your product, managed by PropelAuth.

export function WorkspacesDoc() {
  return (
    <>
      <div>
        <h2>Workspaces are groups of your users that will use your product together.</h2>
        <p>
          These are also referred to as companies, organisations or teams in other products. <br />
          <br />
          If you're building an app for financial teams to collaborate on company accounts you might
          want to create a Workspace for the company, say 'ACME Inc.' or the team 'ACME Finance
          Team'.
          <br />
          <br />
          By default, users in a Workspace will have visiblity into all other comment threads
          created in a Workspace.
        </p>
        <h3>Usage</h3>
        <p>
          By default, you can set a users workspace by passing their workspace details to{' '}
          <code className="ReactNode">CollabKitProvider</code>.
        </p>
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
        <p>
          When <DocLink href="/docs/securemode">Secure Mode</DocLink> is enabled, you need to pass
          the user's workspace details to the <code>generateToken</code> call.
        </p>
      </div>
      {/* <p>
          Note: if you do not have the concept of Workspaces, Teams or Companies in your product,
          and instead want to provide commenting, you should follow our Workspace-Less guide.
        </p> */}

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
