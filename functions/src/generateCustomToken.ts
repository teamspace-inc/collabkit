import * as functions from 'firebase-functions';
import * as Sentry from '@sentry/node';
import * as cors from 'cors';
import admin from 'firebase-admin';
import * as FirebaseId from './actions/data/FirebaseId';
import { ref } from './actions/data/refs';
import * as jwt from 'jsonwebtoken';
import { isValidPayload } from './actions/helpers/isValidPayload';
import { fetchWorkspaceProfile } from './actions/data/fetchWorkspaceProfile';

const corsHandler = cors.default({ origin: true });

export async function generateCustomTokenImpl(
  request: functions.https.Request,
  response: functions.Response
) {
  const transaction = Sentry.startTransaction({ name: 'generateCustomToken' });
  const { appId, userToken } = request.body;
  try {
    if (!appId) {
      response.status(400).send({ status: 400, error: '"appId" not provided' });
      return;
    }

    let apiKey: string = '';
    let payload: any = {};
    let data = await ref`/apps/${appId}/keys`.get();
    data.forEach((data) => {
      if (data.key) {
        try {
          payload = jwt.verify(userToken, data.key);
          apiKey = data.key;
        } catch (err) {}
      }
    });

    if (!apiKey) {
      response.status(400).send({ status: 400, error: '"userToken" invalid' });
      return;
    }

    if (!isValidPayload(payload)) {
      response.status(400).send({ status: 400, error: '"jwt payload" not valid' });
      return;
    }

    const { userId, workspaceId } = payload;

    if (workspaceId !== 'default') {
      try {
        const profile = await fetchWorkspaceProfile({ appId, workspaceId, profileId: userId });
        if (!profile) {
          response.status(400).send({ status: 400, error: '"userId" not found' });
          return;
        }
      } catch (e) {
        Sentry.captureException(e, { tags: { appId, workspaceId, userId } });
        console.error(e);
        response.status(400).send({ status: 400, error: '"workspaceId not found"' });
        return;
      }
    }

    const token = await admin.auth().createCustomToken(apiKey, {
      api: true,
      mode: 'SECURED',
      appId: FirebaseId.encode(appId),
      userId: FirebaseId.encode(userId),
      workspaceId: FirebaseId.encode(workspaceId),
    });

    response
      .set('Cache-Control', 'public, max-age=300, s-maxage=600')
      .status(201)
      .send({
        status: 201,
        data: {
          appId,
          userId,
          workspaceId,
          mode: 'SECURED',
          token,
        },
      });
    return;
  } catch (e) {
    Sentry.captureException(e, { tags: { appId } });
    response.status(401).send({ status: 401, error: e });
    return;
  } finally {
    transaction?.finish();
  }
}

export const generateCustomToken = functions
  .region('europe-west2', 'us-central1', 'asia-east2')
  .runWith({ minInstances: 2 })
  .https.onRequest(async (request, response) => {
    corsHandler(request, response, async () => {
      await generateCustomTokenImpl(request, response);
    });
  });
