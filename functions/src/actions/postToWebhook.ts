import * as admin from 'firebase-admin';
import fetch from 'node-fetch';

const db = admin.database();

async function fetchEventContext(props: { appId: string; workspaceId: string; threadId: string }) {
  const { appId, workspaceId, threadId } = props;

  const [seenBySnapshot, threadInfoSnapshot] = await Promise.all([
    db.ref(`/views/seenBy/${appId}/${workspaceId}/${threadId}/`).get(),
    db.ref(`/threadInfo/${appId}/${workspaceId}/${threadId}`).get(),
  ]);

  const threadInfo = threadInfoSnapshot.val();
  const seenBy = seenBySnapshot.val();

  return {
    threadInfo,
    seenBy,
  };
}

export async function postToWebhook(props: {
  url: string;
  appId: string;
  workspaceId: string;
  threadId: string;
  eventId: string;
  event: any;
}) {
  const { url, appId, workspaceId, threadId, eventId, event } = props;

  const { threadInfo, seenBy } = await fetchEventContext({ appId, workspaceId, threadId });

  await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      action: 'new-event',
      payload: {
        appId,
        workspaceId,
        threadId,
        eventId,
        event,
        context: {
          threadInfo,
          seenBy,
        },
      },
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
