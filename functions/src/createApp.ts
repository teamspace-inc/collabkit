import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { nanoid } from 'nanoid';
import * as cors from 'cors';
const corsHandler = cors({ origin: true });

export const createApp = functions.https.onRequest(async (request, response) => {
  corsHandler(request, response, async () => {
    const idToken = request.get('Authorization')?.split('Bearer ')[1];

    if (!idToken) {
      response.status(401).send('No Authorization token');
      return;
    }

    try {
      const decodedIdToken = await admin.auth().verifyIdToken(idToken.toString());

      const { uid } = decodedIdToken;

      const app = {
        keys: {
          [nanoid()]: true,
        },
        members: {
          [uid]: true,
        },
        mode: 'UNSECURED' as const,
      };

      try {
        const appRef = await admin.database().ref('/apps').push(app);
        if (appRef.key) {
          try {
            const membershipRef = await admin.database().ref(`/memberships/${uid}/${appRef.key}`);
            membershipRef.set(true);
            response.status(201).send({
              status: 201,
              data: {
                app: {
                  ...app,
                  appId: appRef.key,
                },
                membership: {
                  [appRef.key]: true,
                },
              },
            });
          } catch (e) {
            functions.logger.error('Failed to create membership', { error: e });
            response.status(400).send({ status: 400, error: 'Something went wrong' });
          }
        } else {
          functions.logger.error('Failed to create app', { error: 'Blank appRef.key' });
          response.status(400).send({ status: 400, error: 'Something went wrong' });
        }
      } catch (e) {
        functions.logger.error('Failed to create app', { error: e });
        response.status(400).send({ status: 400, error: 'Something went wrong' });
      }
    } catch (e) {
      functions.logger.error('Failed to verify id token', { error: e });
    }
  });
});
