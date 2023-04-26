import * as functions from 'firebase-functions';
import * as Sentry from '@sentry/node';
import { ref } from './actions/data/refs';
import { isValidUser } from './actions/helpers/isValidUser';
import { updateUser } from './actions/helpers/updateUser';

export async function putUser(
  userId: string,
  request: functions.https.Request,
  response: functions.Response
) {
  const transaction = Sentry.startTransaction({ name: 'putUser' });
  try {
    const { appId, workspaceId, apiKey, user } = request.body;

    if (!appId) {
      console.debug('"appId" not provided', appId);
      response.status(400).send({ status: 400, error: '"appId" not provided' });
      return;
    }

    if (!apiKey || typeof apiKey !== 'string') {
      console.debug('"apiKey" not provided', apiKey);
      response.status(400).send({ status: 400, error: '"apiKey" not provided' });
      return;
    }

    if (!workspaceId || typeof workspaceId !== 'string') {
      console.debug('"workspaceId" not provided', workspaceId);
      response.status(400).send({ status: 400, error: '"workspaceId" not provided' });
      return;
    }

    if (!user) {
      console.debug('"user" not provided', user);
      response.status(400).send({ status: 400, error: '"user" not provided' });
      return;
    }

    if (!isValidUser(user)) {
      console.debug('"user" object invalid', user);
      response.status(400).send({ status: 400, error: '"user" object is invalid' });
      return;
    }

    const snapshot = await ref`/apps/${appId}/keys/${apiKey}/`.once('value');
    if (!snapshot.exists()) {
      console.debug('"apiKey" not found', appId);
      response.status(403).send({ status: 403, error: '"apiKey" invalid' });
      return;
    }

    await updateUser({ appId, userId, workspaceId, user });

    const userSnapshot = await ref`/profiles/${appId}/${userId}`.get();
    const result = {
      ...userSnapshot.val(),
      id: userId,
    };
    response.status(200).send(result);
  } catch (error) {
    Sentry.captureException(error);
    response.status(500).send({ status: 500, error: 'Internal Server Error' });
  } finally {
    transaction?.finish();
  }
}

export async function deleteUser(
  userId: string,
  request: functions.https.Request,
  response: functions.Response
) {
  const transaction = Sentry.startTransaction({ name: 'deleteUser' });
  try {
    const { appId, apiKey } = request.body;

    if (!appId) {
      console.debug('"appId" not provided', appId);
      response.status(400).send({ status: 400, error: '"appId" not provided' });
      return;
    }

    if (!apiKey || typeof apiKey !== 'string') {
      console.debug('"apiKey" not provided', apiKey);
      response.status(400).send({ status: 400, error: '"apiKey" not provided' });
      return;
    }

    const snapshot = await ref`/apps/${appId}/keys/${apiKey}/`.once('value');
    if (!snapshot.exists()) {
      console.debug('"apiKey" not found', appId);
      response.status(403).send({ status: 403, error: '"apiKey" invalid' });
      return;
    }

    const userRef = ref`/profiles/${appId}/${userId}/`;
    const userSnapshot = await userRef.once('value');
    if (!userSnapshot.exists()) {
      response.status(404).send({ status: 404, error: 'user not found' });
      return;
    }

    await userRef.child('isDeleted').set(true);

    response.status(204).send('Deleted User Successfully.');
  } catch (error) {
    Sentry.captureException(error);
    response.status(500).send({ status: 500, error: 'Internal Server Error' });
  } finally {
    transaction?.finish();
  }
}
