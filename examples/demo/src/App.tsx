import * as CollabKit from '@collabkit/react';
import { mentionableUsers } from './data';
import './App.css';
import { UserMenu } from './UserMenu';
import { useCallback, useEffect, useState } from 'react';
import { User } from './types';

import jwtDecode from 'jwt-decode';

function TellaDemo() {
  return (
    <>
      <div
        style={{
          position: 'fixed',
          right: 0,
          top: 0,
          width: 284,
          margin: '0 0 0 0',
          bottom: 0,
          paddingBottom: 4,
          background: 'rgb(249,249,250)',
        }}
      >
        <CollabKit.Thread
          showHeader={true}
          composerPrompt="Add comment..."
          style={{ borderRadius: 0 }}
          threadId="demo-chat4"
        />
      </div>
    </>
  );
}

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

  const image = (
    <img
      style={{ width: '100vw', maxHeight: '100vh', objectFit: 'cover' }}
      src="https://images.unsplash.com/photo-1433838552652-f9a46b332c40"
    />
  );

  if (!user) {
    return image;
  }

  return (
    <CollabKit.Provider
      colorScheme="light"
      apiKey={import.meta.env.VITE_COLLABKIT_TOKEN}
      appId={import.meta.env.VITE_COLLABKIT_APP_ID}
      workspace={{ id: 'acme', name: 'ACME' }}
      user={user}
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
      {/* <CollabKit.Commentable>{image}</CollabKit.Commentable> */}
      <TellaDemo />
      <iframe
        style={{
          padding: '0 16px',
          width: 'calc(100vw - 284px - 32px)',
          height: '100vh',
          border: 'none',
        }}
        src="https://www.tella.tv/video/ckwyx03y6000509i62z4k2qfu/view"
      />

      <UserMenu user={user} onChangeUser={onChangeUser} />
      {/* <CollabKit.FloatingButton /> */}
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
