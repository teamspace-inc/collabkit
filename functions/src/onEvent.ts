import * as functions from 'firebase-functions';
import { queueWebhookTask } from './actions/queueWebhookTask';
import { scheduleNotificationTask } from './actions/scheduleNotificationTask';

export const onEvent = functions.database
  .ref('/timeline/{appId}/{workspaceId}/{threadId}/{eventId}')
  .onCreate((snapshot, context) => {
    if (context.authType === 'ADMIN') {
      return;
    }

    const { appId, workspaceId, threadId, eventId } = context.params;

    const projectId = process.env.GCLOUD_PROJECT;

    if (!projectId) {
      throw new Error('GCLOUD_PROJECT environment variable is not set');
    }

    return (async () => {
      const props = {
        appId,
        workspaceId,
        threadId,
        eventId,
        projectId,
        event: snapshot.val(),
      };
      await Promise.all([scheduleNotificationTask(props), queueWebhookTask(props)]);
    })();
  });
