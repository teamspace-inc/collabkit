import { CollabKitPlayground } from '@collabkit/react';
import { useEffect } from 'react';

import './App.css';

function handleCredentialResponse(response: google.accounts.id.CredentialResponse) {
  console.log('handleCredentialResponse', response);
}

function App() {
  useEffect(() => {
    const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!GOOGLE_CLIENT_ID) console.error('VITE_GOOGLE_CLIENT_ID is not set');
    google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    });
    google.accounts.id.prompt();
  });
  return <CollabKitPlayground />;
}

export default App;
