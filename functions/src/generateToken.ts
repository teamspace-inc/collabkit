import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as cors from 'cors';
const corsHandler = cors.default({ origin: true });

export const generateToken = functions.https.onRequest(async (request, response) =>
  corsHandler(request, response, async () => {
    const { mode, appId } = request.query;

    if (!appId) {
      response.status(400).send({ status: 400, error: '"appId" not provided' });
      return;
    }

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
          const { apiKey } = request.query;

          if (!apiKey) {
            response.status(400).send({ status: 400, error: '"apiKey" not provided' });
            return;
          }

          const snapshot = await admin
            .database()
            .ref(`/apps/${appId}/keys/${apiKey.toString()}/`)
            .once('value');

          if (!snapshot.exists()) {
            response.status(400).send({ status: 400, error: '"apiKey" invalid' });
            return;
          }

          try {
            const token = await admin
              .auth()
              .createCustomToken(apiKey.toString(), { api: true, appId, mode });

            response.send(
              JSON.stringify({
                status: 201,
                data: {
                  appId,
                  mode,
                  token,
                },
              })
            );
            return;
          } catch (e) {
            functions.logger.error('Error with UNSECURED flow', { error: e });
            response.status(500).send({ status: 500, error: 'Something went wrong' });
            return;
          }
        }

        case 'SECURED': {
          const { endUserId: userId, workspaceId } = request.query;

          const idToken = request.get('Authorization')?.split('Bearer ')[1];

          if (!idToken) {
            response.status(401).send({ status: 401, error: 'No "Authorization" header' });
            return;
          }

          const decodedTokenId = await admin.auth().verifyIdToken(idToken.toString());
          const { uid } = decodedTokenId;

          if (!workspaceId) {
            response.status(400).send({ status: 400, error: 'No workspaceId' });
            return;
          }

          if (!userId) {
            response.status(400).send({ status: 400, error: 'No userId' });
            return;
          }

          const token = await admin
            .auth()
            .createCustomToken(uid, { api: true, appId, userId, workspaceId });

          response.send(
            JSON.stringify({
              status: 201,
              data: {
                appId,
                userId,
                mode,
                token,
              },
            })
          );
          return;
        }

        default: {
          response.status(400).send({ status: 400, error: '"mode" not supported' });
          return;
        }
      }
    } catch (e) {
      response.status(401).send({ status: 401, error: 'Unauthorized' });
      return;
    }
  })
);
