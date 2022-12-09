import { CollabKitProvider } from '@collabkit/react';

export default function App() {
  return (
    <CollabKitProvider
      appId={'your APP ID here'}
      apiKey={'your API Key here'}
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
