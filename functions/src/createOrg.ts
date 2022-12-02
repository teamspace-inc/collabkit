import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as cors from 'cors';
import { App, Org, OrgApps } from './types';
import { ref } from './actions/data/refs';
const corsHandler = cors.default({ origin: true });

async function generateId() {
  return admin.firestore().collection('name').doc().id;
}

export const createOrg = functions.https.onRequest(async (request, response) => {
  corsHandler(request, response, async () => {
    const idToken = request.get('Authorization')?.split('Bearer ')[1];

    if (!idToken) {
      response.status(401).send('No Authorization token');
      return;
    }

    if (!request.body.name) {
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

      const orgName = request.body.name.toString();

      if (orgName.length < 1) {
        throw new Error('Org name must be at least 1 character');
      }

      const org: Org = {
        name: orgName,
        admins,
        createdAt: admin.database.ServerValue.TIMESTAMP,
      };

      const appId = await generateId();
      const secureAppId = await generateId();
      const emailBatchDelayMs = 1000 * 60 * 5;

      const app: App = {
        emailBatchDelayMs,
        isEmailDisabled: false,
        name: `${orgName} Development`,
        keys: {
          [await generateId()]: true,
        },
        admins,
        mode: 'UNSECURED' as const,
      };

      const secureApp: App = {
        emailBatchDelayMs,
        isEmailDisabled: true,
        name: `${orgName} Production`,
        keys: {
          [await generateId()]: true,
        },
        admins,
        mode: 'SECURED' as const,
      };

      const orgApps: OrgApps = {
        [orgId]: { [appId]: true, [secureAppId]: true },
      };

      try {
        await ref`/`.update({
          [ref.path`orgs/${orgId}`]: org,
          [ref.path`apps/${appId}`]: app,
          [ref.path`apps/${secureAppId}`]: secureApp,
          [ref.path`orgApps/${orgId}/${appId}`]: true,
          [ref.path`orgApps/${orgId}/${secureAppId}`]: true,
          [ref.path`adminOrgs/${uid}/${orgId}`]: true,
        });
        try {
          response.status(201).send({
            status: 201,
            data: {
              org: { ...org, id: orgId },
              orgApps,
              app: { ...app, id: appId },
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
