import { CollabKitProvider, CustomTheme, Thread, useUnreadCount } from '@collabkit/react';
import * as themes from '@collabkit/custom-themes';
import { mentionableUsers } from './data';
import { useCallback, useEffect, useState } from 'react';
import { User } from './types';
import jwtDecode from 'jwt-decode';
import { GridExample } from './GridExample';

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
  const theme: CustomTheme | undefined =
    name in themes ? themes[name as keyof typeof themes] : undefined;

  if (!user) {
    return image;
  }

  return (
    <CollabKitProvider
      colorScheme="light"
      apiKey={'oLsHFwp3uFYjgar37ygGc'}
      appId={'-N67qY-qlZoWmkQBPyZU'}
      workspace={{ id: 'foobar', name: 'Foo' }}
      callbacks={{
        onCommentSend: (data) => {
          // console.log(data);
        },
        onTimestampClick: (data) => {
          console.log('timestamp, click', data);
        },
        onMentionClick: (data) => {
          console.log('mention, click', data);
        },
      }}
      onAuthenticationRequired={() => {
        console.log('authRequired');
      }}
      user={user}
      theme={theme}
      mentionableUsers={'allWorkspace'}
    >
      {name === 'cashboard' ? <GridExample /> : <Home />}
    </CollabKitProvider>
  );
}

function Home() {
  const threadId = 'new-your-thread-id';

  const unreadCount = useUnreadCount({ threadId });
  const unread = unreadCount > 0 ? ` (${unreadCount})` : '';
  useDocumentTitle(`CollabKit Demo${unread}`);

  return (
    <div style={{ position: 'fixed', inset: 0 }}>
      <Thread
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
