import React from 'react';
import type { GlobalProvider } from '@ladle/react';
import * as CollabKit from '../src';

import '../src/index.css';

export const Provider: GlobalProvider = ({ children, globalState }) => (
  <CollabKit.Provider
    apiKey={import.meta.env.VITE_COLLABKIT_TOKEN}
    appId={import.meta.env.VITE_COLLABKIT_APP_ID}
    workspace={{ id: 'acme', name: 'ACME' }}
    user={{
      workspaceId: 'acme',
      name: 'Alice',
      userId: 'alice',
    }}
    mentionableUsers={[]}
    darkMode={globalState.theme === 'dark'}
  >
    {children}
  </CollabKit.Provider>
);
