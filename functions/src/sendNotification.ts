import * as functions from 'firebase-functions';
import { generateNotification } from './generateNotification';

export const sendNotification = functions.https.onRequest(async (request, response) => {
  const { appId, workspaceId, threadId, eventId, event } = request.body;
  console.log(`send: ${appId} ${workspaceId} ${threadId} ${eventId} ${event.body}`, event.body);
  try {
    await generateNotification({ appId, workspaceId, threadId, eventId });
    response.status(200).send();
  } catch (e) {
    console.error(e);
    response.status(500).send();
  }
});
