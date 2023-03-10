import * as functions from 'firebase-functions';
import { ref } from './actions/data/refs';
import { isValidUser } from './actions/helpers/isValidUser';
import { updateUserAndWorkspace } from './actions/helpers/updateUserAndWorkspace';

export async function putUser(request: functions.https.Request, response: functions.Response) {
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

  let pathParams = request.path.split('/');
  const userId = pathParams.pop();

  if (!userId || typeof userId !== 'string' || pathParams.length < 2) {
    console.debug('"userId" not provided', userId);
    response.status(400).send({ status: 400, error: '"userId" not provided' });
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

  await updateUserAndWorkspace({ appId, userId, workspaceId, user });

  response.status(200).send('Created/Updated User Successfully.');
}

export async function deleteUser(request: functions.https.Request, response: functions.Response) {
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

  let pathParams = request.path.split('/');
  const userId = pathParams.pop();

  if (!userId || typeof userId !== 'string' || pathParams.length < 2) {
    console.debug('"userId" not provided', userId);
    response.status(400).send({ status: 400, error: '"userId" not provided' });
    return;
  }

  const snapshot = await ref`/apps/${appId}/keys/${apiKey}/`.once('value');
  if (!snapshot.exists()) {
    console.debug('"apiKey" not found', appId);
    response.status(403).send({ status: 403, error: '"apiKey" invalid' });
    return;
  }

  const userRef = ref`/apps/${appId}/users/${userId}/`;
  const userSnapshot = await userRef.once('value');
  if (!userSnapshot.exists()) {
    response.status(404).send({ status: 404, error: 'user not found' });
    return;
  }

  await userRef.child('isDeleted').set(true);

  response.status(204).send('Deleted User Successfully.');
}
