import * as CollabKit from '@collabkit/react';
import { users, mentionableUsers } from './data';
import './App.css';
import { Chat } from './Chat';
import { UserMenu } from './UserMenu';
import { useState } from 'react';
import { User } from './types';

function App() {
  const [user, setUser] = useState<User>(users.JANET);
  return (
    <CollabKit.Provider
      apiKey={import.meta.env.VITE_COLLABKIT_TOKEN}
      appId={import.meta.env.VITE_COLLABKIT_APP_ID}
      workspace={{ id: 'acme', name: 'ACME' }}
      user={user}
      mentionableUsers={mentionableUsers}
    >
      <CollabKit.Commentable>
        <img
          style={{ width: '100vw', maxHeight: '100vh', objectFit: 'cover' }}
          src="https://images.unsplash.com/photo-1433838552652-f9a46b332c40"
        />
      </CollabKit.Commentable>
      <Chat />
      <UserMenu user={user} onChangeUser={setUser} />
      <CollabKit.FloatingButton />
    </CollabKit.Provider>
  );
}

export default App;
