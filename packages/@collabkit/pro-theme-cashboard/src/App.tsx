import React, { useEffect } from 'react';
import { CollabKitProvider, usePopoverThread } from '@collabkit/react';
import { PopoverThread } from './components/PopoverThread';
import { theme } from './';
import './index.css';

export const config = {
  apiKey: import.meta.env.VITE_COLLABKIT_API_KEY,
  appId: import.meta.env.VITE_COLLABKIT_APP_ID,
  workspace: {
    id: import.meta.env.VITE_COLLABKIT_WORKSPACE_ID,
    name: import.meta.env.VITE_COLLABKIT_WORKSPACE_NAME,
  },
  user: {
    name: 'Anonymous',
    id: 'pro-demo-user',
  },
  mentionableUsers: 'allWorkspace',
  theme,
} as const;

function PopoverExample() {
  const objectId = 'pro-theme-cashboard/App0';
  const { hasThread, showThread } = usePopoverThread({ objectId });

  useEffect(() => {
    if (hasThread) {
      showThread();
    }
  }, [hasThread]);

  return (
    <PopoverThread objectId={objectId}>
      <div
        className="border-2 border-prime-dark w-40 h-20 m-2 text-prime-dark rounded-lg flex items-center justify-center"
        onClick={showThread}
      >
        Popover
      </div>
    </PopoverThread>
  );
}

export default function App() {
  return (
    <CollabKitProvider {...config}>
      <PopoverExample />
    </CollabKitProvider>
  );
}
