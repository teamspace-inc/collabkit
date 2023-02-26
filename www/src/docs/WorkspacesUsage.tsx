import { CollabKitProvider } from '@collabkit/react';

const APP_ID = 'your-app-id';
const API_KEY = 'your-api-key';

export function App() {
  return (
    <CollabKitProvider
      appId={APP_ID}
      apiKey={API_KEY}
      workspace={{
        id: 'acme',
        name: 'ACME Corporation',
      }}
      user={{
        id: 'jane',
        name: 'Jane Doe',
        email: 'jane@acme.com',
      }}
      mentionableUsers={'allWorkspace'}
    >
      {'your app code here'}
    </CollabKitProvider>
  );
}
