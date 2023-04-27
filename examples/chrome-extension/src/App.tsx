import { CollabKitProvider, Thread } from '@collabkit/react';

function App() {
  return (
    <CollabKitProvider
      appId="rCTgBjF7mhdCmTf6chKnK"
      apiKey="fjfLQqCQhG9nLCPcWfKq8pCrRbTcPnG6"
      user={{
        id: 'demouser',
        name: 'Demo user',
      }}
      workspace={{
        id: 'demo',
        name: 'Demo workspace',
      }}
      mentionableUsers="allWorkspace"
      theme="light"
    >
      <Thread
        style={{
          width: 400,
          position: 'fixed',
          top: 0,
          bottom: 0,
          right: 0,
          borderLeft: '1px solid hsla(210,18%,87%,1)',
          zIndex: 1,
        }}
        threadId="github-issues-thread"
        info={{ name: 'Demo thread' }}
      />
    </CollabKitProvider>
  );
}

export default App;
