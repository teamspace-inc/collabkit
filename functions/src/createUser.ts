import * as functions from 'firebase-functions';
import { ref } from './actions/data/refs';
import { isValidUser } from './actions/helpers/isValidUser';
import { updateUserAndWorkspace } from './actions/helpers/updateUserAndWorkspace';

export const createUser = functions
  .runWith({ minInstances: 1 })
  .https.onRequest(async (request, response) => {
    const { appId, userId, workspaceId, apiKey, user } = request.body;

    if (!appId) {
      console.debug('"appId" not provided', appId);
      response.status(400).send({ status: 400, error: '"appId" not provided', appId });
      return;
    }

    if (!apiKey || typeof apiKey !== 'string') {
      console.debug('"apiKey" not provided', apiKey);
      response.status(400).send({ status: 400, error: '"apiKey" not provided', apiKey });
      return;
    }

    if (!workspaceId || typeof workspaceId !== 'string') {
      console.debug('"workspaceId" not provided', workspaceId);
      response.status(400).send({ status: 400, error: '"workspaceId" not provided', workspaceId });
      return;
    }

    if (!userId) {
      console.debug('"userId" not provided', userId);
      response.status(400).send({ status: 400, error: '"userId" not provided', userId });
      return;
    }

    if (!user) {
      console.debug('"user" not provided', user);
      response
        .status(400)
        .send({ status: 400, error: '"user" not provided', userId, workspaceId, user });
      return;
    }

    if (!isValidUser(user)) {
      console.debug('"user" object invalid', user);
      response.status(400).send({ status: 400, error: '"user" object is invalid', user });
    }

    const snapshot = await ref`/apps/${appId}/keys/${apiKey}/`.once('value');

    if (!snapshot.exists()) {
      console.debug('"apiKey" not found', appId);
      response.status(403).send({ status: 403, error: '"apiKey" invalid', appId, apiKey });
      return;
    }

    await updateUserAndWorkspace({ appId, userId, workspaceId, user });

    response.status(200).send("Created User Successfully.");
  });
