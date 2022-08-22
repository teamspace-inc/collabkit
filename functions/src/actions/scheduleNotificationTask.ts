import { createTask } from './helpers/createTask';
import * as admin from 'firebase-admin';

const db = admin.database();

export async function scheduleNotificationTask(props: {
  appId: string;
  workspaceId: string;
  threadId: string;
  eventId: string;
  projectId: string;
  event: any;
}) {
  const { appId, workspaceId, threadId, eventId, projectId, event } = props;

  const emailBatchDelayMs = (await db.ref(`/apps/${appId}/emailBatchDelayMs/`).get()).val();

  if (!emailBatchDelayMs || typeof emailBatchDelayMs !== 'number') {
    console.log('[scheduleNotificationTask] no emailBatchDelayMs');
    return;
  }

  const response = await createTask({
    projectId,
    url: 'https://us-central1-collabkit-dev.cloudfunctions.net/sendNotifcation',
    queue: 'notifs',
    payload: {
      appId,
      workspaceId,
      threadId,
      eventId,
      event,
    },
    delayMs: emailBatchDelayMs,
  });

  return response.name;
}
