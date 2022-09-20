import React from 'react';
import type { GlobalProvider } from '@ladle/react';
import { CollabKitProvider } from '../src';

import '../src/index.css';

const apiKey = import.meta.env.VITE_COLLABKIT_API_KEY;
const appId = import.meta.env.VITE_COLLABKIT_APP_ID;
const workspace = {
  id: import.meta.env.VITE_COLLABKIT_WORKSPACE_ID,
  name: import.meta.env.VITE_COLLABKIT_WORKSPACE_NAME,
};

export const Provider: GlobalProvider = ({ children, globalState }) => {
  return (
    <CollabKitProvider
      apiKey={apiKey}
      appId={appId}
      workspace={workspace}
      user={{
        name: 'Alice',
        id: 'alice',
      }}
      mentionableUsers="allWorkspace"
      colorScheme={globalState.theme}
    >
      {children}
    </CollabKitProvider>
  );
};
