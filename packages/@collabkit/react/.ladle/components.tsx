import React from 'react';
import type { GlobalProvider } from '@ladle/react';
import { CollabKitProvider } from '../src';

import '../src/index.css';

export const Provider: GlobalProvider = ({ children, globalState }) => (
  <CollabKitProvider
    apiKey={import.meta.env.VITE_COLLABKIT_TOKEN}
    appId={import.meta.env.VITE_COLLABKIT_APP_ID}
    workspace={{ id: 'acme', name: 'ACME' }}
    user={{
      name: 'Alice',
      id: 'alice',
    }}
    mentionableUsers={[]}
    colorScheme={globalState.theme}
  >
    {children}
  </CollabKitProvider>
);
