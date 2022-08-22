import * as functions from 'firebase-functions';
import { generateAndSendEmailNotifications } from './actions/generateAndSendEmailNotifications';

export const sendNotification = functions
  .runWith({ minInstances: 1 })
  .https.onRequest(async (request, response) => {
    const { appId, workspaceId, threadId, eventId, event } = request.body;
    try {
      await generateAndSendEmailNotifications({ appId, workspaceId, threadId, eventId });
      console.log(`send: [success] ${appId} ${workspaceId} ${threadId} ${eventId} ${event.body}`);
      response.status(200).send();
    } catch (e) {
      console.error(
        `send: [failed] ${appId} ${workspaceId} ${threadId} ${eventId} ${event.body}`,
        e
      );
      response.status(500).send();
    }
  });
