import { createTask } from './helpers/createTask';
import { ref } from './data/refs';

export async function scheduleNotificationTask(props: {
  appId: string;
  workspaceId: string;
  threadId: string;
  eventId: string;
  projectId: string;
  event: any;
}) {
  const { appId, workspaceId, threadId, eventId, projectId, event } = props;

  const delayMs = (await ref`/apps/${appId}/emailBatchDelayMs/`.get()).val();

  if (!delayMs || typeof delayMs !== 'number') {
    console.log('[scheduleNotificationTask] no emailBatchDelayMs');
    return;
  }

  const response = await createTask({
    projectId,
    url: 'https://us-central1-collabkit-dev.cloudfunctions.net/sendNotification',
    queue: 'notifs',
    payload: {
      appId,
      workspaceId,
      threadId,
      eventId,
      event,
    },
    delayMs,
  });

  console.log('[scheduleNotificationTask] scheduled', {
    payload: { appId, workspaceId, threadId, eventId },
    delayMs,
  });

  return response.name;
}
