import * as functions from 'firebase-functions';
import * as Sentry from '@sentry/node';
import { queueWebhookTask } from './actions/queueWebhookTask';
import { scheduleNotificationTask } from './actions/scheduleNotificationTask';

export async function handleCreate(props: {
  appId: string;
  workspaceId: string;
  threadId: string;
  eventId: string;
  projectId: string;
  event: object;
}) {
  const transaction = Sentry.startTransaction({ name: 'onEvent' });
  try {
    await Promise.all([scheduleNotificationTask(props), queueWebhookTask(props)]);
  } catch (e) {
    const { appId, workspaceId, threadId, eventId } = props;
    Sentry.captureException(e, { tags: { appId, workspaceId, threadId, eventId } });
    console.error('[onEvent] error', e);
  } finally {
    transaction.finish();
  }
}

export const onEvent = functions
  .runWith({ minInstances: 1 })
  .database.ref('/timeline/{appId}/{workspaceId}/{threadId}/{eventId}')
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
      await handleCreate({
        appId,
        workspaceId,
        threadId,
        eventId,
        projectId,
        event: snapshot.val(),
      });
    })();
  });
