import * as functions from 'firebase-functions';
import * as Sentry from '@sentry/node';
import * as cors from 'cors';
import admin from 'firebase-admin';
import { updateUser } from './actions/helpers/updateUser';
import { isValidUser } from './actions/helpers/isValidUser';
import * as FirebaseId from './actions/data/FirebaseId';
import { ref } from './actions/data/refs';
import { updateWorkspace } from './actions/helpers/updateWorkspace';

const corsHandler = cors.default({ origin: true });

export async function handleRequest(
  request: functions.https.Request,
  response: functions.Response
) {
  const transaction = Sentry.startTransaction({ name: 'generateToken' });
  const mode = request.query.mode || request.body.mode;

  if (!mode) {
    response.status(400).send({ status: 400, error: '"mode" not provided' });
    return;
  }

  if (!(mode === 'UNSECURED' || mode === 'SECURED')) {
    response.status(400).send({ status: 400, error: '"mode" not supported' });
    return;
  }

  try {
    switch (mode) {
      case 'UNSECURED': {
        const { appId, apiKey } = request.query;

        if (!appId || typeof appId !== 'string') {
          console.debug('"appId" not provided', appId);
          response.status(400).send({ status: 400, error: '"appId" not provided' });
          return;
        }

        if (!apiKey || typeof apiKey !== 'string') {
          console.debug('"apiKey" not provided', apiKey);
          response.status(400).send({ status: 400, error: '"apiKey" not provided' });
          return;
        }

        try {
          const snapshot = await ref`/apps/${appId}/keys/${apiKey}/`.once('value');

          if (!snapshot.exists()) {
            console.debug('"apiKey" not found', appId);
            response.status(400).send({ status: 400, error: '"apiKey" invalid' });
            return;
          }

          const token = await admin
            .auth()
            .createCustomToken(apiKey.toString(), { api: true, appId, mode });

          // tokens are valid for 1 hour
          // so we can safely cache it for a bit
          response.set('Cache-Control', 'public, max-age=300, s-maxage=600').status(201).send({
            status: 201,
            data: {
              appId,
              mode,
              token,
            },
          });
          return;
        } catch (e) {
          Sentry.captureException(e, { tags: { mode, appId } });
          console.error(e);
          functions.logger.error('Error with UNSECURED flow', { error: e });
          response.status(500).send({ status: 500, error: 'Something went wrong' });
          return;
        }
      }

      case 'SECURED': {
        const { appId, userId, workspaceId, apiKey, user, workspace } = request.body;

        if (!appId) {
          console.debug('"appId" not provided', appId);
          response.status(400).send({ status: 400, error: '"appId" not provided', appId });
          return;
        }

        if (!apiKey || typeof apiKey !== 'string') {
          console.debug('"apiKey" not provided', apiKey);
          response.status(400).send({ status: 400, error: '"apiKey" not provided', apiKey });
          return;
        }

        if (!workspaceId || typeof workspaceId !== 'string') {
          console.debug('"workspaceId" not provided', workspaceId);
          response
            .status(400)
            .send({ status: 400, error: '"workspaceId" not provided', workspaceId });
          return;
        }

        if (!userId) {
          console.debug('"userId" not provided', userId);
          response.status(400).send({ status: 400, error: '"userId" not provided', userId });
          return;
        }

        if (!user) {
          console.debug('"user" not provided', user);
          response
            .status(400)
            .send({ status: 400, error: '"user" not provided', userId, workspaceId, user });
          return;
        }
        if (!isValidUser(user)) {
          console.debug('"user" object invalid', user);
          response.status(400).send({ status: 400, error: '"user" object is invalid', user });
        }

        // default workspace has no props
        if (workspaceId.toLowerCase() !== 'default' && !workspace) {
          console.debug('"default workspace"', workspace);
          response.status(400).send({ status: 400, error: '"workspace" not provided', workspace });
          return;
        }

        try {
          const snapshot = await ref`/apps/${appId}/keys/${apiKey}/`.once('value');

          if (!snapshot.exists()) {
            console.debug('"apiKey" not found', appId);
            response.status(403).send({ status: 403, error: '"apiKey" invalid', appId, apiKey });
            return;
          }

          await updateWorkspace({ appId, workspaceId, workspace });
          await updateUser({ appId, userId, workspaceId, user });

          const token = await admin.auth().createCustomToken(apiKey, {
            api: true,
            mode,
            appId: FirebaseId.encode(appId),
            userId: FirebaseId.encode(userId),
            workspaceId: FirebaseId.encode(workspaceId),
          });

          response.set('Cache-Control', 'public, max-age=300, s-maxage=600').status(201).send({
            status: 201,
            data: {
              appId,
              userId,
              workspaceId,
              mode,
              token,
            },
          });
          return;
        } catch (e) {
          Sentry.captureException(e, { tags: { mode, appId, workspaceId, userId } });
        }
      }

      default: {
        console.debug('"mode" not supported', mode);
        response.status(400).send({ status: 400, error: '"mode" not supported' });
        return;
      }
    }
  } catch (e) {
    Sentry.captureException(e);
    console.error('Error with generateToken', { error: e });
    response.status(401).send({ status: 401, error: e });
    return;
  } finally {
    transaction.finish();
  }
}

export const generateToken = functions
  .region('europe-west2', 'us-central1', 'asia-east2')
  .runWith({ minInstances: 2 })
  .https.onRequest(async (request, response) =>
    corsHandler(request, response, async () => {
      await handleRequest(request, response);
    })
  );

// for dev testing
// admin.initializeApp({
//   credential: admin.credential.cert('/Users/namitchadha/collabkit-dev-service-account.json'),
//   databaseURL: 'https://collabkit-dev-default-rtdb.europe-west1.firebasedatabase.app',
// });

// update({
//   appId: 'gblfnmjLQwxN0dz9r4mer',
//   workspaceId: 'acme',
//   userId: 'alice',
//   user: {
//     name: 'Alice',
//     email: 'alice@example.com',
//   },
//   workspace: {
//     name: 'ACME',
//   },
// })
//   .then(() => {
//     console.log('complete');
//   })
//   .catch((e) => {
//     console.error(e);
//   });
