import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as cors from 'cors';
const corsHandler = cors.default({ origin: true });

type UserProps = {
  name?: string | null;
  email?: string | null;
  avatar?: string | null;
};

function deleteUndefinedProps(o: any) {
  if (typeof o === 'object') {
    Object.keys(o).forEach((key) => {
      if (o[key] === undefined) {
        delete o[key];
      }
    });
  }
  return o;
}

function isValidUser(o: any): o is UserProps {
  return (
    (o !== null &&
      typeof o === 'object' &&
      // setting to null deletes the attribute
      (('name' in o && typeof o.name === 'string') || o.name === null)) ||
    ('email' in o && typeof o.email === 'string') ||
    o.email === null ||
    ('avatar' in o && typeof o.avatar === 'string') ||
    o.avatar === null ||
    o === null
  );
}

async function update(props: {
  appId: string;
  userId: string;
  workspaceId: string;
  workspace?: WorkspaceProps;
  user: UserProps;
}) {
  const { appId, workspaceId, userId, workspace, user } = props;

  const updates: { [path: string]: object | string | boolean } = {};

  // contains an ancestor of the next set of updates
  // so we need to do this one first
  if (workspaceId !== 'default' && isValidWorkspace(workspace)) {
    await admin
      .database()
      .ref(`/workspaces/${appId}/${workspaceId}/`)
      .update(deleteUndefinedProps(workspace));
  }

  if (isValidUser(user)) {
    updates[`/profiles/${appId}/${userId}/`] = deleteUndefinedProps(user);
    updates[`/workspaces/${appId}/${workspaceId}/profiles/${userId}/`] = true;
  }

  await admin.database().ref('/').update(updates);
}

type WorkspaceProps = {
  name?: string | null;
};

function isValidWorkspace(o: any): o is WorkspaceProps {
  return (
    (o !== null &&
      typeof o === 'object' &&
      'name' in o &&
      // setting to null deletes the name
      (typeof o.name === 'string' || o.name === null)) ||
    o === null
  );
}

export const generateToken = functions
  .region('europe-west2', 'us-central1', 'asia-east2')
  .runWith({ minInstances: 2 })
  .https.onRequest(async (request, response) =>
    corsHandler(request, response, async () => {
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

            if (!appId) {
              response.status(400).send({ status: 400, error: '"appId" not provided' });
              return;
            }

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

              // tokens are valid for 1 hour
              // so we can safely cache it for a bit
              response.set('Cache-Control', 'public, max-age=300, s-maxage=600').send(
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
            const { appId, userId, workspaceId, apiKey, user, workspace } = request.body;

            if (!appId) {
              response.status(400).send({ status: 400, error: '"appId" not provided', appId });
              return;
            }

            if (!apiKey) {
              response.status(400).send({ status: 400, error: '"apiKey" not provided', apiKey });
              return;
            }

            if (!workspaceId || typeof workspaceId !== 'string') {
              response.status(400).send({ status: 400, error: 'No workspaceId', workspaceId });
              return;
            }

            if (!userId) {
              response.status(400).send({ status: 400, error: 'No userId', userId });
              return;
            }

            if (!user) {
              response.status(400).send({ status: 400, error: '"user" not provided', user });
              return;
            }

            // default workspace has no props
            if (workspaceId.toLowerCase() !== 'default' && !workspace) {
              response
                .status(400)
                .send({ status: 400, error: '"workspace" not provided', workspace });
              return;
            }

            const snapshot = await admin
              .database()
              .ref(`/apps/${appId}/keys/${apiKey.toString()}/`)
              .once('value');

            if (!snapshot.exists()) {
              response.status(403).send({ status: 403, error: '"apiKey" invalid', appId, apiKey });
              return;
            }

            await update({ appId, userId, workspaceId, workspace, user });

            const token = await admin.auth().createCustomToken(apiKey.toString(), {
              api: true,
              appId,
              mode,
              userId,
              workspaceId,
            });

            response.set('Cache-Control', 'public, max-age=300, s-maxage=600').send(
              JSON.stringify({
                status: 201,
                data: {
                  appId,
                  userId,
                  workspaceId,
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
        console.error('Error with generateToken', { error: e });
        response.status(401).send({ status: 401, error: e });
        return;
      }
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
