import * as functions from 'firebase-functions';
import admin from 'firebase-admin';
import * as cors from 'cors';
import { generateCustomTokenImpl } from './generateCustomToken';
import { createUserImpl } from './createUser';
import { createWorkspaceImpl } from './createWorkspace';
import { createOrgImpl } from './createOrg';
import { commentImpl } from './comment';
import { sendNotificationImpl } from './sendNotification';
import { triggerWebhookImpl } from './triggerWebhook';

const corsHandler = cors.default({ origin: true });

export const createApp = functions.https.onRequest(async (request, response) => {
  corsHandler(request, response, async () => {
    const url = new URL(request.url, `http://${request.headers.host}`);

    switch (url.pathname.split('/')[2]) {
      case 'generateCustomToken':
        generateCustomTokenImpl(request, response);
        break;
      case 'createUser':
        createUserImpl(request, response);
        break;
      case 'createWorkspace':
        createWorkspaceImpl(request, response);
        break;
      case 'createOrg':
        createOrgImpl(request, response);
        break;
      case 'comment':
        commentImpl(request, response);
        break;
      case 'sendNotification':
        sendNotificationImpl(request, response);
        break;
      case 'triggerWebhook':
        triggerWebhookImpl(request, response);
        break;
      default:
        response.status(404).send('Route not found');
    }
  });
});
