import * as CollabKit from '@collabkit/react';
import { mentionableUsers } from './data';
import './App.css';
import { useCallback, useEffect, useState } from 'react';
import { User } from './types';
import jwtDecode from 'jwt-decode';

export default function App() {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const _user = JSON.parse(localStorage.getItem('demoUser') || 'null') as User;
      return _user;
    } catch {
      console.error('Failed to parse demoUser');
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

  const image = (
    <img
      style={{ width: '100vw', maxHeight: '100vh', objectFit: 'cover' }}
      src="https://images.unsplash.com/photo-1433838552652-f9a46b332c40"
    />
  );

  if (!user) {
    return image;
  }

  if (!user.userId) {
    return image;
  }

  return (
    <CollabKit.Provider
      colorScheme="light"
      apiKey={'oLsHFwp3uFYjgar37ygGc'}
      appId={'-N67qY-qlZoWmkQBPyZU'}
      workspace={{ id: 'foobar' }}
      callbacks={{
        onCommentSend: (data) => {
          console.log(data);
        },
      }}
      user={{ ...user, id: user.userId }}
      theme={{
        radii: { 0: '0.5rem' },
        fontSize: { 0: '12px', 2: '14px', 3: '20px' },
        fontWeights: { 2: 500, 3: 700 },
        colors: {
          sendButtonColor: 'rgb(94, 81, 248)',
          backgroundColor: 'rgb(249,249,250)',
          composerBackground: 'white',
        },
      }}
      mentionableUsers={mentionableUsers}
    >
      <Home />
    </CollabKit.Provider>
  );
}

function Home() {
  const threadId = 'your-thread-id';

  const unreadCount = CollabKit.useUnreadCount({ threadId });
  const unread = unreadCount > 0 ? ` (${unreadCount})` : '';
  useDocumentTitle(`CollabKit Demo${unread}`);

  return (
    <div style={{ position: 'fixed', inset: 0 }}>
      <CollabKit.Thread
        info={{ name: 'Demo thread' }}
        showHeader={true}
        composerPrompt="Write a comment"
        style={{ borderRadius: 0, height: 'calc(100% - 44px)' }}
        threadId={threadId}
      />
    </div>
  );
}

function showGoogleLogin(callback: (user: User) => void) {
  console.log('showGoogleLogin');
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
    id: sub,
    name,
    email,
    avatar: picture,
  };
}

function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
