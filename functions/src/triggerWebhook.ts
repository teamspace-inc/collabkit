import * as functions from 'firebase-functions';
import * as Sentry from '@sentry/node';
import { postToWebhook } from './actions/postToWebhook';

export async function triggerWebhookImpl(
  request: functions.https.Request,
  response: functions.Response
) {
  const transaction = Sentry.startTransaction({ name: 'triggerWebhook' });
  try {
    const { appId, workspaceId, threadId, eventId, event, url } = request.body;
    await postToWebhook({ url, appId, workspaceId, threadId, eventId, event });
    response.status(200).send();
  } catch (e) {
    Sentry.captureException(e);
    response.status(500).send();
  } finally {
    transaction.finish();
  }
}

export const triggerWebhook = functions.https.onRequest(async (request, response) => {
  triggerWebhookImpl(request, response);
});
