import * as functions from 'firebase-functions';
import * as cors from 'cors';
import { generateCustomTokenImpl } from './generateCustomToken';
import { deleteUser, putUser } from './user';
import { workspaceImpl } from './workspace';
import { createOrgImpl } from './createOrg';
import { commentImpl } from './comment';
import { sendNotificationImpl } from './sendNotification';
import { triggerWebhookImpl } from './triggerWebhook';
import { generateToken } from './generateToken';

const corsHandler = cors.default({ origin: true });

export const routesImpl = async (
  request: functions.https.Request,
  response: functions.Response
) => {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const [_, version, fn] = url.pathname.split('/');

  if (version === 'v1') {
    switch (fn) {
      case 'generateCustomToken':
        return generateCustomTokenImpl(request, response);
      case 'generateToken':
        return generateToken(request, response);
      case 'user':
        if (request.method === 'PUT') {
          return putUser(request, response);
        } else if (request.method === 'DELETE') {
          return deleteUser(request, response);
        } else {
          response.status(405).send({ status: 405, error: 'Method not allowed' });
          return;
        }
      case 'workspace':
        return workspaceImpl(request, response);
      case 'createOrg':
        return createOrgImpl(request, response);
      case 'comment':
        return commentImpl(request, response);
      case 'sendNotification':
        return sendNotificationImpl(request, response);
      case 'triggerWebhook':
        return triggerWebhookImpl(request, response);
      default:
        response.status(404).send({ status: 404, error: 'Route not found' });
        return;
    }
  } else {
    response.status(404).send({ status: 404, error: 'Route not found' });
  }
};

export const routes = functions
  .region('europe-west2', 'us-central1', 'asia-east2')
  .runWith({ minInstances: 1 })
  .https.onRequest(async (request, response) => {
    corsHandler(request, response, async () => {
      await routesImpl(request, response);
    });
  });
