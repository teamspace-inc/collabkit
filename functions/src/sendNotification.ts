import * as functions from 'firebase-functions';

export const sendNotification = functions.https.onRequest(async (request, response) => {
  const { appId, workspaceId, threadId, eventId, event } = request.body;
  console.log('sendNotif', appId, workspaceId, threadId, eventId, event);
  return Promise.resolve();
});
