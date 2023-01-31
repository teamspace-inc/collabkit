import * as functions from 'firebase-functions';
import * as cors from 'cors';
import * as admin from 'firebase-admin';
import * as FirebaseId from './actions/data/FirebaseId';
import { ref } from './actions/data/refs';
import * as jwt from 'jsonwebtoken';
import { fetchWorkspaceProfiles } from './actions/data/fetchWorkspaceProfiles';

const corsHandler = cors.default({ origin: true });

export async function generateUserToken(
  request: functions.https.Request,
  response: functions.Response
) {
  try {
    const { appId, userToken } = request.body;

    if (!appId) {
      console.debug('"appId" not provided', appId);
      response.status(400).send({ status: 400, error: '"appId" not provided', appId });
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
          console.log(`Verification Failed [apiKey:${apiKey},userToken:${userToken}`);
        }
      }
    });

    const { userId, workspaceId } = payload;

    const profiles = await fetchWorkspaceProfiles({ appId, workspaceId });
    try {
      if (!profiles.find((profile) => profile === userId)) {
        response.status(400).send({ status: 400, error: '"userId" not found', appId });
      }
    } catch (e) {
      response.status(400).send({ status: 401, error: '"workspaceId not found"', workspaceId });
    }

    if (!apiKey) {
      response.status(403).send({ status: 403, error: '"userToken" invalid', appId, userToken });
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
    console.error('Error with userToken', { error: e });
    response.status(401).send({ status: 401, error: e });
    return;
  }
}

export const userToken = functions
  .region('europe-west2', 'us-central1', 'asia-east2')
  .runWith({ minInstances: 2 })
  .https.onRequest(async (request, response) =>
    corsHandler(request, response, async () => {
      await generateUserToken(request, response);
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
