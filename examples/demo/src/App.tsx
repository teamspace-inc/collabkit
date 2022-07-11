import { CollabKit } from '@collabkit/react';
import { users, mentions, workspaceId } from './data';
import './App.css';
import { Chat } from './Chat';

function App() {
  return (
    <CollabKit.App
      token={import.meta.env.VITE_COLLABKIT_TOKEN}
      appId={import.meta.env.VITE_COLLABKIT_APP_ID}
      identity={users.ALICE}
      mentions={mentions}
    >
      <CollabKit.Workspace workspaceId={workspaceId}>
        <Chat />
        <CollabKit.Commentable>
          <img
            style={{ width: '100vw', maxHeight: '100vh', objectFit: 'cover' }}
            src="https://images.unsplash.com/photo-1433838552652-f9a46b332c40"
          />
        </CollabKit.Commentable>
        <CollabKit.FloatingButton />
      </CollabKit.Workspace>
    </CollabKit.App>
  );
}

export default App;
