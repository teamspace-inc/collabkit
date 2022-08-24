import * as CollabKit from '@collabkit/react';
import { mentionableUsers } from './data';
import { useCallback, useEffect, useState } from 'react';
import { User } from './types';
import jwtDecode from 'jwt-decode';

const tella: CollabKit.CustomTheme = {
  radii: { 0: '0.5rem' },
  fontSize: { 0: '12px', 2: '14px', 3: '20px' },
  fontWeights: { 2: 500, 3: 700 },
  colors: {
    sendButtonColor: 'rgb(94, 81, 248)',
    backgroundColor: 'rgb(249,249,250)',
    composerBackground: 'white',
  },
  offsets: {
    composerSendButtonTop: '13px',
  },
};

const dart: CollabKit.CustomTheme = {
  radii: { 0: '4px' },
  fontSize: { 0: '12px', 1: '14px', 2: '14px', 3: '20px' },
  lineHeights: { 0: '20px', 1: '20px' },
  fontWeights: { 2: 500, 3: 700 },
  borders: {
    composer: '1px solid #404045',
  },
  colors: {
    sendButtonColor: '#414286',
    backgroundColor: '#1e1e21',
    composerBackground: '#1e1e21',
    composerPlaceholder: '#515159',
    primaryText: 'rgb(212,212,216)',
    caretColor: 'rgb(212,212,216)',
    commentHoverBackgroundColor: 'rgba(0,0,0,0.1)',
    commentUnseenBackgroundColor: '#3F3F45',
    commentUnseenHoverBackgroundColor: 'rgba(255,255,255,0.1)',
    indicatorLineColor: 'rgba(0,0,0,0.1)',
  },
  offsets: {
    composerSendButtonTop: '14px',
  },
};

const themes = {
  default: {},
  tella,
  dart,
} as const;

const USER_STORAGE_KEY = 'demoUserV2';

export default function App() {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const _user = JSON.parse(localStorage.getItem(USER_STORAGE_KEY) || 'null') as User;
      if (!_user.id || typeof _user.id !== 'string') {
        return null;
      }
      return _user;
    } catch {
      console.error('Failed to parse demoUser');
      return null;
    }
  });

  const onChangeUser = useCallback((user: User | null) => {
    setUser(user);
    if (user != null) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
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

  const name = location.pathname.slice(1);
  const theme: CollabKit.CustomTheme =
    name in themes ? themes[name as keyof typeof themes] : themes.default;

  if (!user) {
    return image;
  }

  return (
    <CollabKit.Provider
      colorScheme="light"
      apiKey={'oLsHFwp3uFYjgar37ygGc'}
      appId={'-N67qY-qlZoWmkQBPyZU'}
      workspace={{ id: 'foobar', name: 'Foo' }}
      callbacks={{
        onCommentSend: (data) => {
          console.log(data);
        },
      }}
      onAuthenticationRequired={() => {
        console.log('authRequired');
      }}
      user={user}
      theme={theme}
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
        autoFocus={true}
        info={{ name: 'Demo thread' }}
        showHeader={false}
        composerPrompt="Write a comment"
        style={{ borderRadius: 0, height: '100%' }}
        threadId={threadId}
      />
    </div>
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
