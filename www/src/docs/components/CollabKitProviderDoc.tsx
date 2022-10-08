import { vars } from 'www/src/styles/Theme.css';
import { renderCodeSnippet } from '../CodeEditor';
import { DocLink } from '../Doc';

export function CollabKitProviderDoc() {
  return (
    <>
      <h2>Wrap your app in a CollabKitProvider to use our components.</h2>
      <blockquote>
        <h4 style={{ marginTop: 0 }}>Secure Mode</h4>
        By default CollabKitProvider requires you to pass in your <code>apiKey</code> and{' '}
        <code>appId</code> as props. For Production environments we recommend turning on{' '}
        <DocLink href="/docs/secureMode">Secure Mode</DocLink>.
      </blockquote>

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
    </>
  );
}
