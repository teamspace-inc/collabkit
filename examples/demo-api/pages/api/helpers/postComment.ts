import { upsertUser } from '@collabkit/node';
import { admin } from './admin';
import { ref } from './refs';

export async function postComment({
  appId,
  apiKey,
  workspaceId,
  userId,
  threadId,
  body,
}: {
  appId: string;
  apiKey: string;
  workspaceId: string;
  threadId: string;
  userId: string;
  body: string;
}): Promise<string> {
  await upsertUser({
    appId,
    apiKey,
    workspaceId,
    userId,
    user: {
      name: 'Shape',
      email: 'info@shape.xyz',
      avatar:
        'https://avatars.slack-edge.com/2023-04-18/5127088875235_0faf97a6174d87fe0f9a_512.png',
      // @ts-expect-error
      isBot: true,
    },
  });

  const eventRef = await ref`/timeline/${appId}/${workspaceId}/${threadId}`.push();
  if (!eventRef.key) {
    throw new Error('failed to gen push ref to timeline');
  }

  const data: { [key: string]: any } = {
    [ref.path`/timeline/${appId}/${workspaceId}/${threadId}/${eventRef.key}`]: {
      body: body,
      type: 'message',
      createdById: userId,
      createdAt: admin.database.ServerValue.TIMESTAMP,
      mentions: null,
    },
    [ref.path`/views/inbox/${appId}/${workspaceId}/${threadId}`]: {
      body: body,
      type: 'message',
      createdById: userId,
      createdAt: admin.database.ServerValue.TIMESTAMP,
      mentions: null,
      id: eventRef.key,
      name: threadId,
    },
    [ref.path`/views/threadProfiles/${appId}/${workspaceId}/${threadId}/${userId}`]: true,
  };

  try {
    await ref`/`.update(data);
  } catch (e: any) {
    const error = new Error('failed to write msg: ' + e.message);
    error.stack += e.stack;
    throw error;
  }

  return eventRef.key;
}
