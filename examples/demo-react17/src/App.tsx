import { useEffect } from 'react';
import { CollabKitProvider, CustomTheme, Thread, useUnreadCount } from '@collabkit/react';
import * as themes from '@collabkit/custom-themes';
import { User } from './types';
import jwtDecode from 'jwt-decode';
import { TableExample } from './TableExample';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { proxy, useSnapshot, subscribe } from 'valtio';
import { Route, Switch, useLocation } from 'wouter';

const store = proxy<{ user: User | null }>(
  JSON.parse(localStorage.getItem('store') ?? '{ "user": null }') || { user: null }
);

subscribe(store, () => {
  localStorage.setItem('store', JSON.stringify(store));
});

export default function App() {
  const { user } = useSnapshot(store);

  return (
    <div>
      {!user ? (
        <GoogleOAuthProvider clientId="927079647438-3ug3d9s4pocobg9qve8eb6bk0bifpfrg.apps.googleusercontent.com">
          <div
            style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100vh',
            }}
          >
            <h1>CollabKit Demo</h1>
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                if (credentialResponse.credential) {
                  store.user = userFromGoogleToken(credentialResponse.credential);
                }
              }}
              onError={() => {
                console.log('Login Failed');
              }}
              useOneTap
            />
          </div>
        </GoogleOAuthProvider>
      ) : (
        <Demo />
      )}
    </div>
  );
}

const apiKey = import.meta.env.VITE_COLLABKIT_API_KEY;
const appId = import.meta.env.VITE_COLLABKIT_APP_ID;
const workspace = {
  id: import.meta.env.VITE_COLLABKIT_WORKSPACE_ID,
  name: import.meta.env.VITE_COLLABKIT_WORKSPACE_NAME,
};

function Demo() {
  const { user } = useSnapshot(store);

  const [pathname] = useLocation();
  const name = pathname.slice(1);
  const theme: CustomTheme | undefined =
    name in themes ? themes[name as keyof typeof themes] : undefined;

  return (
    <CollabKitProvider
      colorScheme="light"
      apiKey={apiKey}
      appId={appId}
      workspace={workspace}
      callbacks={
        {
          // onCommentSend: (data) => {
          //   console.log(data);
          // },
          // onTimestampClick: (data) => {
          //   console.log('timestamp, click', data);
          // },
          // onMentionClick: (data) => {
          //   console.log('mention, click', data);
          // },
          // // onInboxThreadClick: (data) => {
          // //   // defining this overrides the default action for clicking an inbox item
          // //   console.log('inbox thread, click', data);
          // // },
          // onInboxCloseButtonClick: (data) => {
          //   console.log('inbox close button, click', data);
          // },
        }
      }
      onAuthenticationRequired={() => {
        console.log('authRequired');
      }}
      user={user}
      theme={theme}
      // renderAvatar={CustomAvatar}
      mentionableUsers={'allWorkspace'}
    >
      <Switch>
        <Route path="/cashboard" component={TableExample} />
        <Route path="/table" component={TableExample} />
        <Route component={Home} />
      </Switch>
    </CollabKitProvider>
  );
}

// function CustomAvatar(props: AvatarProps) {
//   return <Avatar user={props.profile} />;
// }

function Home() {
  const threadId = 'new-your-thread-id2';

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