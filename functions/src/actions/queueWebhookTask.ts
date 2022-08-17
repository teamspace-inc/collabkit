import { createTask } from './helpers/createTask';
import { isValidUrl } from './helpers/isValidUrl';
import * as admin from 'firebase-admin';

const db = admin.database();

export async function queueWebhookTask(props: {
  appId: string;
  workspaceId: string;
  threadId: string;
  eventId: string;
  projectId: string;
  event: any;
}) {
  const { projectId, appId, workspaceId, threadId, eventId, event } = props;

  const url = (await db.ref(`/apps/${appId}/webhook/`).get()).val();

  if (!url) {
    return;
  }

  if (!isValidUrl(url)) {
    return;
  }

  const response = await createTask({
    projectId,
    url: 'https://us-central1-collabkit-dev.cloudfunctions.net/webbooks',
    queue: 'webhooks',
    payload: {
      url,
      appId,
      workspaceId,
      threadId,
      eventId,
      event,
    },
  });

  return response.name;
}
