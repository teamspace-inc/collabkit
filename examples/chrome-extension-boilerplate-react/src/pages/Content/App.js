import React from 'react';
import { CollabKitProvider, Thread, useUnreadCount } from '@collabkit/react';
import Frame, { FrameContextConsumer } from 'react-frame-component';
const jose = require('jose');

const apiKey = "dHchccA9yszQ3EFftTEQm";
const appId = "0mO-P6YhtUwKsZNwnDSt9";
const userId = "111637137126937938046";
const workspaceId = "demo";


async function createUserToken(apiKey, userId, workspaceId) {
  const secret = new TextEncoder().encode(
    apiKey
  )
  const jwt = await new jose.SignJWT({ userId: userId, workspaceId: workspaceId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(secret)
  return jwt;
}

function App() {
  const threadId = 'new-your-thread-id2';
  const [token, setToken] = React.useState("");
  React.useEffect(() => {
    const token = createUserToken(apiKey, userId, workspaceId).then((token) => {
      console.log(token)
      setToken(token);
    });
  }, []);

  return (
    <Frame head={[<link type="text/css" rel="stylesheet" href={chrome.runtime.getURL("style.styles.css")} ></link>]}>
      <FrameContextConsumer>
        {
          // Callback is invoked with iframe's window and document instances
          ({ document, window }) => {
            // Render Children
            return (
              <>
                <div className={'my-extension'}>
                  {token ?
                    <CollabKitProvider
                      _test={true}
                      appId={appId}
                      token={token}
                      onPinHover={(props) => { }}
                      onPinAttach={() => {
                      }}
                      onPinClick={(props) => {
                      }}
                      onPinUnhover={(props) => { }}
                      onPinDeselect={(props) => { }}
                      onTimestampClick={(data) => {
                        console.log('timestamp, click', data);
                      }}
                      onThreadCreated={(data) => {
                        console.log('thread, created', data);
                      }}
                      onAuthenticationRequired={() => {
                        console.log('authRequired');
                      }}
                      mentionableUsers="allWorkspace"
                    >
                      <Thread
                        style={{ position: 'fixed', inset: 0 }}
                        autoFocus={true}
                        info={{ name: 'Demo thread' }}
                        showHeader={true}
                        threadId={threadId}
                        bot={true}
                      />
                    </CollabKitProvider>
                    : null}
                </div>
              </>
            )
          }
        }
      </FrameContextConsumer>
    </Frame>
  )
}

export default App;