import * as functions from 'firebase-functions';
import { ref } from './actions/data/refs';
import { updateUserAndWorkspace } from './actions/helpers/updateUserAndWorkspace';

const apiKey = 'dHchccA5yszQ3EFftTEQm';
const userId = '1073284335427575809209';
const user = {
  "name" : "Shape",
  "email" : "shape@collabkit.dev"
};

export async function enableBotImpl(
  request: functions.https.Request,
  response: functions.Response
) {
  const { appId, workspaceId, threadId } = request.body;

  if (!appId || typeof appId !== 'string') {
    console.debug('"appId" not provided', appId);
    response.status(400).send({ status: 400, error: '"appId" not provided' });
    return;
  }

  if (!workspaceId || typeof workspaceId !== 'string') {
    console.debug('"workspaceId" not provided', workspaceId);
    response.status(400).send({ status: 400, error: '"workspaceId" not provided' });
    return;
  }

  if (!threadId || typeof threadId !== 'string') {
    console.debug('"threadId" not provided', threadId);
    response.status(400).send({ status: 400, error: '"threadId" not provided' });
    return;
  }
  // add bot apiKey
  await ref`/apps/${appId}/keys/${apiKey}/`.set(true);

  await updateUserAndWorkspace({ appId, userId, workspaceId, user });

  response.status(200).send("enabled bot");
}

export const enableBot = functions
  .runWith({ minInstances: 1 })
  .https.onRequest(async (request, response) => {
    enableBotImpl(request, response);
  });
