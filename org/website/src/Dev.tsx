import React, { useEffect } from 'react';
import { CollabKit } from '@collabkit/react';
import { App } from './App';
import { useApp } from '@collabkit/react/src/components/App';

function Boot(props: { app: App; children: React.ReactNode }) {
  const { store, events } = useApp();
  const { app } = props;
  useEffect(() => {
    if (store == null || events == null) {
      return;
    }
    const token = Object.keys(app.keys)[0];
    CollabKit.setup(store, events, { appId: app.appId, apiKey: token, mode: 'UNSECURED' });
    CollabKit.identify(store, {
      workspaceId: 'acme',
      userId: 'user1',
      workspaceName: 'ACME',
      name: 'Namit',
      email: 'namit@useteamspace.com',
      avatar: 'namit.pic.jpg',
    });
    CollabKit.mentions(store, [
      {
        name: 'Tom',
        email: 'tom@useteamspace.com',
        avatar: 'tom.pic.jpg',
        workspaceId: 'acme',
        userId: 'user1',
      },
      {
        name: 'Mike',
        email: 'mike@useteamspace.com',
        avatar: 'mike.pic.jpg',
        workspaceId: 'acme',
        userId: 'user2',
      },
      {
        name: 'Jessica',
        email: 'jessica@useteamspace.com',
        avatar: 'jess.pic.jpg',
        workspaceId: 'acme',
        userId: 'user3',
      },
    ]);
  }, [app, store]);
  return <>{props.children}</>;
}

export function Dev(props: { app: App; children: React.ReactNode }) {
  const { app } = props;

  if (app == null) {
    return null;
  }

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <CollabKit.App token={Object.keys(app.keys)[0]}>
        {<Boot app={app}>{props.children}</Boot>}
      </CollabKit.App>
    </div>
  );
}
