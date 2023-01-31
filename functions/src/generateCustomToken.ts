import * as functions from 'firebase-functions';
import * as cors from 'cors';
import * as admin from 'firebase-admin';
import * as FirebaseId from './actions/data/FirebaseId';
import { ref } from './actions/data/refs';
import * as jwt from 'jsonwebtoken';
import { fetchWorkspaceProfiles } from './actions/data/fetchWorkspaceProfiles';
import { isValidPayload } from './actions/helpers/isValidPayload';

const corsHandler = cors.default({ origin: true });

export async function generateCustomTokenImpl(
  request: functions.https.Request,
  response: functions.Response
) {
  try {
    const { appId, userToken } = request.body;

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
        } catch (err) {
        }
      }
    });

    if (!apiKey) {
      response.status(400).send({ status: 400, error: '"userToken" invalid' });
      return
    }

    if(!isValidPayload(payload)){
      response.status(400).send({ status: 400, error: '"jwt payload" not valid'});
      return
    }

    const { userId, workspaceId } = payload;

    const profiles = await fetchWorkspaceProfiles({ appId, workspaceId });
    try {
      if (!profiles.find((profile) => profile === userId)) {
        response.status(400).send({ status: 400, error: '"userId" not found' });
        return
      }
    } catch (e) {
      response.status(400).send({ status: 400, error: '"workspaceId not found"'});
      return
    }

    const token = await admin.auth().createCustomToken(apiKey, {
      api: true,
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
        token,
      },
    });
    return;
  } catch (e) {
    response.status(401).send({ status: 401, error: e });
    return;
  }
}

export const generateCustomToken = functions
  .region('europe-west2', 'us-central1', 'asia-east2')
  .runWith({ minInstances: 2 })
  .https.onRequest(async (request, response) => {
    corsHandler(request, response, async () => {
      await generateCustomTokenImpl(request, response);
    })
  }
  );
