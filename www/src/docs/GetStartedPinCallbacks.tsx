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
      onPinAttach={() => {
        return JSON.stringify({
          /* your apps state here, e.g. url, tab selected, etc. */
        });
      }}
      onPinClick={(pin) => {
        const appState = pin.meta ? JSON.parse(pin.meta) : null;
        /* apply appState here */
        /* e.g. navigate to a specific url, select a tab, etc. */
      }}
    >
      {/* your app code here */}
    </CollabKitProvider>
  );
}
