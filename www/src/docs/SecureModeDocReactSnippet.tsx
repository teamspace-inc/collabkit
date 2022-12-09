import { CollabKitProvider } from '@collabkit/react';

export default function App() {
  return (
    <CollabKitProvider
      appId={'your APP ID here'}
      token={'per user token generated on the server here'}
      mentionableUsers={'allWorkspace'}
    >
      {/* your app */}
    </CollabKitProvider>
  );
}
