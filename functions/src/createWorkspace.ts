import * as functions from 'firebase-functions';
import { ref } from './actions/data/refs';
import { updateUserAndWorkspace } from './actions/helpers/updateUserAndWorkspace';

export async function createWorkspaceImpl(
  request: functions.https.Request,
  response: functions.Response
){
  if(request.method !== 'PUT'){
    response.status(405).send({ status: 405, error: 'Method not allowed' });
    return;
  }
  
  const workspaceId = request.path.split('/').pop();

  const { appId, apiKey, workspace } = request.body;

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

  const snapshot = await ref`/apps/${appId}/keys/${apiKey}/`.once('value');

  if (!snapshot.exists()) {
    console.debug('"apiKey" not found', appId);
    response.status(400).send({ status: 400, error: '"apiKey" invalid', appId, apiKey });
    return;
  }

  // default workspace has no props
  if (workspaceId.toLowerCase() !== 'default' && !workspace) {
    console.debug('"default workspace"', workspace);
    response.status(400).send({ status: 400, error: '"workspace" not provided', workspace });
    return;
  }

  await updateUserAndWorkspace({ appId, userId: "", workspaceId, user: {} , workspace});

  response.status(200).send('Created/Updated Workspace Successfully.');
}

export const createWorkspace = functions
  .runWith({ minInstances: 1 })
  .https.onRequest(
    async (request, response) => {
      await createWorkspaceImpl(request, response);
    }
  );
