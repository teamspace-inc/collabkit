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
import { CustomInbox } from './CustomInboxExample';
import ReactFlowExample from './ReactFlowExample';

const store = proxy<{ user: User | null }>(
  JSON.parse(localStorage.getItem('store') ?? '{ "user": null }') || { user: null }
);

subscribe(store, () => {
  localStorage.setItem('store', JSON.stringify(store));
});

// reads user details from url params and sets them in the store
// used by e2e tests to bypass google authentication as it's not
// easy to automate using playwright
function useUserParams() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  if (params.userId && params.userName && params.userEmail) {
    store.user = {
      id: params.userId,
      name: params.userName,
      email: params.userEmail,
      avatar: params.userAvatar,
    };
  }
}

export default function App() {
  useUserParams();
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

// reads app details from url params
function useAppParams() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  return {
    apiKey: params.apiKey ?? import.meta.env.VITE_COLLABKIT_APP_ID,
    appId: params.appId ?? import.meta.env.VITE_COLLABKIT_APP_ID,
    workspaceId: params.workspaceId ?? import.meta.env.VITE_COLLABKIT_WORKSPACE_ID,
    workspaceName: params.workspaceName ?? import.meta.env.VITE_COLLABKIT_WORKSPACE_NAME,
  };
}

function Demo() {
  const { user } = useSnapshot(store);
  const { apiKey, appId, workspaceId, workspaceName } = useAppParams();

  const [pathname] = useLocation();
  const name = pathname.slice(1);
  const theme: CustomTheme | undefined =
    name in themes ? themes[name as keyof typeof themes] : undefined;

  return (
    <CollabKitProvider
      apiKey={apiKey}
      appId={appId}
      workspace={{ id: workspaceId, name: workspaceName }}
      callbacks={{
        // onInboxThreadClick: (data) => {
        //   // defining this overrides the default action for clicking an inbox item
        //   console.log('inbox thread, click', data);
        // },
        onTimestampClick: (data) => {
          console.log('timestamp, click', data);
        },
        onThreadCreated: (data) => {
          console.log('thread, created', data);
        },
        // onCommentSend: (data) => {
        //   console.log(data);
        // },
        // onMentionClick: (data) => {
        //   console.log('mention, click', data);
        // },

        // onInboxCloseButtonClick: (data) => {
        //   console.log('inbox close button, click', data);
        // },
      }}
      onAuthenticationRequired={() => {
        console.log('authRequired');
      }}
      user={user}
      theme={theme}
      // theme="dark"
      // renderAvatar={CustomAvatar}
      // renderThreadContextPreview={() => {
      //   return (
      //     <div
      //       style={{
      //         width: '100%',
      //         height: 38,
      //         background: '#F5F8FA',
      //         borderRadius: 8,
      //       }}
      //     ></div>
      //   );
      // }}
      mentionableUsers={'allWorkspace'}
    >
      <Switch>
        <Route path="/table" component={TableExample} />
        <Route path="/custominbox" component={CustomInbox} />
        <Route path="/reactflow" component={ReactFlowExample} />
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
        showHeader={true}
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
