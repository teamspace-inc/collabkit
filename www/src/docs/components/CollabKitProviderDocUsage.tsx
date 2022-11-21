import { CollabKitProvider } from '@collabkit/react';

export function App() {
  return (
    <CollabKitProvider
      appId="APP_ID"
      apiKey="API_KEY"
      theme="light"
      workspace={{
        id: 'acme',
        name: 'ACME Corporation',
      }}
      user={{
        id: 'jane',
        name: 'Jane Doe',
        email: 'jane@example.com',
      }}
      mentionableUsers="allWorkspace"
    >
      {/* your app code here */}
    </CollabKitProvider>
  );
}
