import { CollabKitProvider, CustomTheme, Thread, useUnreadCount } from '@collabkit/react';
import * as themes from '@collabkit/custom-themes';
import { User } from './types';
import { TableExample } from './TableExample';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { proxy, useSnapshot, subscribe } from 'valtio';
import { Route, Switch, useLocation } from 'wouter';
import { CustomInbox } from './CustomInboxExample';
import ReactFlowExample from './ReactFlowExample';

import { useTestParams } from './hooks/useTestParams';
import { useAppParams } from './hooks/useAppParams';
import { useUserParams } from './hooks/useUserParams';
import { userFromGoogleToken } from './hooks/userFromGoogleToken';
import { useDocumentTitle } from './hooks/useDocumentTitle';

export const store = proxy<{ user: User | null }>(
  JSON.parse(localStorage.getItem('store') ?? '{ "user": null }') || { user: null }
);

subscribe(store, () => {
  localStorage.setItem('store', JSON.stringify(store));
});

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

function Demo() {
  const { user } = useSnapshot(store);
  const { apiKey, appId, workspaceId, workspaceName } = useAppParams();
  const test = useTestParams();

  const [pathname] = useLocation();
  const name = pathname.slice(1);
  const theme: CustomTheme | undefined =
    name in themes ? themes[name as keyof typeof themes] : undefined;

  return (
    <CollabKitProvider
      _test={test}
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
        // onThreadResolve: (data) => console.log('resolve', data),
        // onThreadReopen: (data) => console.log('reopen', data),
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
        <Route path="/" component={Home} />
        <Route path="/thread" component={Home} />
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
