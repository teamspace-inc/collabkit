import { CollabKitProvider } from '@collabkit/react';

export function App() {
  return (
    <CollabKitProvider
      appId={'your app ID here'}
      apiKey={'your API key here'}
      user={{
        id: 'jane',
        name: 'Jane Doe',
        email: 'jane@example.com',
      }}
      workspace={{
        id: 'acme',
        name: 'ACME Corporation',
      }}
      mentionableUsers={[]}
    >
      {/* your app code here */}
    </CollabKitProvider>
  );
}
