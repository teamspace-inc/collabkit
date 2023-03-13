import { CollabKitProvider } from '@collabkit/react';

export default function App() {
  return (
    <CollabKitProvider
      appId={'your APP ID here'}
      token={'per user token generated on the server here'}
      mentionableUsers={'allWorkspace'}
      renderAvatar={({ profile, size }) => {
        return <div>your custom avatar component here</div>;
      }}
    >
      {/* your app */}
    </CollabKitProvider>
  );
}
