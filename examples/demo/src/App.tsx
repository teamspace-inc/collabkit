import { CollabKit } from '@collabkit/react';
import { users, mentions, workspaceId } from './data';
import './App.css';
import { useState } from 'react';

function App() {
  return (
    <CollabKit.App
      token={import.meta.env.VITE_COLLABKIT_TOKEN}
      appId={import.meta.env.VITE_COLLABKIT_APP_ID}
      identity={users.ALICE}
      mentions={mentions}
    >
      <CollabKit.Workspace workspaceId={workspaceId}>
        <CollabKit.Commentable>
          <img
            style={{ width: '100vw' }}
            src="https://unsplash.com/photos/t7YycgAoVSw/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjU3Mjg3OTkz&force=true&w=2400"
          />
        </CollabKit.Commentable>
        <CollabKit.FloatingButton />
      </CollabKit.Workspace>
    </CollabKit.App>
  );
}

export default App;
