import * as functions from 'firebase-functions';
import { postToWebhook } from './actions/postToWebhook';

export const triggerWebhook = functions.https.onRequest(async (request, response) => {
  const { appId, workspaceId, threadId, eventId, event, url } = request.body;
  console.log(`webhook: ${appId} ${workspaceId} ${threadId} ${eventId} ${event.body}`, event.body);
  try {
    await postToWebhook({ url, appId, workspaceId, threadId, eventId, event });
    console.log(`webhook: [success] ${appId} ${workspaceId} ${threadId} ${eventId} ${event.body}`);
    response.status(200).send();
  } catch (e) {
    console.log(
      `webhook: [failed] ${appId} ${workspaceId} ${threadId} ${eventId} ${event.body}`,
      e
    );

    response.status(500).send();
  }
});
