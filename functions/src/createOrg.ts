import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as cors from 'cors';
const corsHandler = cors.default({ origin: true });

async function generateId() {
  return (await import('nanoid')).nanoid();
}

export const createOrg = functions.https.onRequest(async (request, response) => {
  corsHandler(request, response, async () => {
    const idToken = request.get('Authorization')?.split('Bearer ')[1];

    if (!idToken) {
      response.status(401).send('No Authorization token');
      return;
    }

    if (!request.query.name) {
      response.status(400).send('No name');
      return;
    }

    try {
      const decodedIdToken = await admin.auth().verifyIdToken(idToken.toString());

      const { uid } = decodedIdToken;

      const orgId = await generateId();

      const admins: Org['admins'] | App['admins'] = {
        [uid]: true,
      };

      const org: Org = {
        name: request.query.name.toString(),
        admins,
        createdAt: admin.database.ServerValue.TIMESTAMP,
      };

      const appId = await generateId();

      const app: App = {
        name: 'default',
        keys: {
          [await generateId()]: true,
        },
        admins,
        mode: 'UNSECURED' as const,
      };

      const orgApps: OrgApps = {
        [orgId]: { [appId]: true },
      };

      try {
        await admin
          .database()
          .ref(`/`)
          .update({
            [`orgs/${orgId}`]: org,
            [`apps/${appId}`]: app,
            [`orgApps/${orgId}/${appId}`]: true,
          });
        try {
          response.status(201).send({
            status: 201,
            data: {
              org,
              orgApps,
              app,
            },
          });
        } catch (e) {
          functions.logger.error('Failed to create org', { error: e });
          response.status(400).send({ status: 400, error: 'Something went wrong' });
        }
      } catch (e) {
        functions.logger.error('Failed to create org', { error: e });
        response.status(400).send({ status: 400, error: 'Something went wrong' });
      }
    } catch (e) {
      functions.logger.error('Failed to verify id token', { error: e });
    }
  });
});
