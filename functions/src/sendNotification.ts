import * as functions from 'firebase-functions';
import { generateAndSendEmailNotifications } from './actions/generateAndSendEmailNotifications';
import * as Sentry from '@sentry/node';

export async function sendNotificationImpl(
  request: functions.https.Request,
  response: functions.Response
) {
  const transaction = Sentry.startTransaction({ name: 'sendNotification' });
  const { appId, workspaceId, threadId, eventId } = request.body;
  try {
    await generateAndSendEmailNotifications({ appId, workspaceId, threadId, eventId });
    response.status(200).send();
  } catch (e) {
    Sentry.captureException(e, { tags: { appId, workspaceId, threadId, eventId } });
    response.status(500).send();
  } finally {
    transaction?.finish();
  }
}

export const sendNotification = functions
  .runWith({ minInstances: 1 })
  .https.onRequest(async (request, response) => {
    sendNotificationImpl(request, response);
  });
