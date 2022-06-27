import React, { useEffect } from 'react';
import { CollabKit } from '@collabkit/react';
import { App } from './App';

export function Dev(props: { app: App; children: React.ReactNode }) {
  const { app } = props;

  useEffect(() => {
    const token = Object.keys(app.keys)[0];
    CollabKit.setup({ appId: app.appId, apiKey: token, mode: 'UNSECURED' });
    CollabKit.identify({
      workspaceId: 'acme',
      userId: 'user1',
      workspaceName: 'ACME',
      name: 'Namit',
      email: 'namit@useteamspace.com',
      avatar: 'namit.pic.jpg',
    });
    CollabKit.mentions([
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
  }, [app]);

  if (app == null) {
    return null;
  }

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <CollabKit.App token={Object.keys(app.keys)[0]}>{props.children}</CollabKit.App>
    </div>
  );
}
