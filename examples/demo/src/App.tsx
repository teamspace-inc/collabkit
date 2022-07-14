import * as CollabKit from '@collabkit/react';
import { mentionableUsers } from './data';
import './App.css';
import { Chat } from './Chat';
import { UserMenu } from './UserMenu';
import { useCallback, useEffect, useState } from 'react';
import { User } from './types';

import jwtDecode from 'jwt-decode';

export default function App() {
  const [user, setUser] = useState<User | null>(() => {
    try {
      return JSON.parse(localStorage.getItem('demoUser') || 'null') as User;
    } catch {
      return null;
    }
  });

  const onChangeUser = useCallback((user: User | null) => {
    setUser(user);
    if (user != null) {
      localStorage.setItem('demoUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('demoUser');
      showGoogleLogin((user) => onChangeUser(user));
    }
  }, []);

  useEffect(() => {
    if (user == null) {
      showGoogleLogin((user) => onChangeUser(user));
    }
  }, []);

  if (!user) {
    return null;
  }

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
      <UserMenu user={user} onChangeUser={onChangeUser} />
      <CollabKit.FloatingButton />
    </CollabKit.Provider>
  );
}

function showGoogleLogin(callback: (user: User) => void) {
  google.accounts.id.initialize({
    client_id: '913144916238-5301s2hqmurtvub2ic17529uh3ccsgqt.apps.googleusercontent.com',
    callback: (response) => {
      callback(userFromGoogleToken(response.credential));
    },
  });
  google.accounts.id.prompt();
}

function userFromGoogleToken(token: string) {
  const { sub, name, picture, email } = jwtDecode(token) as any;
  return {
    userId: sub,
    name,
    email,
    avatar: picture,
  };
}
