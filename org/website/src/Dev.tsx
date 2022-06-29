import React from 'react';
import { CollabKit } from '@collabkit/react';
import { App } from './App';

const mentions = [
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
];

const identity = {
  workspaceId: 'acme',
  userId: 'user1',
  workspaceName: 'ACME',
  name: 'Namit',
  email: 'namit@useteamspace.com',
  avatar: 'namit.pic.jpg',
};

export function Dev(props: { app: App; children: React.ReactNode }) {
  const { app } = props;

  if (app == null) {
    return null;
  }

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <CollabKit.App
        token={Object.keys(app.keys)[0]}
        appId={app.appId}
        identity={identity}
        mentions={mentions}
      >
        {props.children}
      </CollabKit.App>
    </div>
  );
}
