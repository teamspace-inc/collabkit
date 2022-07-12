import { CollabKit } from '@collabkit/react';
import { users, mentionableUsers, workspaceId } from './data';
import './App.css';
import { Chat } from './Chat';
import { UserMenu } from './UserMenu';
import { useState } from 'react';
import { User } from './types';

function App() {
  const [user, setUser] = useState<User>(users.FRANK);
  return (
    <CollabKit.App
      token={import.meta.env.VITE_COLLABKIT_TOKEN}
      appId={import.meta.env.VITE_COLLABKIT_APP_ID}
      identity={user}
      mentions={mentionableUsers}
    >
      <CollabKit.Workspace workspaceId={workspaceId}>
        <CollabKit.Commentable>
          <img
            style={{ width: '100vw', maxHeight: '100vh', objectFit: 'cover' }}
            src="https://images.unsplash.com/photo-1433838552652-f9a46b332c40"
          />
        </CollabKit.Commentable>
        <Chat />
        <UserMenu user={user} onChangeUser={setUser} />
        <CollabKit.FloatingButton />
      </CollabKit.Workspace>
    </CollabKit.App>
  );
}

export default App;
