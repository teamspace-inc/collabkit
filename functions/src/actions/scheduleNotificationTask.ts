import { createTask } from './helpers/createTask';
import { ref } from './data/refs';
import { API_HOST } from '../apiHost';

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
    url: API_HOST + '/v1/sendNotification',
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
