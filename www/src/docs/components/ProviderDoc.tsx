import { H2, H3 } from '../../UIKit';
import { renderCodeSnippet } from '../CodeEditor';

export function ProviderDoc() {
  return (
    <div>
      <H2>Handles authentication with CollabKit's servers, data sync and caching on the client.</H2>
      <H3>Security</H3>
      <p>
        CollabKit supports two modes of operation, unsecured mode which is great for getting
        started, trying it out, and shipping to trusted environments like dev or staging. <br />
        <br />
        When you're ready to ship to production, make sure you turn on <b>Secured Mode</b> which
        requires fetching a per user token and passing it to <code>CollabKitProvider</code> on the
        client.
      </p>

      <H3>Usage in Unsecured Mode</H3>
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

      <H3>Usage in Secured Mode</H3>
      {renderCodeSnippet(`import { CollabKitProvider } from '@collabkit/react';

export const App() {
  return <CollabKitProvider appId={APP_ID} token={}>
    {'your app code here'}
  </CollabKitProvider>
}`)}
    </div>
  );
}
