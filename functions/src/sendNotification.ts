import * as functions from 'firebase-functions';

export const sendNotification = functions.https.onRequest(async (request, response) => {
  const { appId, workspaceId, threadId, eventId, event } = request.body;
  console.log(`send: ${appId} ${workspaceId} ${threadId} ${eventId} ${event.body}`, event.body);
  response.status(200).send();
});
